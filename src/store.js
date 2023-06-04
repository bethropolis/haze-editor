// @ts-nocheck
import { writable } from "svelte/store";
import { DB, db } from "./db";

export const active = writable("settings");
export const activeTab = writable(null);
export const viewActive = writable("view");

export const lang = writable("html");
const [ css = "",html = "", js = ""] = await db.save.toArray().then((files)=>{
  return files;
})


export const navItems = writable([
  { icon: "code", label: "code" }, // the code editor
  { icon: "account_tree", label: "changes" },// version controll
  { icon: "library_books", label: "Libraries" }, // package/library management for editor
  { icon: "done_outline", label: "Todo" },// @todo app intergration
  { icon: "extension", label: "plugins" }, // extensions for edditor
]);

export const code = writable({
  html: html.content,
  css: css.content,
  js: js.content,
});

export const tabOne = writable([
 {label: "html", lang: "html", placeholder:"write your html code here, e.g. <h1>Hello World</h1>" },
  { label: "css", lang: "css", placeholder: "write your css code here" },
  { label: "js", lang: "js", placeholder: "write your js code here" },
]);

export const tabTwo = writable([
  { label: "view", lang: null , activeStatus: true},
  { label: "console", lang: null , activeStatus: false},

]);

// Create a writable store to hold custom events
export const customEventStore = writable({ name: '', data: null });

// settings
const defaultSettings = [{
  navLabels:{
    value: true,
    type: "switch",
    label: "Navigation Labels"
  },
}]
let s = DB.get("settings")||defaultSettings;

export const settings = writable(s);
