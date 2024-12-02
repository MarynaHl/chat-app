import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Імпорт стилів
import App from './App'; // Імпорт основного компонента App
import reportWebVitals from './reportWebVitals'; // Для вимірювання продуктивності

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals(); // Опціонально
