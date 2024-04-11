import { DATE_CHANGE_EVENT_NAME, DateChangeEvent } from "./date-change-event";
import { checkDate } from "./init";
import { onInit } from "./oninit";
import { onReset } from "./reset";

let startTimestamp: number | null = null;
let endTimestamp: number | null = null;

const setEndTimestamp = (timestamp: number) => {
  endTimestamp = timestamp;
  document
    .getElementById("timer-results")!
    .setAttribute("data-time", "" + (endTimestamp - startTimestamp!));
};

onReset(() => {
  startTimestamp = null;
  endTimestamp = null;
  document.getElementById("timer-results")!.removeAttribute("data-time");
});


const handleInputInteraction = (event: Event) => {
  if (startTimestamp === null) {
    startTimestamp = event.timeStamp;
  }
};

window.addEventListener(DATE_CHANGE_EVENT_NAME, (event: DateChangeEvent) => {
  const date = event.detail;
  if (checkDate(date)) {
    setEndTimestamp(event.timeStamp);
  }
});

onInit(() => {
  const input = document.querySelectorAll<HTMLInputElement | HTMLSelectElement>(
    "input, select"
  );
  const events = ["focus", "blur", "change", "input"];
  for (const el of Array.from(input)) {
    for (const event of events) {
      el.addEventListener(event, handleInputInteraction);
    }
  }
});
