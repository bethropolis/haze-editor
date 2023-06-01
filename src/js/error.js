import ErrorDialogue from "../lib/error.svelte";

export function Err(name,msg ) {
  console.log(name, msg)
const error = new ErrorDialogue({
        target: document.body,
        props: {
            msg,
            name,
        },
    })
    error.showError();
}