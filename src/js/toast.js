import Toast from "../lib/ui/toast.svelte";

export function toast(msg, type, options = {}) {
  const toast = new Toast({
    target: document.body,
    props: {
      msg,
      type,
      aName: options?.aName,
      action: options?.action,
    },
  });
  toast.showToast();
  setTimeout(() => {
    toast.$destroy();
  }, 2000);
}


export function Err(err) {
  toast(err,"error");
}
export function Success(msg) {
  toast(msg, "green6");
}
