import React, { useState } from "react";

function Modal({ hidden, setBoards, setHidden, setAdded }) {
  const [input, setInput] = useState("");

  const backgrounds = ["#9acd32", "#1899cc", "#00ffff", "#8a2be2"];
  const [color, setColor] = useState(backgrounds[1]);

  const handleSubmit = () => {
    setBoards([
      {
        boardName: input,
        data: [],
        color: color,
      },
    ]);
    setInput("");
    setColor("#1899cc");
    setHidden(true);
    setAdded(true);
  };

  return (
    <div
      id="myModal"
      className="modal"
      style={{ display: hidden ? "none" : "block" }}
    >
      <div className="modal-container">
        <div className="modal-content" style={{ backgroundColor: color }}>
          <div>
            <input
              type="text"
              className="new-board-entry"
              placeholder="Add board title"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
              }}
            ></input>
            <p style={{ color: "white", fontWeight: "500" }}>Your Workspace</p>
          </div>
          <button
            type="button"
            className="close"
            onClick={() => setHidden(true)}
          >
            &times;
          </button>
        </div>

        <div className="backgrounds">
          {backgrounds.map((val, idx) => (
            <div
              key={idx}
              onClick={(e) => {
                setColor(e.currentTarget.getAttribute("color-value"));
              }}
              color-value={val}
              style={{ backgroundColor: val, padding: "1rem" }}
            ></div>
          ))}
        </div>

        <button
          type="button"
          className="add-board-button"
          onClick={handleSubmit}
        >
          Create board
        </button>
      </div>
    </div>
  );
}

export default Modal;
