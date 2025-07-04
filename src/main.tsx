import { createRoot } from 'react-dom/client';

import App from '@app/App';

import './styles/global.scss';

createRoot(document.getElementById('root')!).render(<App />);
