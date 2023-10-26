import axios from "axios";
import { useEffect, useState } from "react";
import { Progress } from "./Progress";

function Confirmation({
  step,
  totalStep,
  prevStep,
  nextStep,
  handleChange,
  values,
  paymentMethods,
}) {
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    setLoading(true);
    axios
      .post("/api/ticketorders/total", {
        tickets: [
          {
            ticketType: "AdultTicket",
            quantity: values?.adultTicket ?? 0,
          },
          {
            ticketType: "ChildrenTicket",
            quantity: values?.kidTicket ?? 0,
          },
        ],
      })
      .then((resp) => {
        setTotal(resp.data.total);
      })
      .catch((e) => {});
    setLoading(false);
  }, []);
  return (
    <section className="card card-compact w-full m-8 md:w-2/3 lg:w-3/5 max-w-[650px] bg-cor3 border-cor6 relative shadow  my-10">
      <div className="card-body ">
        <div className="card-title">Confirm Data</div>
        <Progress max={totalStep} value={step} />

        <div className="">
          <table className="table table-zebra ">
            <tr className="">
              <th className="text-lg">Customer Name</th>
              <td className="text-lg text-end">{values.customerName}</td>
            </tr>
            <tr className="">
              <th className="text-lg">Phone Number </th>
              <td className="text-lg text-end">{values.phoneNumber}</td>
            </tr>
            <tr className="">
              <th className="text-lg">Email</th>
              <td className="text-lg text-end">{values.email}</td>
            </tr>
            <tr className="">
              <th className="text-lg">Use Date</th>
              <td className="text-lg text-end">{values.effectiveDate}</td>
            </tr>
            <tr className="">
              <th className="text-lg">Adult Tickets</th>
              <td className="text-lg text-end">{values.adultTicket}</td>
            </tr>
            <tr className="border-b">
              <th className="text-lg ">Kid Tickets</th>
              <td className="text-lg text-end">{values.kidTicket}</td>
            </tr>

            <tr className="border-b">
              <th className="text-lg ">Total Price</th>
              <td className="text-lg text-end">
                {loading && <div className="loading mx-6"></div>}
                {total?.toLocaleString("en-US", {
                  style: "currency",
                  currency: "VND",
                })}
              </td>
            </tr>
          </table>
        </div>
        <div className="w-auto flex justify-between">
          <button
            className="btn"
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              prevStep();
            }}
          >
            {"<"}
          </button>
          <button
            className="btn ms-auto"
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              nextStep();
            }}
          >
            {"Create Ticket"}
          </button>
        </div>
      </div>
    </section>
  );
}

export default Confirmation;
