import { useState } from "react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import moment from "moment";
import NewsRepository from "../../../repositories/NewsRepository";
import DOMPurify from "dompurify";

const INITIAL_ACCOUNT_OBJ = {
  id: "",
  title: "",
  content: "",
  creationdate: "",
  modificationdate: "",
};
function ViewNews({ id }) {
  const [loading, setLoading] = useState(true);
  const _repo = NewsRepository();
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");
  const [newsObj, setNewsObj] = useState(INITIAL_ACCOUNT_OBJ);

  useEffect(() => {
    // axios.get(`odata/newss/${id}`).then((res) => {
    // 	setNewsObj({
    // 		...newsObj,
    // 		...res.data,
    // 	});
    // });
    _repo
      .getNewsById(id)
      .then((res) => {
        setNewsObj({
          ...newsObj,
          ...res,
        });
      })
      .catch((err) => {
        setErrorMessage(err);
      });
  }, [id]);

  return (
    <>
      <dialog id="btnViewNews" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <h3 className="font-bold text-lg">News information details</h3>
          <div className="form-control w-full ">
            <div className="flex gap-2">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">ID</span>
                </label>
                <input
                  value={newsObj.id}
                  className="input input-bordered w-full "
                  disabled
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  value={newsObj.title}
                  className="input input-bordered w-full "
                  disabled
                />
              </div>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Thumbnail</span>
              </label>
              <img
                src={newsObj.thumbnail ?? "../img/noimage.jpg"}
                className="image w-2/3  max-w-[500px]  aspect-auto shadow my-2 m-auto block"
              />
            </div>
            <div className="form-control">
              <label className="label mt-4">
                <span className="label-text">Content</span>
              </label>
              <div
                id="news-content"
                type="text"
                className="textarea !bg-inherit overflow-y-scroll !resize-y textarea-bordered min-h-[15rem] h-32"
                disabled
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(newsObj.content),
                }}
              ></div>
            </div>

            <div className="flex gap-2">
              <div>
                <label className="label mt-4">
                  <span className="label-text">Creation Date</span>
                </label>
                <input
                  type="text"
                  value={moment(newsObj.creationdate).format(
                    "YYYY-mm-DD hh:mm:ss"
                  )}
                  className="input input-bordered w-full"
                  disabled
                />
              </div>
              <div>
                <label className="label mt-4">
                  <span className="label-text">Modification Date</span>
                </label>
                <input
                  type="text"
                  value={
                    newsObj.modificationdate
                      ? moment(newsObj.modificationdate).format(
                          "YYYY-mm-DD hh:mm:ss"
                        )
                      : ""
                  }
                  className="input input-bordered w-full"
                  disabled
                />
              </div>
            </div>

            <div className="text-err text-lg">{errorMessage}</div>
          </div>
          <div className="modal-action">
            <form method="dialog">
              <button id="btnCloseViewNews" className="btn">
                Close
              </button>
            </form>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}

export default ViewNews;
