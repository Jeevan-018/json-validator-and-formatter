import React from "react";

export default function Editor({ value, onChange, placeholder }) {
  return (
    <textarea
      className="editor"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
}
