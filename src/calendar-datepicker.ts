import { triggerDateChange } from "./date-change-event";
import { onInit } from "./oninit";
import { onReset } from "./reset";

onReset(() => {
  const picker = document.getElementById("calendar-picker") as HTMLInputElement;

  picker.value = "";
});

const onPickerValueChange = (picker: HTMLInputElement) => {
  const value = picker.value;
  const date = new Date(value);

  triggerDateChange(picker, date);
};

function observeValue(element: HTMLInputElement) {
    let elementPrototype = Object.getPrototypeOf(element);
    let descriptor = Object.getOwnPropertyDescriptor(elementPrototype, "value")!;
    const {get, set} = descriptor;
    if (!get || !set) {
      throw new Error("Cannot listen to value change; no getter or setter on value descriptor");
    }
    Object.defineProperty(element, "value", {
        get: function() {
            return get.call(this);
        },
        set: function (val: unknown) {
            set.call(this, val);
            setTimeout(() => {
              onPickerValueChange(element);
            }, 0);
        }
    });
}

onInit(() => {
  const picker = document.getElementById("calendar-picker") as HTMLInputElement;

  observeValue(picker);

  picker.addEventListener("change", () => {
    onPickerValueChange(picker);
  });
});
