import { generateRoundPhoto } from "../../../Form/utils/formUtils";

export const generateBreezeContent = (sections: any) => {
  const { personalInformation, phoneEmailWeb } = sections || {};
  const { firstName, lastName, position, picture } =
    personalInformation?.fields || {};
  const { phone, email, web } = phoneEmailWeb?.fields || {};
  return ([
    {
      columns: [
        {
          width: 168,
          image: generateRoundPhoto( picture?.value),
        },
        {
          width: 446,
          text: 'Second column'
        }
      ],
      // optional space between columns
      columnGap: 44
    },
  ])
}
    