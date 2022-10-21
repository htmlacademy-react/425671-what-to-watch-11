import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import films from './mock/films.json'; //temp films database

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <App films={films} filmsCount={20} filmPromo={films[0]}/>
  </React.StrictMode>,
);
