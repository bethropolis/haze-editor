import Toast from "../lib/ui/toast.svelte";

export function toast(msg, options = {}) {
  
    const toast = new Toast({
        target: document.body,
        props: {
            msg,
            aName: options?.aName,
            action: options?.action
        },
    })
    toast.showToast();
}