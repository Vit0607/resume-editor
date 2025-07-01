import { v4 as uuidv4 } from 'uuid';

export type SectionType =
  | 'experience'
  | 'education'
  | 'skills'
  | 'certificates'
  | 'about';

export const SECTION_TITLE_MAP: Record<SectionType, string> = {
  experience: 'Опыт работы',
  education: 'Образование',
  skills: 'Навыки',
  about: 'О себе',
  certificates: 'Сертификаты'
};

interface BaseSection {
  id: string;
  type: SectionType;
}

export interface ExperienceSection extends BaseSection {
  type: 'experience';
  jobTitle: string;
  company: string;
  period: string;
  description: string;
}

export interface EducationSection extends BaseSection {
  type: 'education';
  institution: string;
  specialty: string;
  period: string;
}

export interface SkillsSection extends BaseSection {
  type: 'skills';
  skills: string;
}

export interface CertificatesSection extends BaseSection {
  type: 'certificates';
  name: string;
}

export interface AboutSection extends BaseSection {
  type: 'about';
  text: string;
}

export type ResumeSection =
  | ExperienceSection
  | EducationSection
  | SkillsSection
  | CertificatesSection
  | AboutSection;

export interface ResumeData {
  name: string;
  position: string;
  sections: ResumeSection[];
}

export const createNewSection = (type: SectionType): ResumeSection => {
  const base = { id: uuidv4(), type };

  switch (type) {
    case 'experience':
      return {
        ...base,
        type: 'experience',
        jobTitle: '',
        company: '',
        period: '',
        description: ''
      };
    case 'education':
      return {
        ...base,
        type: 'education',
        institution: '',
        specialty: '',
        period: ''
      };
    case 'skills':
      return {
        ...base,
        type: 'skills',
        skills: ''
      };
    case 'certificates':
      return {
        ...base,
        type: 'certificates',
        name: ''
      };
    case 'about':
      return {
        ...base,
        type: 'about',
        text: ''
      };
    default:
      const _exhaustiveCheck: never = type;
      throw new Error(`Unknown section type: ${_exhaustiveCheck}`);
  }
};
