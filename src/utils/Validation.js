/** Thanh Binh Form Validation v1.0
import { getValidationMessage } from './Validation';
 * these function help you use quick validation for form inputs
 * various from text,number,date,checkboxes,and radio
 * config the validation by
 *
 * const validations = {input1:[ValidationEmpty()]}
 *
 * then call the function getValidationMessage()
 * it will solve your problem
 * */

export function Validate(regex, msg) {
  return (value) => {
    if (value === null || value === "") return undefined;
    if (!value.match(regex)) return msg ?? "Regex Validation Fail";
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
    if (min <= value && value <= max) return undefined;
    return msg ?? `This Field value need to be in between ${min} and ${max}!`;
  };
}
export function ValidateDateRange({
  minDate,
  maxDate,
  msg1,
  msg2,
  msgCombine,
}) {
  return (value) => {
    try {
      var dateValue = new Date(value);
    } catch {
      return "Not Valid Date Value!";
    }
    if (minDate && maxDate && msgCombine) {
      if (dateValue < minDate || dateValue > maxDate)
        return (
          msgCombine ??
          `This Field need to have Date larger than ${minDate} and smaller than ${maxDate}`
        );
    }
    if (minDate && dateValue < minDate)
      return msg1 ?? `This Field need to have Date larger than ${minDate}`;
    if (maxDate && dateValue > maxDate)
      return msg2 ?? `This Field need to have Date smaller than ${maxDate}`;
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
//check if checkbox is checked
export function ValidateCheckboxAndRadio(name, msg) {
  return () => {
    var checkboxes = document.querySelectorAll(`input[name=${name}]`);
    for (var i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].checked) return undefined;
    }
    return msg ?? "This Field is not checked!";
  };
}
export function ValidateValueInList(list, msg) {
  return (value) => {
    if (!list.includes(value)) return msg ?? "Value not found in list!";
    else return undefined;
  };
}
/** getValidationMessage(validation, input)
 * validation  is an array of Validation Function
 * input is the name of the input
 * return msg and print the input error if validation is false
 * note: after this you can or cannot submit the form based on your choice
 */
export function getValidationMessage(
  validation,
  inputNode,
  errorSelector,
  container
) {
  if (validation && inputNode) {
    container ??= document;
    for (var i = 0; i < validation.length; i++) {
      const vtion = validation[i];
      var msg = vtion(inputNode.value);
      var errorNode = container
        .querySelector(`.form-control:has([name=${inputNode.name}])`)
        .querySelector(errorSelector ?? ".text-red-600");
      if (msg) {
        errorNode.textContent = msg;
        inputNode.classList.add("border-error");
        inputNode.focus();
        return msg;
      } else {
        errorNode.textContent = "";
        inputNode.classList?.remove("border-error");
      }
    }
  }
}
export function getValidationMessageAdvance({
  validation,
  value,
  container,
  errorNode,
  errorSelector,
  inputNode,
  inputSelector,
}) {
  if (
    validation &&
    container &&
    (errorNode || errorSelector) &&
    (inputNode || inputSelector)
  ) {
    inputSelector ??= `[name=${inputNode.name}]`;
    inputNode ??= container.querySelector(inputSelector);
    errorNode ??= container.querySelector(errorSelector);
    for (var i = 0; i < validation.length; i++) {
      const vtion = validation[i];
      var msg = vtion(value);
      if (msg) {
        errorNode.textContent = msg;
        inputNode.classList.add("border");
        inputNode.classList.add("border-error");
        inputNode.focus();
        return msg;
      } else {
        errorNode.textContent = "";
        inputNode.classList?.remove("border");
        inputNode.classList?.remove("border-error");
      }
    }
  } else {
    throw new Error("please input all field!");
  }
}
export function clearErrorValidation({
  container,
  inputSelector,
  errorSelector,
}) {
  container ??= document;
  inputSelector ??= "[name]";
  errorSelector ??= ".text-red-600";

  const inputNodes = container.querySelectorAll(inputSelector);
  const errorNodes = container.querySelectorAll(errorSelector);

   inputNodes.forEach((inputNode) => {
    inputNode.classList?.remove("border");
    inputNode.classList?.remove("border-error");
  });
  errorNodes.forEach((errorNode) => {
    errorNode.textContent = "";
  });
}
