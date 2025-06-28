import Button from '@components/ui/Button/Button';
import Input from '@components/ui/Input/Input';
import Textarea from '@components/ui/Textarea/Textarea';

function App() {
  return (
    <>
      <h1>Редактор Резюме</h1>
      <Input placeholder="Должность" />
      <Textarea placeholder="Описание"></Textarea>
      <Button variant="primary" size="lg">
        Primary
      </Button>
      <Button variant="accent" size="md">
        Accent
      </Button>
      <Button variant="danger" size="lg">
        Danger
      </Button>
    </>
  );
}

export default App;
