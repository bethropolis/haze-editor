import "beercss";
import './app.css'
import App from './App.svelte'

let theme = await ui("theme", "#ffd700");
const app = new App({
  target: document.getElementById('app'),
})

export default app
