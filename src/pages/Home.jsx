import React, { useEffect, useRef, useState } from "react";
import interact from "interactjs";

export const Home = () => {
  const position = useRef({ x: 0, y: 0 });
  const draggableRef = useRef(null);

  useEffect(() => {
    const div = draggableRef.current;

    // Initialize draggable functionality
    interact(".draggable").draggable({
      listeners: {
        start(event) {
          console.log("Drag Start", event.target);
        },
        move(event) {
          const { x, y } = position.current;
          position.current = {
            x: x + event.dx,
            y: y + event.dy,
          };

          event.target.style.transform = `translate(${position.current.x}px, ${position.current.y}px)`;

          // Log the updated position and size of the element
          logElementStyles();
        },
      },
    });

    // Initialize resizable functionality
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

          // Log the updated position and size of the element
          logElementStyles();
        },
      },
    });

    return () => {
      // Cleanup draggable and resizable functionality
      interact(".draggable").unset();
    };
  }, []);

  // Log the styles of the draggable element
  const logElementStyles = () => {
    const div = draggableRef.current;

    if (div) {
      const inlineStyles = div.style;
      console.log("Element Styles:");
      console.log("Width:", inlineStyles.width);
      console.log("Height:", inlineStyles.height);
      console.log("Background Color:", inlineStyles.backgroundColor);
      console.log("Color:", inlineStyles.color);
      console.log("Font Size:", inlineStyles.fontSize);
      console.log("Font Family:", inlineStyles.fontFamily);
      console.log("Position:", {
        top: div.offsetTop,
        left: div.offsetLeft,
      });
    }
  };

  // Generate exportable HTML
  const generateExportHTML = () => {
    const div = draggableRef.current;

    if (!div) return;

    const inlineStyles = `
      position: absolute;
      top: ${div.offsetTop}px;
      left: ${div.offsetLeft}px;
      width: ${div.style.width};
      height: ${div.style.height};
      background-color: ${div.style.backgroundColor};
      color: ${div.style.color};
      font-size: ${div.style.fontSize};
      font-family: ${div.style.fontFamily};
      text-align: center;
      line-height: ${div.style.lineHeight};
      border-radius: ${div.style.borderRadius};
      display: ${div.style.display};
      justify-content: ${div.style.justifyContent};
      align-items: ${div.style.alignItems};
    `;

    const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Exported Component</title>
        <style>
          body {
            margin: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
            background-color: #f0f0f0;
          }
        </style>
      </head>
      <body>
        <div class="draggable" style="${inlineStyles}">
          ${div.innerHTML}
        </div>
      </body>
      </html>
    `;

    return html;
  };

  // Trigger download
  const downloadHTMLFile = () => {
    const html = generateExportHTML();
    if (!html) return;

    const blob = new Blob([html], { type: "text/html" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "draggable_component.html";
    link.click();
  };

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
      <button
        onClick={downloadHTMLFile}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#29e",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Export to HTML
      </button>
    </div>
  );
};
