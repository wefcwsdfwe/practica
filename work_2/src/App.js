import React from 'react';
import Timer from './timer';
import title from './title.module.css';

const App = () => {
  return (
    <div>
      <h1 className={title.style}>timer</h1>
      <Timer />
    </div>
  );
};

export default App;