import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { StrictMode } from 'react';

const raiz = document.getElementById('root');

createRoot(raiz).render(<App/>)

