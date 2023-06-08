import { DB } from "../db";
import { active, code, customEventStore } from "../store";

export function clearEditor() {
  code.set({ html: "", css: "", js: "" });
  return true;
}

export function toggleDarkMode() {
  const body = document.querySelector("body");
  setThemeMode(body.classList.contains("dark") ? "light" : "dark");
}
export function setThemeMode(mode = "light") {
  const body = document.querySelector("body");
  if (mode === "dark") {
    body.classList.add("dark");
  } else {
    body.classList.remove("dark");
  }
  DB.set("theme", mode);
}

export function setEvent(name) {
  customEventStore.set({ name, data: null });
}

export function nav(to) {
  active.set(to);
}

await setThemeMode(DB.get("theme"));