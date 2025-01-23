import React, { useEffect, useRef, useState } from "react";
import interact from "interactjs";

export const Home = () => {
  const [elements, setElements] = useState([]); // State to track all shapes
  const positionRefs = useRef({}); // Store positions for each shape

  useEffect(() => {
    // Initialize interact.js for draggable and resizable functionality
    interact(".draggable").draggable({
      listeners: {
        move(event) {
          const id = event.target.dataset.id;
          const position = positionRefs.current[id];
          positionRefs.current[id] = {
            x: position.x + event.dx,
            y: position.y + event.dy,
          };
          event.target.style.transform = `translate(${positionRefs.current[id].x}px, ${positionRefs.current[id].y}px)`;
        },
      },
    });

    interact(".draggable").resizable({
      edges: { top: true, left: true, bottom: true, right: true },
      listeners: {
        move(event) {
          const id = event.target.dataset.id;
          let { x, y } = event.target.dataset;

          x = (parseFloat(x) || 0) + event.deltaRect.left;
          y = (parseFloat(y) || 0) + event.deltaRect.top;

          Object.assign(event.target.style, {
            width: `${event.rect.width}px`,
            height: `${event.rect.height}px`,
            transform: `translate(${x}px, ${y}px)`,
          });

          Object.assign(event.target.dataset, { x, y });
          positionRefs.current[id] = { x, y };
        },
      },
    });

    return () => interact(".draggable").unset(); // Cleanup interact.js on unmount
  }, [elements]);

  const addShape = (type) => {
    const id = `${type}-${Date.now()}`; // Unique ID for the shape
    setElements((prev) => [
      ...prev,
      { id, type, x: 0, y: 0, width: 100, height: 100 },
    ]);
    positionRefs.current[id] = { x: 0, y: 0 }; // Initialize position
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "scroll",
        backgroundColor: "#f0f0f0",
        position: "relative",
      }}
    >
      {/* Buttons */}
      <div
        style={{
          position: "fixed",
          top: "1rem",
          left: "1rem",
          zIndex: 10,
          backgroundColor: "#fff",
          padding: "10px",
          borderRadius: "5px",
          boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
        }}
      >
        <button
          onClick={() => addShape("circle")}
          style={{
            marginRight: "1rem",
            padding: "10px 20px",
            backgroundColor: "#4CAF50",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Add Circle
        </button>
        <button
          onClick={() => addShape("rectangle")}
          style={{
            padding: "10px 20px",
            backgroundColor: "#008CBA",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Add Rectangle
        </button>
      </div>

      {/* Canvas */}
      <div
        style={{
          width: "5000px",
          height: "5000px",
          backgroundColor: "#fff",
          border: "1px solid #ddd",
          position: "relative",
          margin: "0 auto",
        }}
      >
        {elements.map(({ id, type, x, y, width, height }) => (
          <div
            key={id}
            className="draggable"
            data-id={id}
            data-x={x}
            data-y={y}
            style={{
              width: `${width}px`,
              height: `${height}px`,
              backgroundColor: type === "circle" ? "#ff5722" : "#2196f3",
              borderRadius: type === "circle" ? "50%" : "0",
              color: "#fff",
              fontSize: "16px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "move",
              padding: "10px",
              position: "absolute",
              left: `${x}px`,
              top: `${y}px`,
            }}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </div>
        ))}
      </div>
    </div>
  );
};
