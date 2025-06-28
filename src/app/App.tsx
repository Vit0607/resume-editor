import Button from '@components/ui/Button/Button';
import Input from '@components/ui/Input/Input';

function App() {
  return (
    <>
      <h1>Редактор Резюме</h1>
      <Input placeholder="Должность" />
      <Button variant="primary">Primary</Button>
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
