import { code, customEventStore } from "../store";

export function clearEditor() {
  code.set({ html: "", css: "", js: "" });
  return true;
}

export function toggleDarkMode() {
  const body = document.querySelector("body");
  body.classList.toggle("dark");
}

export function setEvent(name) {
  customEventStore.set({ name, data: null });
}
