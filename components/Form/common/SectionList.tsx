import { FC } from "react";
import { PersonalInformationProps } from "../../../store/slices/personalInformationInitial";
import { PhoneEmailWebProps } from "../../../store/slices/phoneEmailWebInitial";
import { Section } from "./Section";

interface Props {
  sections: PersonalInformationProps | PhoneEmailWebProps | {};
}

const SectionList: FC<Props> = (props) => {
  const { sections } = props || {};
  return (
    <>
      {Object.keys(sections).length > 0 &&
        Object.keys(sections).map((name: string, idx: number) => (
          <Section
            key={idx}
            title={sections[name].title}
            isRequired={sections[name].isRequired}
            fields={sections[name].fields}
            isExpanded={sections[name].isExpanded}
            sectionName={name}
          />
        ))}
    </>
  );
};

export default SectionList;
