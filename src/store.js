// @ts-nocheck
import { writable } from "svelte/store";
import { DB, db } from "./db";

export const active = writable("code");
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


// plugin url
export const pluginUrl = writable("https://gist.githubusercontent.com/bethropolis/63b21fc999c51181d023346032e25f1a/raw/88e5da3443b1c6c0f71ec526bef7c2c9ce43670c/plugins.json");
// Create a writable store to hold custom events
export const customEventStore = writable({ name: '', data: null });

// settings
const defaultSettings =  {
  navLabels: {
    value: true,
    type: "switch",
    label: "Toggle Navigation Labels",
    title: "Navigation"
  },
  todoDate: {
    value: true,
    type: "switch",
    label: "Toggle Todo Date Widget",
    title: "Todo Date"
  },
  backUpButton: {
    value: true,
    type: "switch",
    label: "Toggle Back up Button (used in case of scroll issues)",
    title: "Back up Button"
  },
  ThemeEditMode: {
    value: false,
    type: "switch",
    label: "Edit the app Theme directly in CSS editor (you'll need to turn this feature off to return to edit)",
    title: "Theme Edit Mode"
  },
  pluginUrl: {
    value: "",
    type: "text",
    label: "Enter Plugin URL",
    placeholder: "URL to plugin.json",
    title: "Plugin URL"
  },
  metaData: {
    value: '',
    type: "textarea",
    label: "Enter Head Metadata for the iframe",
    placeholder: "Example: <meta name='viewport'...>",
    title: "Head Metadata"
  },
  exportData: {
    value: false,
    type: "button",
    label: "Export all your Data (import coming soon)",
    short: "Export",
    title: "Export Data"
  },
  deleteData: {
    value: false,
    type: "button",
    label: "Delete all the data stored in your browser",
    short: "Delete",
    title: "Delete Data"
  }
};
let s = DB.get("settings")||defaultSettings;

export const settings = writable(s);
