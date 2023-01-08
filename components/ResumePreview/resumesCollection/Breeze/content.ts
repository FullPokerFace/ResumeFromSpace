import { Sections } from "../../../../store/slices/formSlice";
import { combineName, generateRoundPhoto } from "../../../Form/utils/formUtils";


const phoneSVG = `
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    fill="none"
    stroke="#000"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
    />
  </svg>`
;

const emailSVG = `
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="#000"
  >
    <path
      stroke-inecap="round"
      d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25"
    />
  </svg>
  `;

  const webSVG = `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="#000"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M20.893 13.393l-1.135-1.135a2.252 2.252 0 01-.421-.585l-1.08-2.16a.414.414 0 00-.663-.107.827.827 0 01-.812.21l-1.273-.363a.89.89 0 00-.738 1.595l.587.39c.59.395.674 1.23.172 1.732l-.2.2c-.212.212-.33.498-.33.796v.41c0 .409-.11.809-.32 1.158l-1.315 2.191a2.11 2.11 0 01-1.81 1.025 1.055 1.055 0 01-1.055-1.055v-1.172c0-.92-.56-1.747-1.414-2.089l-.655-.261a2.25 2.25 0 01-1.383-2.46l.007-.042a2.25 2.25 0 01.29-.787l.09-.15a2.25 2.25 0 012.37-1.048l1.178.236a1.125 1.125 0 001.302-.795l.208-.73a1.125 1.125 0 00-.578-1.315l-.665-.332-.091.091a2.25 2.25 0 01-1.591.659h-.18c-.249 0-.487.1-.662.274a.931.931 0 01-1.458-1.137l1.411-2.353a2.25 2.25 0 00.286-.76m11.928 9.869A9 9 0 008.965 3.525m11.928 9.868A9 9 0 118.965 3.525"
      />
    </svg>
    `;
  

const renderText = (text: string, style: string) => {
  return { text, style }
}

const addIconWithText = (icon, text, label) => (
  { 
    columns: [
      { width: 24, svg: icon },
      { stack: [
        { text: label, style: 't3' },
        { text: text, style: 't4' },
      ]}
    ], columnGap: 8, width: 'auto'
})

const addPhoneEmailWeb = (phone: string, email: string, web: string) => {
  return     {
    columns : [
      { width: '*', text: ``},
      addIconWithText(phoneSVG, phone, 'Phone'),
      addIconWithText(emailSVG, email, 'Email'),
      addIconWithText(webSVG, web, 'Web'),
      { width: '*', text: ``},
    ],
    columnGap: 16,
    margin: [0, 0, 0, 20]
  }
}

function addTitle(title: string){
  return { text: title.toUpperCase(), style: 't5' }
}
function addText(text: string, style = 't6'){
  return { text: text, style }
}

function addList(list){


  return { ul: list.map(item => ({ text: item, style: 't8'})) }
}

function getMonthAndYear(date){
  const year = date.split('-')?.[0];
  const month = date.split('-')?.[1];
  return `${month} / ${year}`
}

function addIfNotEmpty(condition, array){
  return condition ? array : []
}

function addExperience(experience){
  const { fields } = experience || {};
  const { position, company, from, to, summary, responsiblities
  } = fields || {};
  
  return [
    addTitle('Work Experience'),
    DIVIDER(446),
    renderText(position.value, 't3'),
    renderText(`${company.value}  -  ${getMonthAndYear(from.value)} - ${getMonthAndYear(to.value)}`, 't7'),
    addIfNotEmpty(summary.value, [addText(summary.value, 't9')]),
    addList(responsiblities.value?.split('\n'))
  ]
}

function addEducation(education){
  const { fields } = education || {};
  const { degree, major, name, city, from, to } = fields || {};
  
  return [
    addTitle('Education'),
    DIVIDER(232),
    renderText(`${degree.value} in ${major.value}`, 't3'),
    renderText(`${name.value}, ${city.value}`, 't10'),
    renderText(`${from.value} - ${to.value}`, 't10'),
  ]
}

const DIVIDER = (width: number) => ({ svg : `<svg width="${width}" height="1" viewBox="0 0 ${width} 1" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="${width}" height="1" fill="#BCBDC0"/></svg>`, style: 'svgLine'});
const DIVIDER_NOMARGIN = (width: number) => ({ svg : `<svg width="${width}" height="1" viewBox="0 0 ${width} 1" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="${width}" height="1" fill="#BCBDC0"/></svg>`});

export const generateBreezeContent = async (sections: Sections) => {
  const { personalInformation, phoneEmailWeb, summary, experience, education } = sections || {};
  const { firstName, lastName, position, picture } =
    personalInformation?.fields || {};
  const { phone, email, web } = phoneEmailWeb?.fields || {};
  const summaryFields = summary?.fields.summary || {};

  const rightSide = [
    { image: await generateRoundPhoto(picture?.value),
      width: 190,
      height: 190
    },
    addEducation(education)
  ]

  const leftSide = [
    renderText(combineName([firstName.value, lastName.value]), 't1'),
    renderText(position.value.toUpperCase(), 't2'),
    DIVIDER(446),
    addPhoneEmailWeb(phone.value, email.value, web.value),
    DIVIDER_NOMARGIN(446),
    addIfNotEmpty(summaryFields.value, [
      addTitle('Summary'),
      DIVIDER(446),
      addText(summaryFields.value)
    ]),
    addExperience(experience)
  ]


  return ([
    {
      columns: [
        {
          width: 236,
          stack: rightSide
        },
        {
          width: 446,
          stack: leftSide,
        }
      ],
      // optional space between columns
      columnGap: 44
    },
  ])
}
    
