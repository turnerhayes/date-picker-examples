import { MonthName, MonthNumber, getDaysInMonth } from "./date-utils";
import { onInit } from "./on-init";


const getCalendarEl = () => {
    const template = document.getElementById("calendar-popup") as HTMLTemplateElement;

    const cal = template.content.cloneNode(true);

    return (cal.getRootNode() as HTMLElement).firstElementChild as HTMLDialogElement;
};

const getDayEl = (day: number) => {
    const template = document.getElementById("calendar-day") as HTMLTemplateElement;
    const el = (
        template.content.cloneNode(true).getRootNode() as HTMLElement
    ).firstElementChild as HTMLElement;
    el.textContent = day + "";
    return el;
};

const positionCal = (popup: HTMLElement, input: HTMLInputElement) => {
    const rect = input.getBoundingClientRect();
    popup.style.top = `${rect.bottom}px`;
    popup.style.left = `${rect.left}px`;
};

let cal: HTMLDialogElement|null = null;

const updateData = (date: Date, input: HTMLInputElement) => {
    input.setAttribute("data-date", date.getTime() + "");
};

const hideCalendar = () => {
    cal?.close();
};

const selectDay = (date: Date, input: HTMLInputElement) => {
    updateData(date, input);
    input.value = Intl.DateTimeFormat().format(date);
    hideCalendar();
};

const updateCal = (date: Date, input: HTMLInputElement) => {
    updateData(date, input);
    const monthNameEl = cal?.getElementsByClassName("month-name")[0] as HTMLElement;
    monthNameEl.textContent = MonthName[date.getMonth() + 1];
    const yearEl = cal?.getElementsByClassName("year")[0] as HTMLElement;
    yearEl.textContent = "" + date.getFullYear();
    const numDays = getDaysInMonth(date.getMonth() + 1 as MonthNumber, date.getFullYear());
    const daysEl = cal?.querySelector(".days")!;
    daysEl.innerHTML = "";

    const d = new Date(date.getTime());
    d.setDate(1);

    const prevMonthDays: HTMLElement[] = [];

    while(d.getDay() > 0) {
        d.setDate(d.getDate() - 1);
        const el = getDayEl(d.getDate());
        prevMonthDays.unshift(el);
    }

    for (const el of prevMonthDays) {
        daysEl.appendChild(el);
    }

    for (let i = 1; i <= numDays; i++) {
        const el = getDayEl(i);
        const d = new Date(date);
        d.setDate(i);
        if (date.getDate() === i) {
            el.classList.add("current");
        }
        el.addEventListener("click", () => {
            selectDay(d, input);
            for (const el of Array.from(daysEl.getElementsByClassName("current"))) {
                el.classList.remove("current");
            }
            el.classList.add("current");
        });
        daysEl.appendChild(el);
    }
};

const getDate = (input: HTMLInputElement) => {
    const timestamp = Number(input.getAttribute("data-date"));
    return new Date(timestamp);
};

const showCalendar = (input: HTMLInputElement) => {
    const date = getDate(input);
    updateCal(date, input);
    const content = cal!.getElementsByClassName("dialog-content")[0] as HTMLElement;
    
    content.addEventListener("click", (event) => {
        event.stopPropagation();
    });
    cal!.getElementsByClassName("prev-month")[0].addEventListener("click", () => {
        const date = getDate(input);
        date.setMonth(date.getMonth() - 1);
        updateCal(date, input);
    });
    cal!.getElementsByClassName("next-month")[0].addEventListener("click", () => {
        const date = getDate(input);
        date.setMonth(date.getMonth() + 1);
        updateCal(date, input);
    });
    cal?.showModal();
    positionCal(cal!, input);
};

const handleInputFocus = (input: HTMLInputElement) => {
    if (cal !== null) {
        return;
    }
    cal = getCalendarEl();
    if (!input.hasAttribute("data-date")) {
        updateData(new Date(), input);
    }
    cal.addEventListener("close", () => {
        cal!.remove();
        cal = null;
    });
    cal.addEventListener("click", () => {
        console.log("click on backdrop");
        cal!.close();
    });
    document.body.appendChild(cal);
    showCalendar(input);
};

onInit(() => {
    const input = document.getElementById("custom-calendar-picker") as HTMLInputElement;

    input.addEventListener("focus", () => {
        handleInputFocus(input);
    });
    input.addEventListener("click", () => {
        handleInputFocus(input);
    });
});