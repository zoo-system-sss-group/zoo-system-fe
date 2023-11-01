import { useState } from "react";
import Footer from "../components/landingPage/Footer";
import Header from "../components/landingPage/Header";
import TpBank from "../assets/TpBank.png";
import GuestLayout from "../components/layout/GuestLayout";
import TicketSection from "./buy-ticket-template/TicketSection";
import CustomerSection from "./buy-ticket-template/CustomerSection";
import Confirmation from "./buy-ticket-template/Confirmation";
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
import CreateSuccess from "./buy-ticket-template/CreateSuccess";
import { ApiImage } from "../components/common/ApiImage";
import { Progress } from "./buy-ticket-template/Progress";
// payment methods
const paymentMethods = [
  {
    name: "Zalo Pay",
    value: "ZaloPay",
    display: (
      <>
        <ApiImage className="w-[200px]" value="ZaloPay" />
        <div className="w-full flex gap-2 justify-center text-cor2 mt-4">
          <strong>Name: </strong>Huynh Van phu
        </div>
        <div className="w-full flex gap-2 justify-center text-cor2">
          <strong>Send Information: </strong>FZOO-123339600
        </div>
      </>
    ),
  },
  {
    name: "Momo",
    value: "Momo",
    display: (
      <>
        <ApiImage
          className="w-[200px]"
          value="2|99|0979553494|Nguyen Thanh Binh||0|0|0||transfer_myqr"
        />
        <div className="w-full flex gap-2 justify-center text-cor2 mt-4">
          <strong>Name: </strong>Nguyen Thanh Binh
        </div>
        <div className="w-full flex gap-2 justify-center text-cor2">
          <strong>Send Information: </strong>FZOO-321339600
        </div>
      </>
    ),
  },
  {
    name: "By Card",
    value: "Card",
    display: (
      <>
        <img src={TpBank} className="mb-4" />
		<div className="w-full flex gap-2 justify-center text-cor2 ">
          <strong>TpBank: </strong>0414 3329 301
        </div>
		<div className="w-full flex gap-2 justify-center text-cor2 ">
          <strong>Name: </strong>Nguyen Thanh Binh
        </div>
        <div className="w-full flex gap-2 justify-center text-cor2">
          <strong>Send Information: </strong>Your Name - FZOO - 993323
        </div>
      </>
    ),
  },
  { name: "By Cash", value: "Cash", display: null },
];
const totalStep = 3;
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
        msg1:
          "You can only buy tickets for at least 1 day in advance from the current date!",
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
          <Progress max={totalStep} value={step - 1} />
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
            <CreateSuccess paymentMethods={paymentMethods} values={submitVal} />
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
  //     "PaymentMethod": "ZaloPay",
  //     "TotalMoney": 60000.0,
  //     "TotalTicket": 1,
  //     "Status": "Waiting",
  //     "Id": 17,
  //     "CreationDate": "2023-10-27T14:43:30.44067+07:00"
  // }
  return result;
}
export default BuyTicket;
