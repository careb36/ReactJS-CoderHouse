import { createRoot } from 'react-dom/client'

import App from './App.jsx'
import './index.css'
import { StrictMode } from 'react';

const raiz = document.getElementById('root');

createRoot(raiz).render(<App/>)

