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

interface PreviewPanelProps {
  sections: ResumeSection[];
}

// Вспомогательная функция: Скачать PDF
const downloadPdf = () => {
  const element = document.getElementById('resume-preview-content');
  if (!element) {
    console.error('Resume preview element not found for PDF generation.');
    return;
  }

  const opt = {
    margin: 0.5,
    filename: 'my-resume.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: {
      scale: 2,
      logging: true,
      dpi: 192,
      letterRendering: true
    },
    jsPDF: {
      unit: 'in',
      format: 'letter',
      orientation: 'p' as const
    }
  };

  html2pdf().set(opt).from(element).save();
};

// Основной компонент: Панель Превью (правая часть)
export const PreviewPanel: React.FC<PreviewPanelProps> = ({ sections }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.downloadButtonContainer}>
        <Button onClick={downloadPdf} variant="primary">
          Скачать как PDF
        </Button>
      </div>
      <div id="resume-preview-content" className={styles.panel}>
        {' '}
        <header className={styles.header}>
          <h1>Ваше Имя</h1>
          <p>Ваша Должность</p>
        </header>
        {sections.length === 0 && (
          <div className={styles.emptyPreview}>
            <p>Добавьте секции в редакторе, чтобы увидеть ваше резюме здесь!</p>
          </div>
        )}
        {sections.map(section => (
          <section key={section.id} className={styles.section}>
            <h2 className={styles.sectionTitle}>
              {SECTION_TITLE_MAP[section.type]}
            </h2>
            <div className={styles.sectionContent}>
              {(() => {
                switch (section.type) {
                  case 'experience':
                    const expSection = section as ExperienceSection;
                    if (
                      !expSection.jobTitle &&
                      !expSection.company &&
                      !expSection.period &&
                      !expSection.description
                    )
                      return null;
                    return (
                      <div className={styles.experienceItem}>
                        <h3>
                          {expSection.jobTitle}{' '}
                          {expSection.company && `в ${expSection.company}`}
                        </h3>
                        {expSection.period && <span>{expSection.period}</span>}
                        {expSection.description && (
                          <p>{expSection.description}</p>
                        )}
                      </div>
                    );
                  case 'education':
                    const eduSection = section as EducationSection;
                    if (
                      !eduSection.institution &&
                      !eduSection.specialty &&
                      !eduSection.period
                    )
                      return null;
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
                    if (!skillsSection.skills) return null;
                    return <p>{skillsSection.skills}</p>;
                  case 'certificates':
                    const certSection = section as CertificatesSection;
                    if (!certSection.name) return null;
                    return <p>{certSection.name}</p>;
                  case 'about':
                    const aboutSection = section as AboutSection;
                    if (!aboutSection.text) return null;
                    return <p>{aboutSection.text}</p>;
                  default:
                    return null;
                }
              })()}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};
