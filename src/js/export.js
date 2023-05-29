// @ts-nocheck
import { createTemplate } from "./template";

export function exportCodeAsHtml(html, css, js) {
  const combinedCode = createTemplate(html, css, js);
  const blob = new Blob([combinedCode], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "index.html";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// import
export function handleFileSelect(event) {
  const reader = new FileReader();
  const file = event.target.files[0];

  return new Promise((resolve, reject) => {
    reader.onload = function (event) {
      const combinedCode = event.target.result;
      const parser = new DOMParser();
      const doc = parser.parseFromString(combinedCode, "text/html");
      const head = doc.head;
      const body = doc.body;
      const style = doc.querySelector("style");
      const script = doc.querySelector("script:not([src])");

      // Remove script and style tags from body
      Array.from(body.querySelectorAll("script, style")).forEach((el) =>
        el.remove()
      );

      
      resolve({
        html: body.innerHTML || "",
        css: style?.innerHTML || "",
        js: script?.innerHTML || "",
      });
    };

    reader.onerror = function (event) {
      reject(event.target.error);
    };

    reader.readAsText(file);
  });
}
