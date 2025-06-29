import html2pdf from 'html2pdf.js';
import { useRef } from 'react';

import Button from '@components/ui/Button/Button';
import Input from '@components/ui/Input/Input';
import Textarea from '@components/ui/Textarea/Textarea';

function App() {
  const pdfRef = useRef<HTMLDivElement>(null);

  const generatePdf = async () => {
    try {
      if (!pdfRef.current) {
        throw new Error('Элемент для экспорта не найден');
      }

      await html2pdf()
        .set({
          filename: 'my-document.pdf',
          margin: 10,
          jsPDF: { format: 'a4', orientation: 'p' }
        })
        .from(pdfRef.current)
        .save();
    } catch (error) {
      console.error('PDF generation failed:', error);
    }
  };

  return (
    <>
      <h1>Редактор Резюме</h1>
      <div ref={pdfRef} id="content-to-export">
        <h1>Моё резюме</h1>
      </div>
      <Input placeholder="Должность" />

      <Textarea placeholder="Описание"></Textarea>
      <Button variant="primary" size="lg">
        Primary
      </Button>
      <Button variant="accent" size="md">
        Accent
      </Button>
      <Button variant="danger" size="lg" onClick={generatePdf}>
        Экспорт в PDF
      </Button>
    </>
  );
}

export default App;
