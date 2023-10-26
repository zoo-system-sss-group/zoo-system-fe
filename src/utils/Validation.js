export function Validate(regex, msg) {
  return (value) => {
    if (!value.match(regex)) return msg ?? "Regex Validation False";
    else return undefined;
  };
}
export function ValidateEmpty(msg) {
  return (value) => {
    if (value === null || value === "") return msg ?? "This Field is Required!";
    else return undefined;
  };
}
export function ValidateNumber(min, max, msg) {
  return (value) => {
    try {
      value = parseFloat(value);
    } catch {
      return "This Field is not a Number!";
    }
    if (value < min || max < value)
      return msg ?? `This Field value need to be in between ${min} and ${max}!`;
    else return undefined;
  };
}
export function ValidateEmail(msg) {
  return Validate(
    /.+@[\w]+[.][\w]+/,
    msg ?? "This Field need to be an Email Format!"
  );
}
export function ValidatePhone(msg) {
  return Validate(/^[0-9]{9,12}$/, msg ?? "This is not a valid Phone Number!");
}

export function getValidationMessage(validation, input) {
  if (validation && input) {
    for (var i = 0; i < validation.length; i++) {
      const vtion = validation[i];
      var msg = vtion(input.value);
      var errorNode = document
        .querySelector(`.form-control:has(input[name=${input.name}])`)
        .querySelector(".text-red-600");
      if (msg) {
        errorNode.textContent = msg;
        input.classList.add("border-error");
        return msg;
      } else {
        errorNode.textContent = "";
        input.classList.remove("border-error");
      }
    }
  }
}
