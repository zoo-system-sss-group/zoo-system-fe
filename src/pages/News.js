import Footer from "../components/landingPage/Footer";
import Header from "../components/landingPage/Header";
import GuestLayout from "../components/layout/GuestLayout";
import NewsRepository from "../repositories/NewsRepository";
import { useEffect, useState } from "react";
import Pagination from "./../components/layout/Pagination";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import DOMPurify from "dompurify";
import { Progress } from "./buyTicketPage/Progress";
const pageSize = 9;

function News() {
  const _repo = NewsRepository();
  const [params] = useSearchParams();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [page, setPage] = useState(params.get("page") ?? 1);
  const [pageIndex, setPageIndex] = useState(page ?? 1);
  const [totalItems, setTotal] = useState(0);

  useEffect(() => {
    setLoading(false);
  }, [news]);
  useEffect(() => {
    setLoading(true);
    try {
      const pageIndex = parseInt(page);
      setPageIndex(pageIndex);
      _repo
        .getNews(pageIndex, pageSize)
        .then((response) => {
          setNews(response.value);
          setTotal(response.count);
        })
        .catch((err) => console.log("Server Not Loaded!"));
    } catch (error) {
      setPageIndex(1);
    }
  }, [page]);

  function cleanContent(content) {
    const cleanedContent = document.createElement("div");
    cleanedContent.innerHTML = DOMPurify.sanitize(content).toString();
    return cleanedContent.innerText;
  }

  return (
    <div>
      <Header />
      <GuestLayout title="All news" className={"min-h-[400px]"}>
        <div
          className={
            "mx-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 relative justify-center gap-4 my-6 "
          }
        >
          {loading ? (
            <>
              <div className="absolute loading m-auto inset-0"></div>
              <div className=" h-40"></div>
            </>
          ) : (
            news.map((newObj) => (
              <Link
                to={`${newObj.id}`}
                key={newObj.id}
                className="card lg:w-[400px] w-[300px] mx-auto bg-cor4 shadow-md shadow-cor5 hover:scale-[1.075] cursor-pointer hover:transition"
                title={newObj.title}
              >
                <figure>
                  <img
                    className="w-full h-52 object-cover object-top"
                    src={newObj.thumbnail ?? "../img/noImage.jpg"}
                    alt={newObj.title}
                  />
                </figure>
                <div className="card-body px-4 py-6">
                  <h2 className="card-title text-cor2">{newObj.title}</h2>
                  <p className="text-cor7 line-clamp-4">
                    {cleanContent(newObj.content)}
                  </p>
                </div>
              </Link>
            ))
          )}
        </div>
        {/* paging */}
        <Pagination
          clicked={(i) => {
            navigate(`/news?page=${i}`, { replace: true });
            setPage(i);
          }}
          pageSize={pageSize}
          pageIndex={pageIndex}
          totalItems={totalItems}
          className
        />
      </GuestLayout>
      <Footer />
    </div>
  );
}

export default News;
