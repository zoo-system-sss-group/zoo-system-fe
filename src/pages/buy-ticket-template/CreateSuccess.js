import { format } from "date-fns";
import { useEffect, useState } from "react";
import { BrowserRouter, Link, Route, Router, Routes } from "react-router-dom";
import LandingPage from "../LandingPage";
import Home from "../../components/landingPage/Home";

function CreateSuccess({ prevStep, values }) {
  const [loading, SetLoading] = useState(true);
  sessionStorage.setItem(`ticket${values.Code}`, JSON.stringify(values));
  useEffect(() => {
    if (values) SetLoading(false);
    else SetLoading(true);
  }, [values]);
  return (
    <section className="card card-compact w-full m-8 md:w-2/3 lg:w-3/5 max-w-[650px] bg-cor3 border-cor6 relative shadow  my-10">
      <div className="card-body ">
        <div className="card-title">Ticket Created</div>
        {loading ? (
          <div className=" loading h-[400px] m-auto"></div>
        ) : (
          <>
            <div className=" flex flex-col px-16">
              <div className="w-full text-center flex flex-col items-center border rounded p-6">
                <img
                  className="w-[75px]"
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${values.Code}`}
                />
                <span className="">
                  <strong>Code:</strong> {values.Code}
                </span>
                <span className="py-6">
                  <strong>CreationDate:</strong>{" "}
                  {new Date(values.CreationDate).toString()}
                </span>
              </div>
              <div className="flex justify-between my-2">
                <div className="w-auto">Customer Name</div>
                <div className="w-auto">{values.CustomerName}</div>
              </div>
              <div className="flex justify-between my-2">
                <div className="w-auto">Phone Number</div>
                <div className="w-auto">{values.PhoneNumber}</div>
              </div>
              <div className="flex justify-between my-2">
                <div className="w-auto">Effective Date</div>
                <div className="w-auto">
                  {format(new Date(values.EffectiveDate), "dd/MM/yyyy")}
                </div>
              </div>
              <div className="flex justify-between my-2">
                <div className="w-auto">Total Money</div>
                <div className="w-auto">{values.TotalMoney?.toLocaleString("en-US", {
                  style: "currency",
                  currency: "VND",
                })}</div>
              </div>
              <div className="flex justify-between my-2">
                <div className="w-auto">Total Ticket</div>
                <div className="w-auto">{values.TotalTicket}</div>
              </div>
              <div className="flex justify-between my-2">
                <div className="w-auto">Status</div>
                <div className="w-auto">{values.Status}</div>
              </div>
              <hr></hr>
              <span className="text-xs my-2 ms-[-20px]">
                Ticket Information Has been Sent to your Email & Phone address
              </span>
            </div>
          </>
        )}
            <Link to="/" className="btn" >Back To Home</Link>
            {/* Add other routes for your application */}
      </div>
    </section>
  );
}

export default CreateSuccess;
