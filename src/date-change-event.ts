export const DATE_CHANGE_EVENT_NAME = "date-change";

export type DateChangeEvent = CustomEvent<Date>;

export const triggerDateChange = (el: HTMLElement, date: Date) => {
    el.dispatchEvent(new CustomEvent(DATE_CHANGE_EVENT_NAME, {
        detail: date,
        bubbles: true,
    }));
};
