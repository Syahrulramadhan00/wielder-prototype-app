export const generateExportHTML = (div) => {
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
  
  export const downloadHTMLFile = () => {
    const div = document.querySelector(".draggable");
    const html = generateExportHTML(div);
    if (!html) return;
  
    const blob = new Blob([html], { type: "text/html" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "draggable_component.html";
    link.click();
  };
  