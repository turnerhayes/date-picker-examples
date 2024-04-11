import { onReset } from "./reset";

let startTimestamp: number | null = null;
let endTimestamp: number | null = null;

const debounce = <A extends unknown[]>(
  callback: (...args: A) => void,
  delay: number
) => {
  let timeoutId: number | null = null;

  onReset(() => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  });
  return (...args: A) => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      callback(...args);
      timeoutId = null;
    }, delay);
  };
};

onReset(() => {
  startTimestamp = null;
  endTimestamp = null;
  document.getElementById("timer-results")!.removeAttribute("data-time");
});

const SET_END_DELAY_MS = 8000;

const debouncedSetEndTimestamp = debounce((timestamp: number) => {
  endTimestamp = timestamp;
  document
    .getElementById("timer-results")!
    .setAttribute("data-time", "" + (endTimestamp - startTimestamp!));
}, SET_END_DELAY_MS);

const handleInputInteraction = (event: Event) => {
  if (startTimestamp === null) {
    startTimestamp = event.timeStamp;
  }
  // If the event was a blur, we don't want to set end timestamp if we already
  // have one set--if we just click outside the control we don't want to
  // overwrite the end timestamp.
  if (event.type !== "blur" || !endTimestamp) {
    debouncedSetEndTimestamp(event.timeStamp);
  }
};

const init = () => {
  const input = document.querySelectorAll<HTMLInputElement | HTMLSelectElement>(
    "input, select"
  );
  for (const el of Array.from(input)) {
    el.addEventListener("focus", handleInputInteraction);
    el.addEventListener("blur", handleInputInteraction);
    el.addEventListener("change", handleInputInteraction);
    el.addEventListener("input", handleInputInteraction);
  }
  document.removeEventListener("DOMContentLoaded", init);
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
