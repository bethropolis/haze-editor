import { db } from "../db";
// @ts-ignore
const libs = await db.libs.toArray();
let csslibs = "";
let jslibs = "";
async function getLibs() {
  csslibs = "";
  jslibs = "";
  await libs
    .filter((lib) => lib.type === "css")
    .forEach((lib) => {
      if (lib.active) {
        csslibs += `<link rel="stylesheet" href="${lib.file}" />\n`;
      }
    });

  await libs
    .filter((lib) => lib.type === "css" && lib.active)
    .forEach((lib) => {
      jslibs += `<script src="${lib.file}"></script>\n`;
    });
}

export async function createTemplate(html, css, js) {
  await getLibs();
  console.debug(csslibs, jslibs);
  return `
      <html>
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
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
          <script>${js}</script>
        </body>
      </html>
    `;
}
