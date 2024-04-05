import { onReset } from "./reset";
import { onInit } from "./on-init";
import { MonthNumber, getDaysInMonth } from "./date-utils";

const MIN_YEAR = new Date().getFullYear() - 110;
const MAX_YEAR = new Date().getFullYear();

const fillDays = (
  dayPicker: HTMLSelectElement,
  monthPicker: HTMLSelectElement,
  yearPicker: HTMLSelectElement
) => {
  dayPicker.innerHTML = "";
  const yearPickerValue = yearPicker.value;
  const monthPickerValue = monthPicker.value;
  const option = document.createElement("option");
  option.value = "";
  option.text = "--Day--";
  dayPicker.appendChild(option);
  let days: number;
  if (yearPickerValue === "" || monthPickerValue === "") {
    days = 31;
  } else {
    days = getDaysInMonth(
      parseInt(monthPickerValue) as MonthNumber,
      parseInt(yearPickerValue)
    );
  }
  for (let i = 1; i <= days; i++) {
    const option = document.createElement("option");
    option.value = i.toString();
    option.text = i.toString();
    dayPicker.appendChild(option);
  }
};

const fillYears = (yearPicker: HTMLSelectElement) => {
  yearPicker.innerHTML = "";
  const option = document.createElement("option");
  option.value = "";
  option.text = "--Year--";
  yearPicker.appendChild(option);
  for (let i = MAX_YEAR; i >= MIN_YEAR; i--) {
    const option = document.createElement("option");
    option.value = i.toString();
    option.text = i.toString();
    yearPicker.appendChild(option);
  }
};

const setupDropdownPicker = (dropdownContainer: HTMLElement) => {
  const dayPicker =
    dropdownContainer.querySelector<HTMLSelectElement>("[name='day']")!;
  const monthPicker =
    dropdownContainer.querySelector<HTMLSelectElement>("[name='month']")!;
  const yearPicker =
    dropdownContainer.querySelector<HTMLSelectElement>("[name='year']")!;
  const hiddenInput = dropdownContainer.querySelector<HTMLInputElement>(
    "[name='dropdown-date']"
  )!;

  onReset(() => {
    yearPicker.value = "";
    monthPicker.value = "";
    dayPicker.value = "";

    fillDays(dayPicker, monthPicker, yearPicker);
  });

  fillDays(dayPicker, monthPicker, yearPicker);
  fillYears(yearPicker);

  [dayPicker, monthPicker, yearPicker].forEach((element) => {
    element.addEventListener("change", () => {
      hiddenInput.value = `${yearPicker.value}-${monthPicker.value}-${dayPicker.value}`;
    });
  });

  [monthPicker, yearPicker].forEach((element) => {
    element.addEventListener("change", () => {
      fillDays(dayPicker, monthPicker, yearPicker);
    });
  });
};

onInit(() => {
  const dropdownContainer = document.getElementById("dropdown")!;
  
  setupDropdownPicker(dropdownContainer);
});
