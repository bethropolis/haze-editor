import "beercss";
import './app.css';
import App from './App.svelte'

import {overrideGlobalConsole} from "./js/console.js"
overrideGlobalConsole()


const app = new App({
  target: document.getElementById('app'),
})

export default app
