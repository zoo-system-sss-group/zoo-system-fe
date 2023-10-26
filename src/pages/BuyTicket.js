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
  ValidateNumber,
  ValidatePhone,
  getValidationMessage,
} from "../utils/Validation";
import { format } from "date-fns";
const paymentMethods = [
  { name: "Zalo Pay", value: "ZaloPay" },
  { name: "Momo", value: "Momo" },
  { name: "By Card", value: "Card" },
  { name: "By Cash", value: "Cash" },
];
const totalStep = 3;
function BuyTicket() {
  const [step, setStep] = useState(1);
  const [values, setValues] = useState({
    customerName: "Lam Lam",
    email: "v.trclam@gmail.com",
    phoneNumber: "0123456789",
    effectiveDate: format(new Date(), "yyyy-MM-dd"),
    paymentMethod: "ZaloPay",
    adultTicket: 1,
    kidTicket: 0,
  });
  const validations = {
    customerName: [ValidateEmpty()],
    email: [ValidateEmpty(), ValidateEmail()],
    phoneNumber: [ValidateEmpty(), ValidatePhone()],
    effectiveDate: [Validate(".+")],
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
      // submitForm(values);
      return setStep(totalStep);
    }
    setStep(step + 1);
  };

  // Handle fields change
  const handleChange = (input, node, value) => (e) => {
    node ??= e?.target;
    value ??= e?.target?.value;
    console.log(node);
    var validation = validations[input];
    var msg = getValidationMessage(validation, node);
    setValues({ ...values, [input]: value });
  };
  return (
    <div>
      <Header />
      <GuestLayout title="Buy ticket" className="flex justify-center  ">
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
      </GuestLayout>
      <Footer />
    </div>
  );
}

export default BuyTicket;
