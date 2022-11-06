import { useDispatch } from "../../../store/store";
import { Fields, setFieldValue } from "../../../store/slices/formSlice";
import { Field } from "./Field";
import { FC } from "react";

interface Props {
  fields: Fields;
  section: string;
}

export const FieldList: FC<Props> = (props) => {
  const { fields, section } = props || {};
  const dispatch = useDispatch();
  return (
    <div className="flex flex-col p-4 lg:flex-row lg:flex-wrap">
      {Object.keys(fields).length > 0 &&
        Object.keys(fields).map((name) => {
          const fieldProps = fields[name];
          return (
            <Field
              key={name}
              {...fieldProps}
              onChange={(e: InputEvent) => {
                dispatch(
                  setFieldValue({
                    section,
                    field: name,
                    value: (e.target as HTMLInputElement).value,
                  })
                );
              }}
            />
          );
        })}
    </div>
  );
};
