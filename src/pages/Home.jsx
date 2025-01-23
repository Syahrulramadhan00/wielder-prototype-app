import React, { useEffect, useRef } from "react";
import interact from "interactjs";

export const Home = () => {
  const position = useRef({ x: 0, y: 0 });
  const draggableRef = useRef(null);

  useEffect(() => {
    const div = draggableRef.current;

    interact(".draggable").draggable({
      listeners: {
        move(event) {
          const { x, y } = position.current;
          position.current = {
            x: x + event.dx,
            y: y + event.dy,
          };
          event.target.style.transform = `translate(${position.current.x}px, ${position.current.y}px)`;
        },
      },
    });

    interact(".draggable").resizable({
      edges: { top: true, left: true, bottom: true, right: true },
      listeners: {
        move(event) {
          let { x, y } = event.target.dataset;
          x = (parseFloat(x) || 0) + event.deltaRect.left;
          y = (parseFloat(y) || 0) + event.deltaRect.top;

          Object.assign(event.target.style, {
            width: `${event.rect.width}px`,
            height: `${event.rect.height}px`,
            transform: `translate(${x}px, ${y}px)`,
          });

          Object.assign(event.target.dataset, { x, y });
        },
      },
    });

    return () => interact(".draggable").unset();
  }, []);

  return (
    <div>
      <div
        ref={draggableRef}
        className="draggable"
        data-x="0"
        data-y="0"
        style={{
          width: "120px",
          height: "120px",
          backgroundColor: "#29e",
          color: "#fff",
          fontSize: "20px",
          fontFamily: "sans-serif",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "0.75rem",
          padding: "20px",
          margin: "1rem",
        }}
      >
        Draggable and Resizable Element
      </div>
    </div>
  );
};
