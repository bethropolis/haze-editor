// @ts-nocheck
import { db } from "../db";
import { code } from "../store";
import { toast } from "./toast";

let writtenCode;
let unsubscribe = code.subscribe((value) => {
  writtenCode = value;
});

export const save = async function () {
  const files = [
    { name: "html", content: writtenCode.html },
    { name: "css", content: writtenCode.css },
    { name: "js", content: writtenCode.js },
  ];

  let u = await undo();

  await db.save.bulkPut(files);
  toast("saved","success", {
    aName: "undo",
    action: function () {
      db.save.bulkPut(undo);
    },
  });
};

async function undo() {
  const [html, css, js] = await Promise.all([
    db.save.get("html").then((file) => file || ""),
    db.save.get("css").then((file) => file || ""),
    db.save.get("js").then((file) => file || ""),
  ]);
  let u = [html, css, js];

  return u;
}
