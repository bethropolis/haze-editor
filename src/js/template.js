import { db } from "../db/db";
import { settings } from "../store";
// @ts-ignore
const libs = await db.libs.toArray();
let csslibs = "";
let jslibs = "";
let meta = "";

async function getLibs() {
  csslibs = "";
  jslibs = "";
  await libs
    .filter((lib) => lib.type === "css" && lib.active)
    .forEach((lib) => {
      csslibs += `<link rel="stylesheet" href="${lib.file}" />\n`;
    });

  await libs
    .filter((lib) => lib.type === "js" && lib.active)
    .forEach((lib) => {
      jslibs += `<script src="${lib.file}"></script>\n`;
    });
}

let consoleMessage = `
(function () {
  // Access parent console directly
  var consoleMethods = ["log", "info", "warn", "error"];
  
  consoleMethods.forEach(function (method) {
    console[method] = function (...args) {
      window.parent.logger[method](...args);
    };
  });
})();
`;

settings.subscribe(async (s) => {
  meta = await s.metaData.value;
});


export async function createTemplate(html, css, js) {
  await getLibs();
  return `
      <html>
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          ${meta}
          ${csslibs}
          ${jslibs}          
          <style>
          body,html{
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          ${css}
          </style>
        </head>
        <body>${html || ""}
          <script>
          ${consoleMessage}
          try {
          ${js}
          } catch (error) {
            console.error(error);
          }
          </script>
        </body>
      </html>
    `;
}
