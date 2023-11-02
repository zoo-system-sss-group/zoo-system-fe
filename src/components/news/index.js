import { useEffect, useState } from "react";
import moment from "moment";
import { useDispatch } from "react-redux";
import TitleCard from "../common/Cards/TitleCard";
import {
  TrashIcon,
  PencilSquareIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";
import { showNotification } from "../common/headerSlice";
import EditNews from "./components/EditNews";
import AddNews from "./components/AddNews";
import ViewNews from "./components/ViewNews";
import NewsRepository from "../../repositories/NewsRepository";
import DOMPurify from "dompurify";
import { ValidateEmpty } from "../../utils/Validation";
import { cleanContent } from "../../utils/MyUtils";

const VALIDATIONS = {
  title: [ValidateEmpty()],
  thumbnail: [],
  content: [ValidateEmpty()],
};

const user = JSON.parse(localStorage.getItem("loginInfo"));

function News() {
  const dispatch = useDispatch();
  const _repo = NewsRepository();
  const [news, setNews] = useState();
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [idSelect, setIdSelect] = useState(1);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    isEnd: false,
  });
  //lay danh sach news
  const fetchNewsList = () => {
    // axios
    // 	.get(
    // 		`odata/news?$filter=isDeleted eq false&$orderby=CreationDate desc&$skip=${
    // 			(pagination.page - 1) * 10
    // 		}&$top=${pagination.limit}`
    // 	)
    // 	.then((res) => {
    // 		let news = res.data.value;
    // 		if (!pagination.isEnd && news.length < pagination.limit)
    // 			setPagination({ ...pagination, isEnd: true });
    // 		else if (pagination.isEnd && news.length === pagination.limit)
    // 			setPagination({ ...pagination, isEnd: false });
    // 		setNews(news);
    // 	})
    // 	.catch((err) => {
    // 		setError(err.message);
    // 	});
    _repo
      .getNews(pagination.page, pagination.limit, search)
      .then((res) => {
        let news = res.value;
        if (!pagination.isEnd && news.length < pagination.limit)
          setPagination({ ...pagination, isEnd: true });
        else if (pagination.isEnd && news.length === pagination.limit)
          setPagination({ ...pagination, isEnd: false });
        setNews(news);
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  useEffect(() => {
    fetchNewsList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination]);
  const deleteNews = (id, user) => {
    // axios
    //   .delete(`/odata/news/${id}`)
    //   .then((res) => {
    //     dispatch(
    //       showNotification({
    //         message: "News deleted!",
    //         status: res.status,
    //       })
    //     );
    //     fetchNewsList();
    //   })
    //   .catch((err) => {
    //     dispatch(showNotification({ message: err.message, status: 400 }));
    //   });
    _repo
      .removeNews(id)
      .then((res) => {
        dispatch(
          showNotification({
            message: res,
            status: 200,
          })
        );
        fetchNewsList();
      })
      .catch((err) => {
        dispatch(showNotification({ message: err.message, status: 400 }));
      });
  };

  return (
    <>
      <TitleCard
        title="News table"
        topMargin="mt-2"
        searchInput={
          <div className="join">
            <input
              className="input input-bordered join-item"
              placeholder="Search by Name and Content"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="indicator">
              <button className="btn join-item" onClick={() => fetchNewsList()}>
                Search
              </button>
            </div>
          </div>
        }
        TopSideButtons={
          user.role === "Staff" && (
            <AddNews VALIDATIONS={VALIDATIONS} fetch={fetchNewsList} />
          )
        }
      >
        <div className="overflow-x-auto w-full">
          {news != null ? (
            <div>
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>No.</th>
                    <th className="w-2/12">Title</th>
                    <th>Thumbnail</th>
                    <th>Content</th>
                    <th>CreationDate</th>
                    <th>ModificationDate</th>
                    {/* <th>Status</th> */}
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {news.map((news, index) => {
                    return (
                      <tr key={news.id + 1}>
                        <td className="min-w-[3rem] max-w-[10rem] whitespace-normal">
                          {index + pagination.page * 10 - 9}
                        </td>
                        <td>{news.title}</td>
                        <td>
                          <img
                            className="max-h-[100px] rounded shadow block m-auto aspect-square object-cover"
                            src={news.thumbnail ?? "../img/noimage.jpg"}
                            alt="Avatar"
                          />
                        </td>
                        <td>
                          <div className="line-clamp-4 ">
                            {cleanContent(news.content)}
                          </div>
                        </td>
                        <td>
                          {moment(news.creationdate).format(
                            "YYYY-MM-DD HH:mm:ss"
                          )}
                        </td>
                        <td>
                          {moment(news.modificationdate).format(
                            "YYYY-MM-DD HH:mm:ss"
                          )}
                        </td>
                        {/* <td>{getStatus(news.IsDeleted)}</td> */}
                        <td className="flex">
                          {/* Nut xem news */}

                          <button
                            className="btn btn-ghost inline"
                            onClick={() => {
                              setIdSelect(news.id);
                              document
                                .getElementById("btnViewNews")
                                .showModal();
                            }}
                          >
                            <EyeIcon className="w-5 text-cor4 stroke-2" />
                          </button>

                          {/* Nut sua news */}
                          {user.role === "Staff" && (
                            <>
                              <button
                                className="btn btn-ghost inline"
                                onClick={() => {
                                  setIdSelect(news.id);
                                  document
                                    .getElementById("btnEditNews")
                                    .showModal();
                                }}
                              >
                                <PencilSquareIcon className="w-5 text-cor3 stroke-2" />
                              </button>

                              {/* Nut doi status news */}
                              <button
                                className="btn btn-ghost inline"
                                onClick={() => {
                                  setIdSelect(news.id);
                                  document
                                    .getElementById("btnDeleteNews")
                                    .showModal();
                                }}
                              >
                                <TrashIcon className="w-5 text-err stroke-2" />
                              </button>

                              <dialog id="btnDeleteNews" className="modal ">
                                <div className="modal-box">
                                  <h3 className="font-bold text-lg">Confirm</h3>
                                  <p className="py-4 text-2xl">
                                    Are you want to delete news "{news.title}"?
                                  </p>
                                  <div className="modal-action">
                                    <form method="dialog">
                                      <button className="btn">Close</button>

                                      <button
                                        className="btn btn-primary ml-4"
                                        onClick={() => deleteNews(idSelect)}
                                      >
                                        Delete
                                      </button>
                                    </form>
                                  </div>
                                </div>

                                <form
                                  method="dialog"
                                  className="modal-backdrop"
                                >
                                  <button>close</button>
                                </form>
                              </dialog>
                            </>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <ViewNews id={idSelect} />
              {user.role === "Staff" && (
                <EditNews
                  id={idSelect}
                  VALIDATIONS={VALIDATIONS}
                  fetch={fetchNewsList}
                />
              )}
              <div className="w-full flex justify-center">
                <div className="join">
                  <button
                    className="join-item btn"
                    onClick={() => {
                      if (pagination.page > 1)
                        setPagination({
                          ...pagination,
                          page: pagination.page - 1,
                        });
                    }}
                  >
                    «
                  </button>
                  <button className="join-item btn">
                    Page {pagination.page}
                  </button>
                  <button
                    className="join-item btn"
                    onClick={() => {
                      if (!pagination.isEnd)
                        setPagination({
                          ...pagination,
                          page: pagination.page + 1,
                        });
                    }}
                  >
                    »
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full h-96 flex justify-center items-center text-err font-bold text-3xl">
              {error}
            </div>
          )}
        </div>
      </TitleCard>
    </>
  );
}

export default News;
