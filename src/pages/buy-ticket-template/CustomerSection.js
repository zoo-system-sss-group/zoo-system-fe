import { Progress } from "./Progress";

function CustomerSection({
  step,
  totalStep,
  nextStep,
  handleChange,
  values,
  paymentMethods,
}) {
  return (
    <form className="card card-compact w-full m-8 md:w-2/3 lg:w-3/5 max-w-[650px] bg-cor3 border-cor6  shadow  my-10 relative">
      <div className="card-body ">
        <div className="card-title">Your Information</div>
        <Progress max={totalStep} value={step} />

        <div className="flex justify-between gap-6">
          <div className="form-control w-1/2">
            <label className="label">
              <span className="label-text">Customer Name</span>
            </label>
            <input
              className="input "
              onChange={handleChange("customerName")}
              name="customerName"
              value={values.customerName}
            />
            <label className="label">
              <span className="label-text-alt text-red-600"></span>
            </label>
          </div>
          <div className="form-control inline-flex w-1/2">
            <label className="label">
              <span className="label-text">Phone Number</span>
            </label>
            <input
              className="input"
              onChange={handleChange("phoneNumber")}
              name="phoneNumber"
              value={values.phoneNumber}
            />
            <label className="label">
              <span className="label-text-alt text-red-600"></span>
            </label>
          </div>
        </div>
        <div className="form-control inline-flex w-1/2">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            className="input"
            onChange={handleChange("email")}
            placeholder="Enter Your Email (optional)"
            value={values.email}
            name="email"
          />
          <label className="label">
            <span className="label-text-alt text-red-600"></span>
          </label>
        </div>
        <div className="form-control inline-flex w-1/2">
          <label className="label">
            <span className="label-text">Payment Method</span>
          </label>
          <div className="flex flex-col gap-5">
            {paymentMethods.map((payment, index) => (
              <div className="border rounded-md py-2 px-6 flex items-center gap-5" >
                <input
                  className="radio"
                  type="radio"
                  name="paymentMethod"
                  checked={(payment.value === values.paymentMethod)}
                  onChange={handleChange("paymentMethod")}
                  id={`pay-${[payment.value]}`}
                  value={payment.value}
                />
                <label for={`pay-${[payment.value]}`}>{payment.name}</label>
              </div>
            ))}
          </div>
          <label className="label">
            <span className="label-text-alt text-red-600"></span>
          </label>
        </div>
        <div className="w-auto flex justify-between">
          <button
            className="btn ms-auto"
            type="submit"
            onClick={(e) => {
              e.preventDefault();
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

export default CustomerSection;
