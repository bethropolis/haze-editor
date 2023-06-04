// @ts-nocheck
import { DB, db } from "../db";
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
    active: false,
    type: plugin.type,
    mode: plugin.mode || "light",
  });
  return true;
}

/**
 * Applies a CSS theme to the page from a plugin file.
 *
 * @param {Object} plugin - The plugin to retrieve the CSS from remote location
 * @return {Promise} A Promise that resolves when the CSS has been applied.
 */
export async function applyThemeCSS(plugin) {
  try {
    const cachedResponse = await cache.match(plugin.file);
    if (cachedResponse) {
      const fileBlob = await cachedResponse.blob();
      fileBlob.text().then(async (text) => {
        const s = document.querySelector("style[data-type='theme']");
        if (s) {
          document.head.removeChild(s);
          db.plugins
            .where("type")
            .equals("css")
            .modify((plugin) => {
              plugin.active = false;
            });
        }
        let style = document.createElement("style");
        style.innerHTML = text;
        style.setAttribute("data-type", "theme");
        document.head.appendChild(style);
        setThemeMode(plugin?.mode|| "light");
        plugin.active = true;
        db.plugins.where("name").equals(plugin.name).modify({
          active: true,
        });
        DB.set("csstheme", plugin.name);
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
        db.plugins
          .where("active")
          .equals(true)
          .and("type")
          .equals("js")
          .modify({
            active: false,
          });
      }
      const script = document.createElement("script");
      script.innerHTML = scriptText;
      script.setAttribute("data-type", "plugin");
      document.head.appendChild(script);
      plugin.active = true;
      await db.plugins.put(plugin);
    } else {
      Err(" Error Plugin Script not found");
      return false;
    }
  } catch (error) {
    Err(" Error executing plugin script");
    return false;
  }
}

export async function loadPlugin() {
  // get active plugins from db and load them into the page
  const plugins = await db.plugins.toArray();
  await plugins.forEach(async (plugin) => {
    if (plugin.active) {
      if (plugin.type === "theme") {
        await applyThemeCSS(plugin);
      } else {
        await executePluginScript(plugin);
      }
    }
  });
}

// unload the plugin
export async function unloadPlugin(plugin) {
  if(plugin.type === "theme") {
    const s = document.querySelector("style[data-type='theme']");
    if (s) {
      document.head.removeChild(s);
      db.plugins.where("name").equals(plugin.name)
      .modify({
        active: false,
      })
    }
    DB.set("csstheme", "");
  }else{
    const s = document.querySelector("script[data-type='plugin']");
    if (s) {
      document.head.removeChild(s);
      db.plugins.where("name").equals(plugin.name)
      .modify({
        active: false,
      })
    }
  }
}

loadPlugin();
