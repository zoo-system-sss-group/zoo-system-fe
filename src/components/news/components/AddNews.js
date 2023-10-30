import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { showNotification } from "../../common/headerSlice";
import { Editor } from "@tinymce/tinymce-react";
import NewsRepository from "../../../repositories/NewsRepository";
import { FirebaseImageUpload } from "../../../FirebaseImageUpload/FirebaseImageUpload";
// import { addNewNews } from "../newsSlice"

const INITIAL_NEWS_OBJ = {
  title: "",
  thumbnail: "",
  content: "",
  creationDate: "",
  modificationDate: "",
};

function AddNews({ fetch }) {
  const dispatch = useDispatch();
  const _repo = NewsRepository();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [newsObj, setNewsObj] = useState(INITIAL_NEWS_OBJ);
  const editorRef = useRef(null);
  const [text, setText] = useState("");
  const [img, setImg] = useState();

  const saveNewNews = async () => {
    setLoading(true);
    newsObj.content = text;
    if (img !== null) {
      try {
        const url = await FirebaseImageUpload({
          folder: "news_thumbnail",
          img: img,
        });
        newsObj.thumbnail = url;
      } catch (err) {
        var msg = err?.response?.data?.value;
        if (msg === undefined) msg = "Something go wrong!";
        setErrorMessage(msg);
      }
    }
    let { creationDate, modificationDate, ...newNewsObj } = newsObj;
    _repo
      .createNews(newNewsObj)
      .then((res) => {
        document.getElementById("btnCloseAddNews").click();
        dispatch(
          showNotification({
            message: res,
            status: 200,
          })
        );
        fetch();
      })
      .catch((err) => {
        return setErrorMessage(err.message);
      });
  };

  const updateFormValue = (updateType, value) => {
    setErrorMessage("");
    setNewsObj({ ...newsObj, [updateType]: value });
  };
  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImg(e.target.files[0]);
    }
  };
  return (
    <>
      <div className="inline-block float-right">
        <button
          className="btn px-6 btn-sm normal-case btn-primary"
          onClick={() => document.getElementById("btnAddNews").showModal()}
        >
          Add New
        </button>
        <dialog id="btnAddNews" className="modal ">
          <div className="modal-box">
            <h3 className="font-bold text-2xl">Create news</h3>
            <div className="form-control w-full ">
              <label className="label mt-4">
                <span className="label-text">Title</span>
              </label>
              <input
                type="text"
                placeholder=""
                value={newsObj.title}
                onChange={(e) => updateFormValue("title", e.target.value)}
                className="input input-bordered w-full"
              />

              <div className="form-control">
                <label className="label mt-4">
                  <span className="label-text">Image</span>
                </label>
                <input
                  type="file"
                  onChange={onImageChange}
                  className="file-input file-input-bordered w-full"
                  accept="image/png, image/jpg, image/jpeg"
                />
                <img
                  src={img ? URL.createObjectURL(img) : "../img/noimage.jpg"}
                  alt={img}
                  className="mt-2 border rounded-lg min-w-full"
                />
              </div>

              <label className="label mt-4">
                <span className="label-text">Content</span>
              </label>
              <Editor
                apiKey="wyopdb0u8mweiku159d2tp39m5451adsboem7qcr0jyyixp1"
                onInit={(evt, editor) => (editorRef.current = editor)}
                type="text"
                placeholder=""
                initialValue={newsObj.content}
                init={{
                  height: 500,
                  menubar: false,
                  plugins: [
                    "advlist autolink lists link image charmap print preview anchor",
                    "searchreplace visualblocks code fullscreen",
                    "insertdatetime media table paste code help wordcount",
                  ],
                  toolbar:
                    "undo redo | formatselect | " +
                    "bold italic backcolor | alignleft aligncenter " +
                    "alignright alignjustify | bullist numlist outdent indent | " +
                    "removeformat | help",
                  content_style:
                    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                }}
                onEditorChange={(value) => {
                  setText(value);
                }}
                className="textarea textarea-bordered h-24"
              />

              <div className="text-err text-lg">{errorMessage}</div>
            </div>
            <div className="modal-action">
              <form method="dialog">
                <button id="btnCloseAddNews" className="btn">
                  Close
                </button>
              </form>

              <button
                className="btn btn-primary ml-4 "
                onClick={() => saveNewNews()}
              >
                Create <span className={loading ? " loading" : ""}></span>
              </button>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </div>
    </>
  );
}

export default AddNews;
