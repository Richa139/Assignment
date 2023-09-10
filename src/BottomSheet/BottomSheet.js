import React, { useState } from "react";
import "./BottomSheetstyle.css";

const BottomSheet = () => {
  const [position, setPosition] = useState("closed");
  const [dragStartY, setDragStartY] = useState(null);
  const [dragging, setDragging] = useState(false);

  const handleMouseDown = (e) => {
    setDragStartY(e.clientY);
    setDragging(true);
  };

  const handleMouseMove = (e) => {
    if (dragging) {
      const deltaY = e.clientY - dragStartY;
      const sheetHeight = window.innerHeight - 100; // Adjust as needed
      const snapThreshold = sheetHeight / 3; // Adjust snap threshold as needed

      if (deltaY > snapThreshold) {
        setPosition("closed");
      } else if (deltaY < -snapThreshold) {
        setPosition("fully-open");
      } else {
        setPosition("half-open");
      }
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  return (
    <div
      className={`bottom-sheet ${position}`}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div className="handle" onMouseDown={handleMouseDown}></div>
      <div className="content">
        {/* Content of the bottom sheet */}
        <h2>Bottom Sheet Content</h2>
        <p>Your content here.</p>
      </div>
      <div className="snap-points">
        <button onClick={() => setPosition("closed")}>Close</button>
        <button onClick={() => setPosition("half-open")}>Half Open</button>
        <button onClick={() => setPosition("fully-open")}>Fully Open</button>
      </div>
    </div>
  );
};

export default BottomSheet;
