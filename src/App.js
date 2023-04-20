import React, { useState, useRef } from 'react';
import html2pdf from "html2pdf.js";

function App() {
    const mainAreaRef = useRef(null);
    const [scriptItems, setScriptItems] = useState([]);

    const handleTextAreaClick = () => {
        setScriptItems([
            ...scriptItems,
            <div className="main-container textblock-container" id={scriptItems.length} key={scriptItems.length}>
                <h3 className="block-header">Text Block {scriptItems.length}</h3>
                <input
                    type="text"
                    className="block-title textblock-title"
                    placeholder="Insert text block title"
                />
                <textarea
                    className="textarea textarea-body"
                    rows="10"
                    placeholder="Insert text block content"
                />
                <button className="btn btn-delete" onClick={() => handleDeleteClick(scriptItems.length)}>X</button>
            </div>
        ]);
    };

    const handleJingleClick = () => {
        setScriptItems([
          ...scriptItems,
          <div
              className="main-container sound-effect-container" id={scriptItems.length} key={scriptItems.length}>
              <h3 className="block-header">Sound Effect {scriptItems.length}</h3>
              <input
                  type="text"
                  className="block-title sound-effect-title"
                  placeholder="Insert sound effect title"
              />
              <input
                  type="number"
                  className="input"
                  placeholder="Insert sound effect duration (seconds)"
              />
              <button className="btn btn-delete" onClick={() => handleDeleteClick(scriptItems.length)}>X</button>
          </div>
        ]);
    };

    const handleDeleteClick = (index) => {
        const newScriptItems = [...scriptItems];
        newScriptItems.splice(index, 1);
        setScriptItems(newScriptItems);
    };

    const handleDeleteAllClick = () => {
        if (window.confirm("Are you sure you want to delete all items?")) {
            setScriptItems([]);
        }
    };

    const handleDownload = () => {
        const element = mainAreaRef.current;
        const opt = {
            margin: 0.5,
            filename: "myScript.pdf",
            image: { type: "jpeg", quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
        };
        html2pdf().set(opt).from(element).save();
    };

    return (
      <div className="App">
        <div className="sidebar">
            <button className="btn" onClick={handleTextAreaClick}>Add Text Block</button>
            <button className="btn" onClick={handleJingleClick}>Add Sound Effect</button>
            <button className="btn btn-delete-all" onClick={handleDeleteAllClick}>Delete All</button>
            <button className="btn btn-download" onClick={handleDownload}>Download Script</button>
        </div>
        <div className="main-area" ref={mainAreaRef}>
            {scriptItems.map((item, index) => (
                <div className="main-area-lvl-1" key={index}>
                    {item}
                </div>
            ))}
        </div>
      </div>
    );
}

export default App;
