import html2pdf from 'html2pdf.js';
import {
  type ResumeSection,
  SECTION_TITLE_MAP,
  type ExperienceSection,
  type EducationSection,
  type SkillsSection,
  type CertificatesSection,
  type AboutSection
} from '@features/resumeEditor/types/resumeTypes';
import styles from './PreviewPanel.module.scss';
import Button from '@components/ui/Button/Button';
import Input from '@components/ui/Input/Input';

interface PreviewPanelProps {
  name: string;
  position: string;
  sections: ResumeSection[];
  onNameChange: (name: string) => void;
  onPositionChange: (position: string) => void;
}

export const PreviewPanel: React.FC<PreviewPanelProps> = ({
  name,
  position,
  sections,
  onNameChange,
  onPositionChange
}) => {
  const downloadPdf = () => {
    const originalElement = document.getElementById('resume-preview-content');
    if (!originalElement) {
      console.error('Resume preview element not found for PDF generation.');
      return;
    }

    // Создаем глубокую копию элемента
    const elementToPrint = originalElement.cloneNode(true) as HTMLElement;

    // Удаляем кнопку скачивания
    const downloadBtn = elementToPrint.querySelector(
      `.${styles.downloadButtonContainer}`
    );
    if (downloadBtn) downloadBtn.remove();

    // Заменяем инпуты на статические тексты
    const nameInput = elementToPrint.querySelector(`.${styles.nameInput}`);
    const positionInput = elementToPrint.querySelector(
      `.${styles.positionInput}`
    );

    if (nameInput) {
      const nameHeader = document.createElement('h1');
      nameHeader.textContent = name;
      nameHeader.className = `${styles.nameInput} ${styles.staticText}`;
      nameInput.replaceWith(nameHeader);
    }

    if (positionInput) {
      const positionParagraph = document.createElement('p');
      positionParagraph.textContent = position;
      positionParagraph.className = `${styles.positionInput} ${styles.staticText}`;
      positionInput.replaceWith(positionParagraph);
    }

    // Добавляем отступ перед каждой секцией
    const sectionContainers = elementToPrint.querySelectorAll(
      `.${styles.sectionContainer}`
    );
    sectionContainers.forEach(container => {
      container.classList.add(styles.pdfSectionContainer);
    });

    // Преобразуем названия секций в верхний регистр
    const sectionTitles = elementToPrint.querySelectorAll(
      `.${styles.sectionTitle}`
    );
    sectionTitles.forEach(title => {
      if (title.textContent) {
        title.textContent = title.textContent.toUpperCase();
      }
    });

    // Настройки PDF
    const opt = {
      margin: 0.5,
      filename: 'resume.pdf',
      html2canvas: {
        scale: 2,
        dpi: 192,
        backgroundColor: '#FFFFFF',
        letterRendering: true
      },
      jsPDF: {
        unit: 'in' as const,
        format: 'letter' as const,
        orientation: 'p' as const
      }
    };

    // Генерируем PDF
    (html2pdf() as any).set(opt).from(elementToPrint).save();
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.downloadButtonContainer}>
        <Button onClick={downloadPdf} variant="primary">
          Скачать как PDF
        </Button>
      </div>
      <div id="resume-preview-content" className={styles.panel}>
        <header className={styles.header}>
          <Input
            value={name}
            onChange={e => onNameChange(e.target.value)}
            placeholder="Ваше имя"
            className={styles.nameInput}
          />
          <Input
            value={position}
            onChange={e => onPositionChange(e.target.value)}
            placeholder="Ваша должность"
            className={styles.positionInput}
          />
        </header>
        {sections.length === 0 && (
          <div className={styles.emptyPreview}>
            <p>Добавьте секции в редакторе, чтобы увидеть ваше резюме здесь!</p>
          </div>
        )}
        {sections.map((section, index) => (
          <div key={section.id} className={styles.sectionContainer}>
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>
                {SECTION_TITLE_MAP[section.type]}
              </h2>
              <div className={styles.sectionContent}>
                {(() => {
                  switch (section.type) {
                    case 'experience':
                      const expSection = section as ExperienceSection;
                      return (
                        <div className={styles.experienceItem}>
                          <h3>
                            {expSection.jobTitle}{' '}
                            {expSection.company && `в ${expSection.company}`}
                          </h3>
                          {expSection.period && (
                            <span>{expSection.period}</span>
                          )}
                          {expSection.description && (
                            <p>{expSection.description}</p>
                          )}
                        </div>
                      );
                    case 'education':
                      const eduSection = section as EducationSection;
                      return (
                        <div className={styles.educationItem}>
                          <h3>{eduSection.institution}</h3>
                          {(eduSection.specialty || eduSection.period) && (
                            <p>
                              {eduSection.specialty}{' '}
                              {eduSection.period && `(${eduSection.period})`}
                            </p>
                          )}
                        </div>
                      );
                    case 'skills':
                      const skillsSection = section as SkillsSection;
                      return <p>{skillsSection.skills}</p>;
                    case 'certificates':
                      const certSection = section as CertificatesSection;
                      return <p>{certSection.name}</p>;
                    case 'about':
                      const aboutSection = section as AboutSection;
                      return <p>{aboutSection.text}</p>;
                    default:
                      return null;
                  }
                })()}
              </div>
            </section>
            {index < sections.length - 1 && (
              <div className={styles.sectionSpacer} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
