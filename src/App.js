import React, { useState } from "react";
import Header from "./components/Header";
import Editor from "./components/Editor";
import Toolbar from "./components/Toolbar";
import "./App.css";

// 🔧 Manual validation function (basic structure check)
const isValidJsonManually = (str) => {
  str = str.trim();

  if (!str) return false;
  if (
    (str[0] !== "{" && str[0] !== "[") ||
    (str[str.length - 1] !== "}" && str[str.length - 1] !== "]")
  ) {
    return false;
  }

  // Check for basic key-value structure
  const quoteCheck = /"(.*?)"\s*:/g;
  if (!quoteCheck.test(str)) {
    return false;
  }

  // Count braces and brackets
  let braces = 0;
  let brackets = 0;
  let inQuotes = false;

  for (let i = 0; i < str.length; i++) {
    const ch = str[i];

    if (ch === '"' && str[i - 1] !== "\\") {
      inQuotes = !inQuotes;
    }

    if (!inQuotes) {
      if (ch === "{") braces++;
      if (ch === "}") braces--;
      if (ch === "[") brackets++;
      if (ch === "]") brackets--;
    }

    if (braces < 0 || brackets < 0) return false;
  }

  return braces === 0 && brackets === 0;
};

function App() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [indent, setIndent] = useState("2");

  const handleValidate = () => {
    if (isValidJsonManually(input)) {
      alert("^_^ JSON looks valid (manual check)!");
    } else {
      alert("Invalid JSON structure (manual check)!");
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
