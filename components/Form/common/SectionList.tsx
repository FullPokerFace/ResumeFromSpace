import { FC } from "react";
import { PersonalInformationSection } from "../../../store/slices/formSlice";
import { Section } from "./Section";

interface Props {
  sections: PersonalInformationSection | {};
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
