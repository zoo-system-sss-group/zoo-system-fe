import { useState } from "react";
import { useDispatch } from "react-redux";
import { showNotification } from "../../common/headerSlice";
import { useEffect } from "react";
import NewsRepository from "../../../repositories/NewsRepository";
import { Editor } from "@tinymce/tinymce-react";
import { useRef } from "react";
import { FirebaseImageUpload } from "../../../FirebaseImageUpload/FirebaseImageUpload";
import {
  clearErrorValidation,
  getValidationMessageAdvance,
} from "../../../utils/Validation";
import { ref } from "firebase/storage";
import { cleanContent } from "../../../utils/MyUtils";

const INITIAL_NEWS_OBJ = {
  id: "",
  title: "",
  thumbnail: "",
  content: "",
  creationDate: "",
  modificationDate: "",
};

function EditNews({ id, VALIDATIONS, fetch }) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const _repo = NewsRepository();
  const [errorMessage, setErrorMessage] = useState("");
  const [newsObj, setNewsObj] = useState(INITIAL_NEWS_OBJ);
  const [text, setText] = useState("");
  const [img, setImg] = useState(undefined);
  const [imgloading, setImgLoading] = useState(true);
  const form = useRef(null);
  const editorRef = useRef(null);
  const textEditorRef = useRef(null);

  useEffect(() => {
    _repo
      .getNewsById(id)
      .then((res) => {
        setNewsObj(
          (prev) =>
            (prev = {
              ...newsObj,
              ...res,
            })
        );
        setImgLoading(true);
        setText(newsObj.content);
        setImg((prev) => {
          prev = res.thumbnail;
          return prev;
        });
        clearErrorValidation({
          container: form.current,
          errorSelector: ".text-err",
        });
      })
      .catch((err) => {
        setErrorMessage(err);
      });
  }, [id]);

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

    if (img !== null && typeof img !== "string") {
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
    if (typeof img === "string") {
      newsObj.thumbnail = img;
    }
    let { creationDate, modificationDate, id, ...newNewsObj } = newsObj;
    newNewsObj = {
      ...newNewsObj,
      content: text,
    };
    _repo
      .updateNews(id, newNewsObj)
      .then((res) => {
        document.getElementById("btnCloseEditNews").click();
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
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    setImgLoading(false);
  }, [img]);

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
    setImgLoading(true);
    if (e.target.files && e.target.files[0]) {
      setImg(e.target.files[0]);
    }
  };
  return (
    <>
      <dialog id="btnEditNews" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <h3 className="font-bold text-lg">Edit news</h3>
          <div className=" w-full mt-4" ref={form}>
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
                placeholder="input some text"
                name="title"
                value={newsObj.title}
                onChange={(e) => updateFormValue("title", e.target)}
                className="input input-bordered w-full "
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
              {imgloading ? (
                <div className=" block m-auto loading"></div>
              ) : (
                <img
                  src={
                    img
                      ? typeof img === "object"
                        ? URL.createObjectURL(img)
                        : newsObj.thumbnail
                      : "../img/noimage.jpg"
                  }
                  alt={img}
                  className="image w-2/3 max-w-[500px] block m-auto my-2 shadow rounded-lg "
                />
              )}
              <div className="text-err text-lg my-2"></div>
            </div>
            <div className="form-control">
              <label className="label mt-4">
                <span className="label-text">Content</span>
              </label>
              <div name="content" ref={textEditorRef} className="block relative">
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
                  onEditorChange={(v) => setText(v)}
                  className="textarea textarea-bordered z-10 h-24"
                />
              </div>
              <div className="text-err text-lg">{errorMessage}</div>
            </div>
          </div>
          <div className="modal-action">
            <form method="dialog">
              <button id="btnCloseEditNews" className="btn">
                Close
              </button>
            </form>

            <button
              className="btn btn-primary ml-4"
              onClick={(e) => saveNewNews()}
            >
              Save<span className={loading ? " loading" : ""}></span>
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

export default EditNews;
