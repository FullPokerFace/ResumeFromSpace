import { FC } from "react";
import { combineName } from "../../../Form/utils/formUtils";
import { NameAndPostion } from "./parts/NameAndPostion";
import { PhoneEmailWeb } from "./parts/PhoneEmailWeb";
import { Photo } from "./parts/Photo";
import { Summary } from "./parts/Summary";
import backgroundImage from "./resumeBack.png";

interface Props {
  sections: any;
}

const Breeze: FC<Props> = (props) => {
  const { sections } = props || {};

  const { personalInformation, phoneEmailWebSection, summary } = sections || {};
  const { firstName, lastName, position, picture } =
    personalInformation?.fields || {};
  const { phone, email, web } = phoneEmailWebSection?.fields || {};
  const summaryField = summary?.fields.summary || {};

  return (
    <canvas id="the-canvas"></canvas>

    // <div
    //   className="min-h-full bg-cover flex px-[60px] py-[44px] gap-[44px]"
    //   style={{
    //     backgroundImage: `url('${backgroundImage.src}')`,
    //     fontFamily: "OpenSans",
    //   }}
    // >
    //   <div className="w-[236px]">
    //     <Photo src={picture.value} />
    //   </div>
    //   <div className="w-[466px]">
    //     <NameAndPostion
    //       fullName={combineName([firstName.value, lastName.value])}
    //       position={position.value.toUpperCase()}
    //     />
    //     <PhoneEmailWeb
    //       phone={phone?.value}
    //       email={email?.value}
    //       web={web?.value}
    //     />
    //     <Summary summary={summaryField.value} />
    //   </div>
    // </div>
  );
};

export default Breeze;
