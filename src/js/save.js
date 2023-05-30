import { db } from "../db";
import { code } from "../store";

let writtenCode;
let unsubscribe = code.subscribe((value) => {
  writtenCode = value;
});

export const save = function () {
  const html = {
    name: "html",
    content: writtenCode.html,
  };
  const css = {
    name: "css",
    content: writtenCode.css,
  };
  const js = {
    name: "js",
    content: writtenCode.js,
  };

  const files = [html, css, js];
  // @ts-ignore
  db.files.bulkPut(files);
};
