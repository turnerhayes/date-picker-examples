import { DATE_CHANGE_EVENT_NAME, DateChangeEvent } from "./date-change-event";
import { onInit } from "./oninit";
import { triggerReset } from "./reset";

const getDateString = (date: Date): string => {
    const year = date.getUTCFullYear();
    let month: string|number = date.getUTCMonth() + 1;
    let day: string|number = date.getUTCDate();

    if (month < 10) {
        month = "0" + month;
    }
    if (day < 10) {
        day = "0" + day;
    }

    return `${year}-${month}-${day}`;
};

const getTargetDateContainer = () => {
    return document.getElementById("target-date") as HTMLTimeElement;
};

const getTargetDate = (): Date => {
    const queryString = new URLSearchParams(document.location.search);
    const dateString = queryString.get("target");

    if (!dateString) {
        return new Date();
    }

    return new Date(dateString);
};

const targetDate = getTargetDate();

export const checkDate = (date: Date): boolean => {
    return date.getUTCFullYear() === targetDate.getUTCFullYear() &&
        date.getUTCMonth() === targetDate.getUTCMonth() &&
        date.getUTCDate() === targetDate.getUTCDate();
};

window.addEventListener("hashchange", () => {
    triggerReset();
});

onInit(() => {
    const targetDateContainer = getTargetDateContainer();

    targetDateContainer.dateTime = getDateString(targetDate);

    targetDateContainer.textContent = new Intl.DateTimeFormat(void 0, {
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "UTC",
    }).format(targetDate);

    window.addEventListener(DATE_CHANGE_EVENT_NAME, (event: DateChangeEvent) => {
        const date = event.detail;
        getTargetDateContainer().classList.toggle(
            "text-green-500",
            checkDate(date)
        );
    });
});