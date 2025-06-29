import { v4 as uuidv4 } from 'uuid';

// Перечисление типов секций
export type SectionType =
  | 'experience'
  | 'education'
  | 'skills'
  | 'certificates'
  | 'about';

// Соответствие типа секции и её отображаемого заголовка
export const SECTION_TITLE_MAP: Record<SectionType, string> = {
  experience: 'Опыт работы',
  education: 'Образование',
  skills: 'Навыки',
  about: 'О себе',
  certificates: 'Сертификаты'
};

// Базовый интерфейс для любой секции резюме
export interface BaseSection {
  id: string;
  type: SectionType;
}

// Конкретные интерфейсы для каждого типа секции
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

// Объединенный тип, который может быть любой из вышеперечисленных секций
export type ResumeSection =
  | ExperienceSection
  | EducationSection
  | SkillsSection
  | CertificatesSection
  | AboutSection;

// Функция для создания новой пустой секции заданного типа
export const createNewSection = <T extends SectionType>(
  type: T
): Extract<ResumeSection, { type: T }> => {
  const base = { id: uuidv4(), type };
  switch (type) {
    case 'experience':
      return {
        ...base,
        jobTitle: '',
        company: '',
        period: '',
        description: ''
      } as Extract<ResumeSection, { type: T }>;
    case 'education':
      return {
        ...base,
        institution: '',
        specialty: '',
        period: ''
      } as Extract<ResumeSection, { type: T }>;
    case 'skills':
      return {
        ...base,
        skills: ''
      } as Extract<ResumeSection, { type: T }>;
    case 'certificates':
      return {
        ...base,
        name: ''
      } as Extract<ResumeSection, { type: T }>;
    case 'about':
      return {
        ...base,
        text: ''
      } as Extract<ResumeSection, { type: T }>;
    default:
      throw new Error('Unknown section type');
  }
};
