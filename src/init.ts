import { DATE_CHANGE_EVENT_NAME, DateChangeEvent } from "./date-change-event";
import { onInit } from "./oninit";
import { triggerReset } from "./reset";

const getDateString = (date: Date): string => {
    const year = date.getFullYear();
    let month: string|number = date.getMonth() + 1;
    let day: string|number = date.getDate();

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

const targetDate = new Date();

export const checkDate = (date: Date): boolean => {
    return date.getFullYear() === targetDate.getFullYear() &&
        date.getMonth() === targetDate.getMonth() &&
        date.getDate() === targetDate.getDate();
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
    }).format(targetDate);

    window.addEventListener(DATE_CHANGE_EVENT_NAME, (event: DateChangeEvent) => {
        const date = event.detail;
        getTargetDateContainer().classList.toggle(
            "text-green-500",
            checkDate(date)
        );
    });
});