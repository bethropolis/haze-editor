// @ts-nocheck
import { writable } from "svelte/store";
import { db } from "./db";

export const active = writable("code");
export const activeTab = writable(null);
export const viewActive = writable("view");

export const lang = writable("html");
const [ css = "",html = "", js = ""] = await db.save.toArray().then((files)=>{
  return files;
})


export const navItems = writable([
  { icon: "code", label: "code" },
  { icon: "account_tree", label: "changes" },
  { icon: "done_outline", label: "Todo" },
  { icon: "code", label: "Code" },
  { icon: "widgets", label: "plugins" },
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

export const tabTwo = writable([{ label: "view", lang: null , activeStatus: true}]);

// Create a writable store to hold custom events
export const customEventStore = writable({ name: '', data: null });

// comment
export const comment = writable('changed some stuff');