export const displayError = (form, errors) => {
  if (!errors) return;

  Object.keys(errors).forEach((key) => {
    const inputBox = form.querySelector(
      `.form-control:has([name=${key.toLowerCase()}])`
    );
    const input = inputBox.querySelector("input");
    const leftAltLabel = inputBox.querySelector("span.text-error");

    input.classList.add("input-error");
    leftAltLabel.classList.remove("hidden");
    leftAltLabel.innerText = errors[key][0];
  });
};
export const clearError = (form) => {
  const errorInputs = form.querySelectorAll(".input-error");
  errorInputs.forEach((input) => {
    input.classList.remove("input-error");
  });

  const errorLabels = form.querySelectorAll("span.text-error");
  errorLabels.forEach((label) => {
    label.classList.add("hidden");
  });
};
