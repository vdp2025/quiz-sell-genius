// Remova a importação do CSS que está causando problemas
// import './index.css';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

createRoot(document.getElementById("root")!).render(<App />);
