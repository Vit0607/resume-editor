// src/features/resumeEditor/hooks/useResumeState.ts
import { useLocalStorage } from '@shared/hooks/useLocalStorage';
import {
  type ResumeSection,
  type SectionType,
  createNewSection
} from '../types/resumeTypes';

export const useResumeState = () => {
  const [sections, setSections] = useLocalStorage<ResumeSection[]>(
    'resume-sections',
    []
  );
  const [activeSectionId, setActiveSectionId] = useLocalStorage<string | null>(
    'active-section-id',
    null
  );

  const addSection = (type: SectionType) => {
    const newSection = createNewSection(type);
    setSections([...sections, newSection]);
    setActiveSectionId(newSection.id);
  };

  const removeSection = (id: string) => {
    setSections(sections.filter(s => s.id !== id));
    if (activeSectionId === id) {
      setActiveSectionId(null);
    }
  };

  const updateSection = <T extends ResumeSection>(
    id: string,
    updatedFields: Partial<T>
  ) => {
    setSections(
      sections.map(s => (s.id === id ? ({ ...s, ...updatedFields } as T) : s))
    );
  };

  const activeSection = sections.find(s => s.id === activeSectionId) || null;

  return {
    sections,
    setSections,
    addSection,
    removeSection,
    updateSection,
    activeSection,
    setActiveSectionId
  };
};
