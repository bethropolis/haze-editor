import { db } from "../db";
import { setThemeMode } from "./editor";
import { Err } from "./toast";

const cacheName = "plugin-cache";
const cache = await caches.open(cacheName);
export async function installPlugin(plugin) {
  try {
    const response = await fetch(plugin.file, { cache: "no-cache" });
    const fileBlob = await response.blob();
    await cache.put(plugin.file, new Response(fileBlob));
    await storePlugin(plugin);
    return true;
  } catch (error) {
    Err("Error installing plugin: " + error);
    return false;
  }
}
async function storePlugin(plugin) {
  // @ts-ignore
  await db.plugins.put({
    name: plugin.name,
    content: plugin,
    file: plugin.file,
  });
  return true;
}

export async function applyThemeCSS(plugin) {
  try {
    const cachedResponse = await cache.match(plugin.file);
    if (cachedResponse) {
      const fileBlob = await cachedResponse.blob();
      fileBlob.text().then((text) => {
        // insert the css into the page header
        // remove previous css style tag
        const s = document.querySelector("style[data-type='theme']");
        if (s) {
          document.head.removeChild(s);
        }
        let style = document.createElement("style");
        style.innerHTML = text;
        style.setAttribute("data-type", "theme");
        document.head.appendChild(style);
        setThemeMode(plugin?.mode);
      });
    } else {
      Err(" Error styling theme not found");
      return false;
    }
  } catch (error) {
    Err(" Error applying theme CSS");
    return false;
  }
}

export async function executePluginScript(plugin) {
  try {
    const cachedResponse = await cache.match(plugin.file);
    if (cachedResponse) {
      const fileBlob = await cachedResponse.blob();
      const scriptText = await fileBlob.text();

      const s = document.querySelector("script[data-type='plugin']");
      if (s) {
        document.head.removeChild(s);
      }
      const script = document.createElement("script");
      script.innerHTML = scriptText;
      script.setAttribute("data-type", "plugin");
      document.head.appendChild(script);
    } else {
      Err(" Error Plugin Script not found");
      return false;
    }
  } catch (error) {
    Err(" Error executing plugin script");
    return false;
  }
}
