import { writable } from "svelte/store";

export const active = writable("home");
export const viewActive = writable("view");

export const lang = writable("html");

export const navItems = writable([
  { icon: "home", label: "home" },
  { icon: "widgets", label: "Explore" },
  { icon: "arrow_back", label: "Left" },
  { icon: "arrow_forward", label: "Right" },
  { icon: "code", label: "Code" },
]);

export const code = writable({
  html: "",
  css: "",
  js: "",
});

export const tabOne = writable([
 {label: "html", lang: "html", placeholder:"write your html code here, e.g. <h1>Hello World</h1>" },
  { label: "css", lang: "css", placeholder: "write your css code here" },
  { label: "js", lang: "js", placeholder: "write your js code here" },
]);

export const tabTwo = writable([{ label: "view", lang: null , activeStatus: true}]);

// Create a writable store to hold custom events
export const customEventStore = writable({ name: '', data: null });
