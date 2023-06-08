import Confirm from "../lib/confirm.svelte";

export async function Co(msg) {
  const confirm = new Confirm({
    target: document.body,
    props: {
      message:msg,
    },
  });
  let result = await confirm.show();
  return result;
}
