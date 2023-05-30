import { writable } from "svelte/store";

export const active = writable("changes");
export const activeTab = writable(null);
export const viewActive = writable("view");

export const lang = writable("html");

export const navItems = writable([
  { icon: "code", label: "code" },
  { icon: "account_tree", label: "changes" },
  { icon: "arrow_forward", label: "Right" },
  { icon: "code", label: "Code" },
  { icon: "widgets", label: "Explore" },
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

// comment
export const comment = writable('changed some stuff');