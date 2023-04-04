import React from "react";
export default function Square({ val, onSqaureClick }) {
  return (
    <button onClick={onSqaureClick} className="square">
      {val}
    </button>
  );
}
