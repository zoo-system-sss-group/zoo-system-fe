import { useState } from "react";
import Footer from "../components/landingPage/Footer";
import Header from "../components/landingPage/Header";
import TpBank from "../assets/bank.jpg";
import Momo from "../assets/momo.jpg";
import GuestLayout from "../components/layout/GuestLayout";
import TicketSection from "./buyTicketPage/TicketSection";
import CustomerSection from "./buyTicketPage/CustomerSection";
import Confirmation from "./buyTicketPage/Confirmation";
import {
  Validate,
  ValidateCheckboxAndRadio,
  ValidateEmail,
  ValidateEmpty,
  ValidateDateRange,
  ValidateNumber,
  ValidatePhone,
  getValidationMessage,
} from "../utils/Validation";
import { format } from "date-fns";
import axios from "axios";
import CreateSuccess from "./buyTicketPage/CreateSuccess";
import { useEffect } from "react";
import { useRef } from "react";
import Progress from "./buyTicketPage/Progress";
// payment methods
const paymentMethods = [
  {
    name: "Momo",
    value: "Momo",
    display: (
      <>
        <img src={Momo} className="mb-4" alt="TpBank" />
      </>
    ),
  },
  {
    name: "By Card",
    value: "Card",
    display: (
      <>
        <img src={TpBank} className="mb-4" alt="TpBank" />
      </>
    ),
  },
];
const totalStep = 4;
// set default Date
const currentDate = new Date(format(new Date(), "yyyy-MM-dd"));
const minDate = new Date(currentDate);
minDate.setDate(currentDate.getDate() + 1);
const maxDate = new Date(currentDate);
maxDate.setMonth(currentDate.getMonth() + 1);

// main function
function BuyTicket() {
  const [step, setStep] = useState(1);
  const [submitVal, setSubmitValue] = useState(null);
  const [values, setValues] = useState({
    customerName: "",
    email: "",
    phoneNumber: "",
    effectiveDate: format(minDate, "yyyy-MM-dd"),
    adultTicket: 1,
    kidTicket: 0,
  });

  const validations = {
    customerName: [ValidateEmpty()],
    email: [ValidateEmpty(), ValidateEmail()],
    phoneNumber: [ValidateEmpty(), ValidatePhone()],
    effectiveDate: [
      Validate(".+"),
      ValidateDateRange({
        minDate: minDate,
        maxDate: maxDate,
        msg1: "You can only buy tickets for at least 1 day in advance from the current date!",
        msg2: "You can only buy tickets in 1 month prior!",
      }),
    ],
    adultTicket: [
      ValidateNumber(1, 100, "Need at least one Adult to buy Tickets"),
    ],
    paymentMethod: [
      ValidateCheckboxAndRadio("paymentMethod", "Please Select Payment"),
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
    const final_validations = {
      ...validations,
      adultTicket: [
        ValidateNumber(1, 100, "Need at least one Adult to buy Tickets"),
      ],
    };
    Object.keys(final_validations).forEach((key) => {
      if (msg) return;
      const input = document.querySelector(`[name=${key}]`);
      msg = getValidationMessage(validations[key], input);
    });
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
    var validation = validations[input];
    var msg = getValidationMessage(validation, node);
    setValues({ ...values, [input]: value });
  };

  return (
    <div>
      <Header />
      <GuestLayout
        title="Buy ticket"
        className="flex items-center flex-col  pb-16"
      >
        <>
          {step === 1 && (
            <CustomerSection
              step={step}
              totalStep={totalStep}
              nextStep={nextStep}
              handleChange={handleChange}
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
              minDate={minDate}
              maxDate={maxDate}
            />
          )}
          {step === 3 && (
            <Confirmation
              step={step}
              totalStep={totalStep}
              prevStep={prevStep}
              nextStep={nextStep}
              handleChange={handleChange}
              paymentMethods={paymentMethods}
              values={values}
            />
          )}
          {step === 4 && (
            <CreateSuccess
              step={step}
              totalStep={totalStep}
              paymentMethods={paymentMethods}
              values={submitVal}
            />
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
  result = await axios
    .post(
      "/odata/ticketorders?$select=Code,CUstomerName,Email,PhoneNumber,EffectiveDate,PaymentMethod,TotalMoney,TotalTicket,Status,Id,CreationDate",
      data
    )
    .then((response) => response.data)
    .catch((err) => err);
  //   result = {
  //     "@odata.context": "https://localhost:7195/odata/$metadata#TicketOrders(Code,CustomerName,Email,PhoneNumber,EffectiveDate,PaymentMethod,TotalMoney,TotalTicket,Status,Id,CreationDate)/$entity",
  //     "Code": "ecd3210c-4fcb-4bbc-9c54-73f0df8d71f6",
  //     "CustomerName": "Lam Lam",
  //     "Email": "binhnguyenthanh19242yahoo@gmail.com",
  //     "PhoneNumber": "0123456789",
  //     "EffectiveDate": "2023-10-28T00:00:00+07:00",
  //     "PaymentMethod": "Momo",
  //     "TotalMoney": 60000.0,
  //     "TotalTicket": 1,
  //     "Status": "Waiting",
  //     "Id": 17,
  //     "CreationDate": "2023-10-27T14:43:30.44067+07:00"
  // }
  return result;
}
export default BuyTicket;
