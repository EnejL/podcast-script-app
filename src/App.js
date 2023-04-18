import React, { useState, useRef } from "react";
import html2pdf from "html2pdf.js";

function App() {
  const [textareas, setTextareas] = useState([]);
  const [jingles, setJingles] = useState([]);

  const mainAreaRef = useRef(null);

  const addTextarea = () => {
    const newTextArea = {
      value: "",
      wordCount: 0,
      readingTime: 0,
    };
    setTextareas([...textareas, newTextArea]);
  };

  const addJingle = () => {
    const newJingle = {
      value: 0,
    };
    setJingles([...jingles, newJingle]);
  };

  const handleJingleChange = (index, value) => {
    const newJingles = [...jingles];
    newJingles[index].value = value;
    setJingles(newJingles);
  };

  const handleTextareaChange = (index, value) => {
    const newTextArea = [...textareas];
    newTextArea[index].value = value;
    newTextArea[index].wordCount = value.trim().split(/\s+/).length;
    newTextArea[index].readingTime = Math.ceil(
        newTextArea[index].wordCount / 200
    );
    setTextareas(newTextArea);
  };

  const handleDeleteTextarea = (index) => {
    const updatedTextareas = [...textareas];
    updatedTextareas.splice(index, 1);
    setTextareas(updatedTextareas);
  };

  const handleDeleteJingle = (index) => {
    const updatedJingles = [...jingles];
    updatedJingles.splice(index, 1);
    setJingles(updatedJingles);
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

  const totalWordCount = textareas.reduce(
      (total, textarea) => total + textarea.wordCount,
      0
  );

  const totalReadingTime = textareas.reduce(
      (total, textarea) => total + textarea.readingTime,
      0
  ) + jingles.reduce((total, jingle) => total + jingle.value, 0);

  return (
      <div className="App">
        <div className="sidebar">
          <button className="btn" onClick={addTextarea}>Add Text area</button>
          <button className="btn" onClick={addJingle}>Add Jingle</button>
          <p>Total Word Count: {totalWordCount}</p>
          <p>Total Reading Time: {totalReadingTime} minutes</p>
          <button className="btn btn-download" onClick={handleDownload}>Download</button>
        </div>
        <div className="main-area" ref={mainAreaRef}>
          {textareas.map((textarea, index) => (
              <div key={index} className="textarea-container" id={`textarea-${index}`}>
                <h3>Text area {index + 1}: </h3>
                <textarea
                    value={textarea.value}
                    onChange={(e) => handleTextareaChange(index, e.target.value)}
                    className="textarea"
                    placeholder="Insert your text here"
                />
                <p>Word Count: {textarea.wordCount}</p>
                <p>Reading Time: {textarea.readingTime} minutes</p>
                <button className="btn btn-delete" onClick={() => handleDeleteTextarea(index)}>X</button>
              </div>
          ))}
          {jingles.map((jingle, index) => (
              <div key={index} className="jingle-container" id={`jingle-${index}`}>
                <h3>Jingle {index + 1}: </h3>
                <label>Insert sound effect duration in seconds</label>
                <input
                    type="number"
                    value={jingle.value}
                    onChange={(e) =>
                        handleJingleChange(index, parseInt(e.target.value))
                    }
                    placeholder="Sound effect (in seconds)"
                />
                <button className="btn btn-delete" onClick={() => handleDeleteJingle(index)}>X</button>
              </div>
          ))}
        </div>
      </div>
  );
}

export default App;
