import { DATE_CHANGE_EVENT_NAME, DateChangeEvent } from "./src/date-change-event";

declare global {
    // note, if you augment `WindowEventMap`, the event would be recognized if you
    // are doing window.addEventListener(...), but element would not recognize I believe; 
    // there are also 
    // - ElementEventMap, which I believe you can document.addEventListener(...)
    // - HTMLElementEventMap (extends ElementEventMap), allows you to element.addEventListener();
    interface WindowEventMap {
      [DATE_CHANGE_EVENT_NAME]: DateChangeEvent;
    }
  }