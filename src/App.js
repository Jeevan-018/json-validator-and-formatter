import React, { useState } from "react";
import Header from "./components/Header";
import Editor from "./components/Editor";
import Toolbar from "./components/Toolbar";
import "./App.css";

// ✅ Enhanced manual validation function
const isValidJsonManually = (str) => {
  str = str.trim();

  if (!str) return false;

  // Must start with { or [ and end with } or ]
  if (
    (str[0] !== "{" && str[0] !== "[") ||
    (str[str.length - 1] !== "}" && str[str.length - 1] !== "]")
  ) {
    return false;
  }

  // Detect trailing commas
  const trailingCommaObj = /,\s*}/;
  const trailingCommaArr = /,\s*]/;
  if (trailingCommaObj.test(str) || trailingCommaArr.test(str)) {
    return false;
  }

  // Detect consecutive commas
  if (str.includes(",,") || str.includes("[,") || str.includes(",]")) {
    return false;
  }

  // Very basic key-value structure check (if it's an object)
  const keyCheck = /"(.*?)"\s*:/g;
  if (str[0] === "{" && !keyCheck.test(str)) {
    return false;
  }

  // Quote and brace/bracket balance
  let inQuotes = false;
  let braces = 0,
    brackets = 0;

  for (let i = 0; i < str.length; i++) {
    const ch = str[i];

    if (ch === '"' && str[i - 1] !== "\\") {
      inQuotes = !inQuotes;
    }

    if (!inQuotes) {
      if (ch === "{") braces++;
      else if (ch === "}") braces--;
      else if (ch === "[") brackets++;
      else if (ch === "]") brackets--;

      if (braces < 0 || brackets < 0) return false; // early mismatch
    }
  }

  return braces === 0 && brackets === 0 && !inQuotes;
};

function App() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [indent, setIndent] = useState("2");

  const handleValidate = () => {
    if (isValidJsonManually(input)) {
      alert("✅ JSON looks valid (manual check)!");
    } else {
      alert("❌ Invalid JSON (manual check)!");
    }
  };

  const handleFormat = () => {
    try {
      const obj = JSON.parse(input);
      setOutput(JSON.stringify(obj, null, parseInt(indent)));
    } catch (e) {
      alert("❌ Invalid JSON (cannot format)!\n" + e.message);
    }
  };

  const handleMinify = () => {
    try {
      const obj = JSON.parse(input);
      setOutput(JSON.stringify(obj));
    } catch (e) {
      alert("❌ Invalid JSON (cannot minify)!\n" + e.message);
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
