const callbacks: (() => void)[] = [];

export const onReset = (callback: () => void) => {
  if (document.readyState === "loading") {
    callbacks.push(callback);
  } else {
    const button = document.getElementById("reset-button")!;
    for (let i = callbacks.length - 1; i >= 0; i--) {
      button.addEventListener("click", callbacks[i]);
      callbacks.splice(i, 1);
    }
    button.addEventListener("click", callback);
  }
};
