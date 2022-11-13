import React, { FC } from "react";
import { SectionText } from "./_common/SectionText";
import { SectionTitle } from "./_common/SectionTitle";

interface Props {
  summary: string;
}

export const Summary: FC<Props> = (props) => {
  const { summary } = props || {};
  return (
    <div className="mt-[52px]">
      <SectionTitle label="Summary" />
      <SectionText>{summary}</SectionText>
    </div>
  );
};
