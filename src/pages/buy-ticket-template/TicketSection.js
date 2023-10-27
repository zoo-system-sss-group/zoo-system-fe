import axios from "axios";
import { useEffect, useState } from "react";
import { Progress } from "./Progress";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
function TicketSection({
  step,
  totalStep,
  prevStep,
  nextStep,
  handleChange,
  values,
}) {
  const [total, setTotal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState(new Date(values.effectiveDate));
  useEffect(() => {
    console.log(values.effectiveDate);
    handleChange("effectiveDate", undefined, format(date, "yyyy-MM-dd"))();
  }, [date]);
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
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
      });
  }, [values]);
  const handleSub = (input) => (e) => {
    e.preventDefault();
    values[input] = parseInt(values[input]);
    if (values[input] < 1) {
      values[input] = 0;
      return;
    }
    var node = e.target.nextSibling;
    handleChange([input], node, values[input] - 1)();
  };
  const handleAdd = (input) => (e) => {
    e.preventDefault();
    values[input] = parseInt(values[input]);
    if (values[input] > 99) {
      values[input] = 100;
      return;
    }
    var node = e.target.previousSibling;
    handleChange([input], node, values[input] + 1)(e);
  };
  useEffect(() => {}, [values]);

  const handleNumberChange = (input) => (e) => {
    var value;
    try {
      value = parseInt(e.target.value);
      if (value < 0) value = 0;
    } catch {
      value = 0;
    }
    return handleChange(input)(e);
  };
  const ALLOWED_KEYCODES = [8, 37, 38, 39, 40];
  const handleInput = (e) => {
    console.log(e.key + "|" + e.keyCode);
    if (ALLOWED_KEYCODES.includes(e.keyCode) || ("0" <= e.key && e.key <= "9"))
      return;
    e.preventDefault();
  };

  return (
    <form
      className="card card-compact w-full  m-8 md:w-2/3 lg:w-3/5 max-w-[650px] bg-cor3 border-cor6  shadow relative  my-10"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="card-body ">
        <div className="card-title">Buy Ticket</div>
        {/* Ticket Type */}
        <Progress max={totalStep} value={step} />

        <div className="form-control  flex flex-row flex-wrap justify-between items-center ">
          <label className="label ">
            <span className="label-text text-lg">Adult Tickets</span>
          </label>
          <div className="input-group w-min">
            <span className="btn  font-mono" onClick={handleSub("adultTicket")}>
              -
            </span>
            <input
              className="input w-[60px] text-center"
              type="number"
              onKeyDown={handleInput}
              onChange={handleNumberChange("adultTicket")}
              value={values.adultTicket}
              name="adultTicket"
              min={0}
              max={100}
            />
            <span className="btn  font-mono" onClick={handleAdd("adultTicket")}>
              +
            </span>
          </div>
          <p className="label-text-alt text-red-600 w-[100%]"></p>
        </div>
        <div className="form-control flex flex-row flex-wrap justify-between">
          <label className="label ">
            <span className="label-text text-lg">Kid Tickets</span>
          </label>
          <div className="input-group w-min">
            <span className="btn  font-mono" onClick={handleSub("kidTicket")}>
              -
            </span>
            <input
              className="input w-[60px] text-center"
              type="number"
              onKeyDown={handleInput}
              onInput={handleNumberChange("kidTicket")}
              value={values.kidTicket}
              name="kidTicket"
              min={0}
              max={100}
            />
            <span className="btn  font-mono" onClick={handleAdd("kidTicket")}>
              +
            </span>
          </div>
          <p className="label-text-alt text-red-600 w-[100%]"></p>
        </div>
        <div className="form-control flex flex-row flex-wrap  justify-between">
          <label className="label ">
            <span className="label-text text-lg">Date</span>
          </label>
          <ReactDatePicker
            className="input"
            wrapperClassName="ms-auto"
            dateFormat={"yyyy-MM-dd"}
            minDate={new Date().setDate(new Date().getDate() + 1)}
            name="effectiveDate"
            selected={date}
            onChange={(date) => setDate(date)}
          />
          <label className="label w-full">
            <p className="label-text-alt text-red-600 w-[100%]"></p>
          </label>
        </div>
        <div className="ms-auto text-xl">
          {loading && <div className="loading mx-6"></div>}
          {total?.toLocaleString("en-US", {
            style: "currency",
            currency: "VND",
          })}
        </div>
        <span className="label-text-alt text-red-600"></span>
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
            className="btn"
            type="submit"
            onClick={(e) => {
              nextStep();
            }}
          >
            {">"}
          </button>
        </div>
      </div>
    </form>
  );
}

export default TicketSection;
