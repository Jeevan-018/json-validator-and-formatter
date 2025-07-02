import React, { useState } from "react";
import Header from "./components/Header";
import Editor from "./components/Editor";
import Toolbar from "./components/Toolbar";
import "./App.css";

// Enhanced validator with line number error reporting
const isValidJsonManually = (str) => {
  str = str.trim();
  if (!str) return { valid: false, message: "Empty input" };

  if (
    (str[0] !== "{" && str[0] !== "[") ||
    (str[str.length - 1] !== "}" && str[str.length - 1] !== "]")
  ) {
    return { valid: false, message: "Must start and end with {} or []" };
  }

  // Check for trailing commas
  const trailingComma = /,(\s*[}\]])/;
  if (trailingComma.test(str)) {
    const line = getLineOfMatch(str, trailingComma);
    return { valid: false, message: `Trailing comma found at line ${line}` };
  }

  // Check for consecutive or misplaced commas
  const doubleComma = /,,|\[,|,\]/;
  if (doubleComma.test(str)) {
    const line = getLineOfMatch(str, doubleComma);
    return {
      valid: false,
      message: `Consecutive/misplaced comma at line ${line}`,
    };
  }

  // Check for basic key structure
  const keyCheck = /"(.*?)"\s*:/g;
  if (str[0] === "{" && !keyCheck.test(str)) {
    return { valid: false, message: "Missing quoted keys" };
  }

  // Check for balanced brackets, braces, and quotes
  let inQuotes = false;
  let braces = 0,
    brackets = 0,
    lineNumber = 1;

  for (let i = 0; i < str.length; i++) {
    const ch = str[i];
    if (ch === "\n") lineNumber++;

    if (ch === '"' && str[i - 1] !== "\\") {
      inQuotes = !inQuotes;
    }

    if (!inQuotes) {
      if (ch === "{") braces++;
      else if (ch === "}") braces--;
      else if (ch === "[") brackets++;
      else if (ch === "]") brackets--;

      if (braces < 0 || brackets < 0) {
        return {
          valid: false,
          message: `Mismatched closing brace/bracket at line ${lineNumber}`,
        };
      }
    }
  }

  if (inQuotes) return { valid: false, message: "Unclosed quote detected" };
  if (braces !== 0) return { valid: false, message: "Unbalanced braces" };
  if (brackets !== 0) return { valid: false, message: "Unbalanced brackets" };

  return { valid: true };
};

// 🔧 Helper: Get line number of a regex match
const getLineOfMatch = (str, regex) => {
  const match = regex.exec(str);
  if (!match) return "?";
  const index = match.index;
  const before = str.substring(0, index);
  return before.split("\n").length;
};

function App() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [indent, setIndent] = useState("2");

  const handleValidate = () => {
    const result = isValidJsonManually(input);
    if (result.valid) {
      alert(" ^_^ JSON looks valid .......!");
    } else {
      alert(` Invalid JSON........!!!: ${result.message}`);
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
