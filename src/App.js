import React, { useState } from "react";
import Header from "./components/Header";
import Editor from "./components/Editor";
import Toolbar from "./components/Toolbar";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [indent, setIndent] = useState("2");

  const handleValidate = () => {
    try {
      JSON.parse(input);
      alert("^_^ Valid JSON....!");
    } catch (e) {
      alert("Invalid JSON:....!\n" + e.message);
    }
  };

  const handleFormat = () => {
    try {
      const obj = JSON.parse(input);
      setOutput(JSON.stringify(obj, null, parseInt(indent)));
    } catch {
      alert("Invalid JSON:....!");
    }
  };

  const handleMinify = () => {
    try {
      const obj = JSON.parse(input);
      setOutput(JSON.stringify(obj));
    } catch {
      alert("Invalid JSON:....!");
    }
  };

  const handleDownload = () => {
    const blob = new Blob([output], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "data.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="app">
      <Header />
      <div className="app-container">
        <Editor
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter JSON here..."
        />
        <Toolbar
          onValidate={handleValidate}
          onFormat={handleFormat}
          onMinify={handleMinify}
          onDownload={handleDownload}
          indent={indent}
          setIndent={setIndent}
        />
        <Editor
          value={output}
          onChange={() => {}}
          placeholder="Formatted output..."
        />
      </div>
    </div>
  );
}

export default App;
