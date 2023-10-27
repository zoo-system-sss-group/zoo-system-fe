import { useState } from "react";
import Footer from "../components/landingPage/Footer";
import Header from "../components/landingPage/Header";
import GuestLayout from "../components/layout/GuestLayout";
import TicketSection from "./buy-ticket-template/TicketSection";
import CustomerSection from "./buy-ticket-template/CustomerSection";
import Confirmation from "./buy-ticket-template/Confirmation";
import {
  Validate,
  ValidateEmail,
  ValidateEmpty,
  ValidateMinDate,
  ValidateNumber,
  ValidatePhone,
  getValidationMessage,
} from "../utils/Validation";
import { format } from "date-fns";
import axios from "axios";
import CreateSuccess from "./buy-ticket-template/CreateSuccess";
const paymentMethods = [
  { name: "Zalo Pay", value: "ZaloPay" },
  { name: "Momo", value: "Momo" },
  { name: "By Card", value: "Card" },
  { name: "By Cash", value: "Cash" },
];
const totalStep = 3;
const currentDate = new Date(format(new Date(), "yyyy-MM-dd"));
const nextDate = new Date(currentDate);
nextDate.setDate(currentDate.getDate() + 1);
console.log(nextDate.toISOString());
function BuyTicket() {
  const [step, setStep] = useState(1);
  const [submitVal, setSubmitValue] = useState(null);
  const [values, setValues] = useState({
    customerName: "Lam Lam",
    email: "binhnguyenthanh19242yahoo@gmail.com",
    phoneNumber: "0123456789",
    effectiveDate: format(nextDate, "yyyy-MM-dd"),
    paymentMethod: "ZaloPay",
    adultTicket: 1,
    kidTicket: 0,
  });
  const validations = {
    customerName: [ValidateEmpty()],
    email: [ValidateEmail()],
    phoneNumber: [ValidateEmpty(), ValidatePhone()],
    effectiveDate: [
      Validate(".+"),
      ValidateMinDate(
        nextDate,
        "You can only buy tickets for at least 1 day in advance from the current date"
      ),
    ],
    adultTicket: [
      ValidateNumber(1, 100, "Need at least one Adult to buy Tickets"),
    ],
  };
  // go back to previous step
  const prevStep = () => {
    if (step <= 1) return setStep(1);
    setStep(step - 1);
  };

  // proceed to the next step
  const nextStep = () => {
    var msg = null;
    Object.keys(validations).forEach((key) => {
      if (msg) return;
      const input = document.querySelector(`[name=${key}]`);
      msg = getValidationMessage(validations[key], input);
    });
    console.log(msg);
    if (msg) return;
    if (step >= totalStep) {
      submitForm(values)
        .then((resp) => {
          setStep(totalStep + 1);
          setSubmitValue(resp);
        })
        .catch((e) => setStep(totalStep));
    }
    setStep(step + 1);
  };

  // Handle fields change
  const handleChange = (input, node, value) => (e) => {
    node ??= e?.target;
    value ??= e?.target?.value;
    console.log(input + " " + value);
    var validation = validations[input];
    var msg = getValidationMessage(validation, node);
    setValues({ ...values, [input]: value });
  };
  return (
    <div>
      <Header />
      <GuestLayout title="Buy ticket" className="flex justify-center  ">
        <>
          {step === 1 && (
            <CustomerSection
              step={step}
              totalStep={totalStep}
              nextStep={nextStep}
              handleChange={handleChange}
              paymentMethods={paymentMethods}
              values={values}
            />
          )}
          {step === 2 && (
            <TicketSection
              step={step}
              totalStep={totalStep}
              prevStep={prevStep}
              nextStep={nextStep}
              handleChange={handleChange}
              values={values}
            />
          )}
          {step === 3 && (
            <Confirmation
              step={step}
              totalStep={totalStep}
              prevStep={prevStep}
              nextStep={nextStep}
              handleChange={handleChange}
              values={values}
            />
          )}
          {step === 4 && (
            <CreateSuccess prevStep={prevStep} values={submitVal} />
          )}
        </>
      </GuestLayout>
      <Footer />
    </div>
  );
}
async function submitForm(values) {
  const data = {
    ...values,
    tickets: [
      {
        ticketType: "AdultTicket",
        quantity: values.adultTicket,
      },
      {
        ticketType: "ChildrenTicket",
        quantity: values.kidTicket,
      },
    ],
  };

  var result = undefined;
  // result = await axios
  //   .post("/odata/ticketorders?$select=Code,CUstomerName,Email,PhoneNumber,EffectiveDate,PaymentMethod,TotalMoney,TotalTicket,Status,Id,CreationDate", data)
  //   .then((response) => response.data)
  //   .catch((err) => err);
  result = {
    "@odata.context": "https://localhost:7195/odata/$metadata#TicketOrders(Code,CustomerName,Email,PhoneNumber,EffectiveDate,PaymentMethod,TotalMoney,TotalTicket,Status,Id,CreationDate)/$entity",
    "Code": "ecd3210c-4fcb-4bbc-9c54-73f0df8d71f6",
    "CustomerName": "Lam Lam",
    "Email": "binhnguyenthanh19242yahoo@gmail.com",
    "PhoneNumber": "0123456789",
    "EffectiveDate": "2023-10-28T00:00:00+07:00",
    "PaymentMethod": "ZaloPay",
    "TotalMoney": 60000.0,
    "TotalTicket": 1,
    "Status": "Waiting",
    "Id": 17,
    "CreationDate": "2023-10-27T14:43:30.44067+07:00"
}
  return result;
}
export default BuyTicket;
