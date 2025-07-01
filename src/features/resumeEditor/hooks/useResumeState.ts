// src/features/resumeEditor/hooks/useResumeState.ts
import { useLocalStorage } from '@shared/hooks/useLocalStorage';
import {
  type ResumeSection,
  type SectionType,
  createNewSection,
  type ResumeData
} from '../types/resumeTypes';

// Начальные данные для первого запуска
const initialData: ResumeData = {
  name: 'Ваше Имя',
  position: 'Ваша Должность',
  sections: []
};

export const useResumeState = () => {
  // Получаем текущее состояние и функцию для его полной замены
  const [resumeData, setResumeData] = useLocalStorage<ResumeData>(
    'resume-data',
    initialData
  );

  // Состояние для активной секции остается отдельным, это нормально
  const [activeSectionId, setActiveSectionId] = useLocalStorage<string | null>(
    'active-section-id',
    null
  );

  // Функция для drag-and-drop
  const setSections = (sections: ResumeSection[]) => {
    // Создаем НОВЫЙ объект на основе старого и передаем его в сеттер
    const newData: ResumeData = { ...resumeData, sections };
    setResumeData(newData);
  };

  const addSection = (type: SectionType) => {
    const newSection = createNewSection(type);
    // Создаем НОВЫЙ объект, добавляя в массив секций новую
    const newData: ResumeData = {
      ...resumeData,
      sections: [...resumeData.sections, newSection]
    };
    setResumeData(newData);
    setActiveSectionId(newSection.id); // Устанавливаем новую секцию как активную
  };

  const removeSection = (id: string) => {
    // Создаем НОВЫЙ объект с отфильтрованным массивом секций
    const newData: ResumeData = {
      ...resumeData,
      sections: resumeData.sections.filter(s => s.id !== id)
    };
    setResumeData(newData);

    // Если удалили активную секцию, сбрасываем ID активной
    if (activeSectionId === id) {
      setActiveSectionId(null);
    }
  };

  const updateSection = <T extends ResumeSection>(
    id: string,
    updatedFields: Partial<T>
  ) => {
    // Создаем НОВЫЙ объект с обновленной секцией
    const newData: ResumeData = {
      ...resumeData,
      sections: resumeData.sections.map(s =>
        s.id === id ? { ...s, ...updatedFields } : s
      )
    };
    setResumeData(newData);
  };

  const updateName = (name: string) => {
    // Создаем НОВЫЙ объект с обновленным именем
    const newData: ResumeData = { ...resumeData, name };
    setResumeData(newData);
  };

  const updatePosition = (position: string) => {
    // Создаем НОВЫЙ объект с обновленной должностью
    const newData: ResumeData = { ...resumeData, position };
    setResumeData(newData);
  };

  // Находим активную секцию для передачи в EditorPanel
  const activeSection =
    resumeData.sections.find(s => s.id === activeSectionId) || null;

  return {
    resumeData,
    setSections,
    addSection,
    removeSection,
    updateSection,
    activeSection,
    setActiveSectionId,
    updateName,
    updatePosition
  };
};
