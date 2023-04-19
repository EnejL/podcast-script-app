import React, { useState } from 'react';

function App() {
  const [scriptItems, setScriptItems] = useState([]);

  const handleTextAreaClick = () => {
    setScriptItems([...scriptItems, <div className="textarea-container">textarea<textarea key={scriptItems.length} /></div>]);
  };

  const handleJingleClick = () => {
    setScriptItems([
      ...scriptItems,
      <div className="jingle-container">jingle<input key={scriptItems.length} type="number" /></div>,
    ]);
  };

  return (
      <div>
        <button onClick={handleTextAreaClick}>textarea</button>
        <button onClick={handleJingleClick}>jingle</button>
        <div className="main-area">{scriptItems}</div>
      </div>
  );
}

export default App;
