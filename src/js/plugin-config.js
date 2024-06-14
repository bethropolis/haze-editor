const PluginGistID = "63b21fc999c51181d023346032e25f1a";

let baseUrl = "https://api.github.com/gists/";

export async function getPluginUrl() {
  let url = baseUrl + PluginGistID;
  let response = await fetch(url);
  let data = await response.json();
  return data.files["plugins.json"].raw_url;
}
