import {
  DragDropContext,
  Droppable,
  Draggable,
  type DropResult,
  type DraggableProvided,
  type DraggableStateSnapshot
} from 'react-beautiful-dnd';

import Button from '@components/ui/Button/Button';
import Input from '@components/ui/Input/Input';
import Textarea from '@components/ui/Textarea/Textarea';
import Select from '@components/ui/Select/Select';
import {
  type ResumeSection,
  SECTION_TITLE_MAP,
  type SectionType,
  type ExperienceSection,
  type EducationSection,
  type SkillsSection,
  type CertificatesSection,
  type AboutSection
} from '@features/resumeEditor/types/resumeTypes';
import styles from './EditorPanel.module.scss';
import { useState } from 'react';

// Вспомогательный компонент: Форма редактирования для ОДНОЙ секции
interface SectionFormEditorProps {
  section: ResumeSection;
  onUpdate: (updates: Partial<ResumeSection>) => void;
  onRemove: () => void;
  onAISuggest?: (type: SectionType) => void;
}

const SectionFormEditor: React.FC<SectionFormEditorProps> = ({
  section,
  onUpdate,
  onRemove,
  onAISuggest
}) => {
  const renderFormFields = () => {
    switch (section.type) {
      case 'experience':
        const expSection = section as ExperienceSection;
        return (
          <>
            <Input
              placeholder="Должность"
              value={expSection.jobTitle}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                onUpdate({ jobTitle: e.target.value })
              }
            />
            <Input
              placeholder="Компания"
              value={expSection.company}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                onUpdate({ company: e.target.value })
              }
            />
            <Input
              placeholder="Период (напр., 2020-2024)"
              value={expSection.period}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                onUpdate({ period: e.target.value })
              }
            />
            <Textarea
              placeholder="Описание обязанностей и достижений"
              value={expSection.description}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                onUpdate({ description: e.target.value })
              }
            />
          </>
        );
      case 'education':
        const eduSection = section as EducationSection;
        return (
          <>
            <Input
              placeholder="Учебное заведение"
              value={eduSection.institution}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                onUpdate({ institution: e.target.value })
              }
            />
            <Input
              placeholder="Специальность"
              value={eduSection.specialty}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                onUpdate({ specialty: e.target.value })
              }
            />
            <Input
              placeholder="Период"
              value={eduSection.period}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                onUpdate({ period: e.target.value })
              }
            />
          </>
        );
      case 'skills':
        const skillsSection = section as SkillsSection;
        return (
          <Textarea
            placeholder="Навыки через запятую (например: React, Redux, TypeScript)"
            value={skillsSection.skills}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              onUpdate({ skills: e.target.value })
            }
          />
        );
      case 'certificates':
        const certSection = section as CertificatesSection;
        return (
          <Input
            placeholder="Название сертификата (например: Certified React Developer)"
            value={certSection.name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onUpdate({ name: e.target.value })
            }
          />
        );
      case 'about':
        const aboutSection = section as AboutSection;
        return (
          <Textarea
            placeholder="Расскажите о себе (опыт, цели, сильные стороны)"
            value={aboutSection.text}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              onUpdate({ text: e.target.value })
            }
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.sectionEditorForm}>
      {renderFormFields()}
      {onAISuggest && (
        <Button variant="primary" onClick={() => onAISuggest(section.type)}>
          AI-подсказка
        </Button>
      )}
      <Button variant="danger" onClick={onRemove}>
        Удалить секцию
      </Button>
    </div>
  );
};

// Основной компонент: Панель Редактора (левая часть)
interface EditorPanelProps {
  sections: ResumeSection[];
  activeSection: ResumeSection | null;
  onAddSection: (type: SectionType) => void;
  onRemoveSection: (id: string) => void;
  onUpdateSection: (id: string, updates: Partial<ResumeSection>) => void;
  onSetActiveSection: (id: string | null) => void;
  onMoveSection: (result: DropResult) => void;
  onAISuggest: (type: SectionType) => void;
}

export const EditorPanel: React.FC<EditorPanelProps> = ({
  sections,
  activeSection,
  onAddSection,
  onRemoveSection,
  onUpdateSection,
  onSetActiveSection,
  onMoveSection,
  onAISuggest
}) => {
  const [sectionToAddType, setSectionToAddType] = useState<string>('');

  const sectionTypeOptions = (
    Object.keys(SECTION_TITLE_MAP) as SectionType[]
  ).map(type => ({
    value: type,
    label: SECTION_TITLE_MAP[type]
  }));

  const handleAddSectionClick = () => {
    if (sectionToAddType) {
      onAddSection(sectionToAddType as SectionType);
      setSectionToAddType('');
    }
  };

  const handleSelectChange = (value: string) => {
    setSectionToAddType(value);
  };

  return (
    <div className={styles.panel}>
      <div className={styles.controls}>
        <h3>Добавить секцию</h3>
        <div className={styles.addSectionControls}>
          <Select
            options={sectionTypeOptions}
            value={sectionToAddType}
            onChange={handleSelectChange}
            placeholder="Выберите тип секции"
          />
          <Button onClick={handleAddSectionClick} disabled={!sectionToAddType}>
            Добавить
          </Button>
        </div>
      </div>

      <div className={styles.sectionListWrapper}>
        <h3>Секции</h3>
        <DragDropContext onDragEnd={onMoveSection}>
          <Droppable
            droppableId="sections"
            isDropDisabled={false}
            isCombineEnabled={false}
          >
            {provided => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={styles.sectionsList}
              >
                {sections.length === 0 && (
                  <p className={styles.emptyList}>
                    Пока нет секций. Добавьте первую!
                  </p>
                )}
                {sections.map((section, index) => (
                  <Draggable
                    key={section.id}
                    draggableId={section.id}
                    index={index}
                    isDragDisabled={false}
                  >
                    {(
                      provided: DraggableProvided,
                      snapshot: DraggableStateSnapshot
                    ) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`${styles.sectionItem} ${
                          activeSection?.id === section.id ? styles.active : ''
                        } ${snapshot.isDragging ? styles.dragging : ''}`}
                        onClick={() => onSetActiveSection(section.id)}
                      >
                        <span>{SECTION_TITLE_MAP[section.type]}</span>
                        <Button
                          variant="danger"
                          className={styles.removeSectionBtn}
                          onClick={(e: React.MouseEvent) => {
                            e.stopPropagation();
                            onRemoveSection(section.id);
                          }}
                        >
                          &times;
                        </Button>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>

      {activeSection && (
        <div className={styles.editorContainer}>
          <h4>Редактирование: {SECTION_TITLE_MAP[activeSection.type]}</h4>
          <SectionFormEditor
            key={activeSection.id}
            section={activeSection}
            onUpdate={updates => onUpdateSection(activeSection.id, updates)}
            onRemove={() => onRemoveSection(activeSection.id)}
            onAISuggest={onAISuggest}
          />
          <Button
            variant="accent"
            onClick={() => onSetActiveSection(null)}
            fullWidth={true}
          >
            Скрыть редактор
          </Button>
        </div>
      )}
    </div>
  );
};
