import type { SectionType, ResumeSection } from '../types/resumeTypes';

export const getAISuggestion = (type: SectionType): Partial<ResumeSection> => {
  switch (type) {
    case 'experience':
      return {
        type: 'experience',
        jobTitle: 'Frontend Developer',
        company: 'Tech Innovations Inc.',
        period: 'Январь 2021 – по настоящее время',
        description:
          'Разработка и поддержка высоконагруженных веб-приложений на React и TypeScript. Оптимизация производительности, внедрение новых функциональностей, участие в code review и менторстве джуниоров.'
      };
    case 'education':
      return {
        type: 'education',
        institution: 'Национальный Технический Университет',
        specialty: 'Прикладная Информатика',
        period: 'Сентябрь 2016 – Июнь 2020'
      };
    case 'skills':
      return {
        type: 'skills',
        skills:
          'JavaScript, TypeScript, React, Redux, Next.js, HTML5, CSS3, SCSS, Git, Webpack, Jest, Figma, REST API, Agile/Scrum'
      };
    case 'certificates':
      return {
        type: 'certificates',
        name: 'Сертификат Google Certified Professional Cloud Architect'
      };
    case 'about':
      return {
        type: 'about',
        text: 'Высокомотивированный и опытный Frontend Developer с 4+ годами опыта в разработке интерактивных пользовательских интерфейсов. Страстный к чистым коду, отличной производительности и непрерывному обучению. Готов к амбициозным проектам и работе в команде.'
      };
    default:
      return {};
  }
};
