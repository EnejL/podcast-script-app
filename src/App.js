import React, { useState, useRef } from "react";
import html2pdf from "html2pdf.js";

function App() {
  const [textareas, setTextareas] = useState([]);
  const [jingles, setJingles] = useState([]);

  const mainAreaRef = useRef(null);

  function handleAddTextarea() {
    setTextareas([...textareas, ""]);
  }

  function handleAddJingle() {
    setJingles([...jingles, 0]);
  }

  function handleChange(event, index) {
    const updatedTextareas = [...textareas];
    updatedTextareas[index] = event.target.value;
    setTextareas(updatedTextareas);
  }

  function handleJingleChange(event, index) {
    const updatedJingles = [...jingles];
    updatedJingles[index] = Number(event.target.value);
    setJingles(updatedJingles);
  }

  function calculateReadingTime(text) {
    const words = text.split(/\s+/).length;
    const readingTimeInMinutes = words / 200;
    return Math.round(readingTimeInMinutes);
  }

  function calculateWordCount(text) {
    const words = text.split(/\s+/).filter(Boolean).length;
    return words;
  }

  const totalChars = textareas.reduce((acc, curr) => acc + curr.length, 0);

  const totalReadingTime = textareas.reduce(
    (acc, curr) => acc + calculateReadingTime(curr),
    0
  ) + jingles.reduce((acc, curr) => acc + curr, 0);

  function handleDownload() {
    const mainArea = mainAreaRef.current;
    const options = {
      margin: [0.5, 0.5],
      filename: "textareas.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { dpi: 192, letterRendering: true },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };
    html2pdf().from(mainArea).set(options).save();
  }

  return (
    <div className="App">
      <div className="sidebar">
        <button onClick={handleAddTextarea}>Add Textarea</button>
        <button onClick={handleAddJingle}>Jingle</button>
        <button onClick={handleDownload}>Download</button>
        <div>Total Characters: {totalChars} minutes</div>
        <div>Total Reading Time: {totalReadingTime} minutes</div>
      </div>
      <div className="main-area" ref={mainAreaRef}>
        {textareas.map((textarea, index) => (
          <div key={index}>
            <textarea
              value={textarea}
              onChange={(event) => handleChange(event, index)}
            />
            <div>{textarea.length} characters</div>
            <div>{calculateWordCount(textarea)} words</div>
            <div>
              Estimated Reading Time: {calculateReadingTime(textarea)} minutes
            </div>
          </div>
        ))}
        {jingles.map((jingle, index) => (
          <div key={index}>
            <input
              type="number"
              value={jingle}
              onChange={(event) => handleJingleChange(event, index)}
            />
            <div>Jingle Time: {jingle} minutes</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
