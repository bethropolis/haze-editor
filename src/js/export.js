// @ts-nocheck
import { DB, db } from "../db";
import { settings } from "../store";
import { createTemplate } from "./template";

export async function exportCodeAsHtml(html, css, js) {
  const combinedCode = await createTemplate(html, css, js);
  const blob = await new Blob([combinedCode], { type: "text/html" });
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
      Array.from(body.querySelectorAll("script, style, link")).forEach((el) =>
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

settings.subscribe(async (s) => {
  if(s.exportData.value && !DB.get('exported')) {
    const ch = await db.changes.toArray();
    const f = await db.files.toArray();
    const  s = await db.save.toArray();
    const  p = await db.plugins.toArray();
    const  u = await db.users.toArray();
    const  c = await db.comments.toArray();
    const  b = await db.branches.toArray();
    const  l = await db.libs.toArray();
    const  t = await db.todos.toArray();

     let exportData = {
       changes: ch,
       files: f,
       save: s,
       plugins: p,
       users: u,
       comments: c,
       branches: b,
       libs: l,
       todos: t,
     }

     // convert export data to json
     exportData = JSON.stringify(exportData);
     const blob = new Blob([exportData], { type: "application/json" });
     const url = URL.createObjectURL(blob);
     const link = document.createElement("a");
     link.href = url;
     link.download = "haze.json";
     document.body.appendChild(link);
     link.click();
     document.body.removeChild(link);
     URL.revokeObjectURL(url);
     DB.set('exported', true);
  }
});
