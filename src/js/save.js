import { db } from "../db";
import { code } from "../store";

let writtenCode;
let unsubscribe = code.subscribe((value) => {
  writtenCode = value;
});


export const save = function() {
  const files = [
    { name: "html", content: writtenCode.html },
    { name: "css", content: writtenCode.css },
    { name: "js", content: writtenCode.js }
  ];

  // @ts-ignore
  db.save.bulkPut(files);
};
