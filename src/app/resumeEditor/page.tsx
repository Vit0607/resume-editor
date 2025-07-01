// src/app/resumeEditor/page.tsx
import type { DropResult } from 'react-beautiful-dnd';
import { EditorPanel } from '@features/resumeEditor/components/EditorPanel/EditorPanel';
import { PreviewPanel } from '@features/resumeEditor/components/PreviewPanel/PreviewPanel';
import { useResumeState } from '@features/resumeEditor/hooks/useResumeState';
import { ResumeEditorLayout } from './layout';
import type { SectionType } from '@features/resumeEditor/types/resumeTypes';
import { getAISuggestion } from '@features/resumeEditor/utils/getAISuggestion';

export const ResumeEditorPage = () => {
  const {
    resumeData,
    setSections,
    addSection,
    removeSection,
    updateSection,
    activeSection,
    setActiveSectionId,
    updateName,
    updatePosition
  } = useResumeState();

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.index === destination.index) return;

    const newSections = [...resumeData.sections];
    const [movedItem] = newSections.splice(source.index, 1);
    newSections.splice(destination.index, 0, movedItem);
    setSections(newSections);
  };

  const handleAISuggestion = (type: SectionType) => {
    if (activeSection) {
      updateSection(activeSection.id, getAISuggestion(type));
    }
  };

  return (
    <ResumeEditorLayout>
      <EditorPanel
        sections={resumeData.sections}
        activeSection={activeSection}
        onAddSection={addSection}
        onRemoveSection={removeSection}
        onUpdateSection={updateSection}
        onSetActiveSection={setActiveSectionId}
        onMoveSection={handleDragEnd}
        onAISuggest={handleAISuggestion}
      />
      <PreviewPanel
        sections={resumeData.sections}
        name={resumeData.name}
        position={resumeData.position}
        onNameChange={updateName}
        onPositionChange={updatePosition}
      />
    </ResumeEditorLayout>
  );
};
