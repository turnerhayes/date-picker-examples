const callbacks: (() => void)[] = [];

const execCallbacks = () => {
    for (let i = callbacks.length - 1; i >= 0; i--) {
      callbacks[i]();
      callbacks.splice(i, 1);
    }
    window.removeEventListener("DOMContentLoaded", execCallbacks);
};

export const onInit = (callback: () => void) => {
  if (document.readyState === "loading") {
    callbacks.push(callback);
    window.addEventListener("DOMContentLoaded", execCallbacks);
  } else {
    callback();
  }
};
