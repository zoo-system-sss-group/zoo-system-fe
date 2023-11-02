import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { showNotification } from "../../common/headerSlice";
import { Editor } from "@tinymce/tinymce-react";
import NewsRepository from "../../../repositories/NewsRepository";
import { FirebaseImageUpload } from "../../../FirebaseImageUpload/FirebaseImageUpload";
import {
  getValidationMessageAdvance,
  getValidationMessage,
} from "../../../utils/Validation";
// import { addNewNews } from "../newsSlice"
import { ref } from "firebase/storage";
import DOMPurify from "dompurify";
import { cleanContent } from "../../../utils/MyUtils";

const INITIAL_NEWS_OBJ = {
  title: "",
  thumbnail: "",
  content: "",
  creationDate: "",
  modificationDate: "",
};

function AddNews({ fetch, VALIDATIONS }) {
  const dispatch = useDispatch();
  const _repo = NewsRepository();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [newsObj, setNewsObj] = useState(INITIAL_NEWS_OBJ);
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const editorRef = useRef(null);
  const form = useRef(null);
  const textEditorRef = useRef(null);

  const saveNewNews = async () => {
    setLoading(true);
    let hasError = false;
    Object.keys(VALIDATIONS).forEach((key) => {
      if (hasError) return;
      const input = form.current.querySelector(`[name=${key}]`);
      const data = {
        validation: VALIDATIONS[key],
        inputNode: input,
        errorSelector: `.form-control:has([name=${key}]) .text-err`,
        container: form.current,
        value: input.value,
      };
      if (key === "content") {
        data.inputNode = textEditorRef.current;
        data.value = cleanContent(text)?.trim() ?? "";
      }
      msg = getValidationMessageAdvance(data);
      if (msg) hasError = true;
    });
    if (hasError) return setLoading(false);

    newsObj.content = text;
    if (img != null) {
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
    } else {
      newsObj.thumbnail = img;
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
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const updateFormValue = (updateType, inputNode) => {
    const validation = VALIDATIONS[updateType];
    const msg = getValidationMessageAdvance({
      validation: validation,
      container: form.current,
      value: inputNode.value,
      errorSelector: `.form-control:has([name=${updateType}]) .text-err`,
      inputNode: inputNode,
    });
    setErrorMessage("");
    setNewsObj({ ...newsObj, [updateType]: inputNode.value });
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
          className="btn px-6  normal-case btn-primary"
          onClick={() => document.getElementById("btnAddNews").showModal()}
        >
          Add New
        </button>
        <dialog id="btnAddNews" className="modal ">
          <div className="modal-box w-11/12 max-w-5xl" ref={form}>
            <h3 className="font-bold text-2xl">Create news</h3>
            <div className=" w-full ">
              <div className="form-control">
                <label className="label mt-4">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  placeholder=""
                  value={newsObj.title}
                  name="title"
                  onChange={(e) => updateFormValue("title", e.target)}
                  className="input input-bordered w-full"
                />
                <div className="text-err text-lg"></div>
              </div>

              <div className="form-control">
                <label className="label mt-4">
                  <span className="label-text">Image</span>
                </label>
                <input
                  type="file"
                  name="thumbnail"
                  onChange={onImageChange}
                  className="file-input file-input-bordered w-full"
                  accept="image/png, image/jpg, image/jpeg"
                />
                <img
                  src={img ? URL.createObjectURL(img) : "../img/noimage.jpg"}
                  alt={img}
                  onClick={(e) => e.target.previousSibling.click()}
                  className="mt-2 border m-auto  rounded-lg w-2/3 max-w-[500px]"
                />
                <div className="text-err text-lg"></div>
              </div>

              <div className="form-control relative">
                <label className="label mt-4">
                  <span className="label-text">Content</span>
                </label>
                <div name="content" ref={textEditorRef} className="block relative">
                  <Editor
                    apiKey="wyopdb0u8mweiku159d2tp39m5451adsboem7qcr0jyyixp1"
                    onInit={(evt, editor) => (editorRef.current = editor)}
                    type="text"
                    name="content"
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
                    className="textarea textarea-bordered  h-24"
                  />
                </div>
                <div className="text-err text-lg">{errorMessage}</div>
              </div>
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
