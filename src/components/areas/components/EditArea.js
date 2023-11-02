import { useState } from "react";
import { useDispatch } from "react-redux";
import { showNotification } from "../../common/headerSlice";
import axios from "axios";
import { useEffect } from "react";

const INITIAL_AREA_OBJ = {
  Id: "",
  Code: "",
  Name: "",
  Location: "",
  Description: "",
  Capacity: 0,
};

function EditArea({ id, fetch }) {
  // const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");
  const [areaObj, setAreaObj] = useState(INITIAL_AREA_OBJ);

  useEffect(() => {
    axios.get(`odata/areas/${id}`).then((res) => {
      setAreaObj({
        ...areaObj,
        ...res.data,
      });
    });
  }, [id]);

  const saveNewArea = () => {
    if (areaObj.Code.trim() === "") return setErrorMessage("Code is required!");
    if (areaObj.Name.trim() === "") return setErrorMessage("Name is required!");
    if (areaObj.Location.trim() === "")
      return setErrorMessage("Location is required!");
    if (areaObj.Description.trim() === "")
      return setErrorMessage("Description is required!");
    if (areaObj.Capacity <= 0)
      return setErrorMessage("Capacity must greater than 0!");

    let newAreaObj = {
      Code: areaObj.Code,
      Name: areaObj.Name,
      Location: areaObj.Location,
      Description: areaObj.Description,
      Capacity: areaObj.Capacity,
    };
    const data = JSON.stringify(newAreaObj);
    axios
      .put(`odata/areas/${areaObj.Id}`, data)
      .then((res) => {
        document.getElementById("btnCloseEditArea").click();
        dispatch(
          showNotification({
            message: "Edit area successfully",
            status: res.status,
          })
        );
        fetch();
      })
      .catch((err) => {
        return setErrorMessage(err.response.data.value);
      });
  };

  const updateFormValue = (updateType, value) => {
    setErrorMessage("");
    setAreaObj({ ...areaObj, [updateType]: value });
  };

  return (
    <>
      <dialog id="btnEditArea" className="modal ">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Edit area</h3>
          <div className="form-control w-full mt-4">
            <label className="label">
              <span className="label-text">Code</span>
            </label>
            <input
              type="text"
              placeholder=""
              value={areaObj.Code}
              onChange={(e) => updateFormValue("Code", e.target.value)}
              className="input input-bordered w-full "
            />

            <label className="label mt-4">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              placeholder=""
              value={areaObj.Name}
              onChange={(e) => updateFormValue("Name", e.target.value)}
              className="input input-bordered w-full"
            />

            <label className="label mt-4">
              <span className="label-text">Location</span>
            </label>
            <input
              type="text"
              placeholder=""
              value={areaObj.Location ? areaObj.Location : ""}
              onChange={(e) => updateFormValue("Fullname", e.target.value)}
              className="input input-bordered w-full"
            />

            <label className="label mt-4">
              <span className="label-text">Description</span>
            </label>
            <textarea
              type="text"
              placeholder=""
              value={areaObj.Description ? areaObj.Description : ""}
              onChange={(e) => updateFormValue("Description", e.target.value)}
              className="textarea textarea-bordered h-24"
            />
            <label className="label mt-4">
              <span className="label-text">Capacity</span>
            </label>
            <input
              type="number"
              placeholder=""
              min="1"
              value={areaObj.Capacity}
              onChange={(e) => updateFormValue("Capacity", e.target.value)}
              className="input input-bordered w-full"
            />
            <div className="text-err text-lg">{errorMessage}</div>
          </div>
          <div className="modal-action">
            <form method="dialog">
              <button id="btnCloseEditArea" className="btn">
                Close
              </button>
            </form>

            <button
              className="btn btn-primary ml-4"
              onClick={(e) => saveNewArea()}
            >
              Save
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}

export default EditArea;
