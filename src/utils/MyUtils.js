export const displayError = (form, errors) => {
  if (!errors) return;
  Object.keys(errors).forEach((key) => {
    var inputBox = form
      .querySelector(`.form-control:has([name=${key.toLowerCase()}])`)
      var input = inputBox.querySelector('input');
      var leftAltLabel = inputBox.querySelector('span.text-error')
      input.classList.add("input-error");
      leftAltLabel.innerText = errors[key][0];
  });
};
