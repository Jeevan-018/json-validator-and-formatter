import React from "react";

export default function Toolbar({
  onValidate,
  onFormat,
  onMinify,
  onDownload,
  indent,
  setIndent,
}) {
  return (
    <div className="toolbar">
      <button onClick={onValidate}>Validate</button>
      <select value={indent} onChange={(e) => setIndent(e.target.value)}>
        <option value="2">2 Tab Space</option>
        <option value="4">4 Tab Space</option>
      </select>
      <button onClick={onFormat}>Format / Beautify</button>
      <button onClick={onMinify}>Minify / Compact</button>
      <button onClick={onDownload}>Download</button>
    </div>
  );
}
