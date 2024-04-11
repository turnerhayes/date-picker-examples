import { onInit } from "./oninit";

const callbacks: (() => void)[] = [];

export const triggerReset = () => {
  for (const callback of callbacks) {
    callback();
  }
};

export const onReset = (callback: () => void) => {
  callbacks.push(callback);
  onInit(() => {
    const button = document.getElementById("reset-button")!;
    button.addEventListener("click", triggerReset);
  });
};
