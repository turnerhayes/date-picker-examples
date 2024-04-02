import { onReset } from "./reset";

onReset(() => {
  const picker = document.getElementById("calendar-picker") as HTMLInputElement;

  picker.value = "";
});
