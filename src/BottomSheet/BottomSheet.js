// import React, { useState } from "react";
// // import "./BottomSheet.css"; // Create a corresponding CSS file
// // import "/src/BottomSheet.css";
// import "./BottomSheetstyle.css";
// const BottomSheet = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [position, setPosition] = useState(0); // 0 for closed, 1 for half-open, 2 for fully open

//   const toggleSheet = () => {
//     setIsOpen(!isOpen);
//   };

//   const snapToPosition = (newPosition) => {
//     setPosition(newPosition);
//   };

//   const getSheetPositionStyle = () => {
//     const positionStyles = [
//       { transform: "translateY(100%)" }, // Closed position
//       { transform: "translateY(50%)" }, // Half-open position
//       { transform: "translateY(0%)" } // Fully open position
//     ];
//     return positionStyles[position];
//   };

//   return (
//     <div
//       className={`bottom-sheet ${isOpen ? "open" : ""}`}
//       style={getSheetPositionStyle()}
//     >
//       <div className="handle" onClick={toggleSheet}></div>
//       <div className="content">
//         {/* Content of the bottom sheet */}
//         <h2>Bottom Sheet Content</h2>
//         <p>Your content here.</p>
//       </div>
//       <div className="snap-points">
//         <button onClick={() => snapToPosition(0)}>Close</button>
//         <button onClick={() => snapToPosition(1)}>Half Open</button>
//         <button onClick={() => snapToPosition(2)}>Fully Open</button>
//       </div>

//     </div>
//   );
// };

// export default BottomSheet;

// 2nd code
// import React, { useState } from 'react';
// import './BottomSheetstyle.css';

// const BottomSheet = () => {
//   const [position, setPosition] = useState('closed');
//   const [isDragging, setIsDragging] = useState(false);
//   const [dragStartY, setDragStartY] = useState(0);
//   const [sheetY, setSheetY] = useState(0);

//   const handleMouseDown = (e) => {
//     setIsDragging(true);
//     setDragStartY(e.clientY);
//     setSheetY(e.clientY);
//   };

//   const handleMouseMove = (e) => {
//     if (isDragging) {
//       const deltaY = e.clientY - dragStartY;
//       setSheetY(Math.min(0, deltaY));
//     }
//   };

//   const handleMouseUp = () => {
//     if (isDragging) {
//       setIsDragging(false);
//       // Calculate the nearest snap point and update 'position' state
//       const nearestSnapPoint = calculateNearestSnapPoint(sheetY);
//       setPosition(nearestSnapPoint);
//     }
//   };

//   const calculateNearestSnapPoint = (y) => {
//     // Implement logic to determine the nearest snap point based on 'y' position
//     // Return 'closed', 'half-open', or 'fully-open'
//   };

//   const handleClosedButtonClick = () => {
//     setPosition('closed');
//   };

//   const handleHalfOpenButtonClick = () => {
//     setPosition('half-open');
//   };

//   const handleFullyOpenButtonClick = () => {
//     setPosition('fully-open');
//   };

//   return (
//     <div
//       className={`bottom-sheet ${position}`}
//       style={{ transform: `translateY(${sheetY}px)` }}
//     >
//       <div
//         className="handle"
//         onMouseDown={handleMouseDown}
//         onMouseMove={handleMouseMove}
//         onMouseUp={handleMouseUp}
//         onMouseLeave={handleMouseUp}
//       ></div>
//       {/* Rest of your component */}

//       <div className="snap-points">
//       <button onClick={handleClosedButtonClick}>Close</button>
//       <button onClick={handleHalfOpenButtonClick}>Half Open</button>
//       <button onClick={handleFullyOpenButtonClick}>Fully Open</button>
//     </div>
//     </div>
//   );
// };

// export default BottomSheet;

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
