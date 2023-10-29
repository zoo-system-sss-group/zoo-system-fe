/** Thanh Binh Form Validation v1.0
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
    if (value < min || max < value)
      return msg ?? `This Field value need to be in between ${min} and ${max}!`;
    else return undefined;
  };
}
export function ValidateMinDate(minDate, msg) {
  return (value) => {
    try {
      var dateValue = new Date(value);
    } catch {
      return "Not Valid Date Value!";
    }
    if (dateValue < minDate)
      return msg ?? `This Field need to have Date larger than ${minDate}`;
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
