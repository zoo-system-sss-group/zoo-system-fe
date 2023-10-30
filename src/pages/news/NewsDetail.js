import { Link, useNavigate, useParams } from "react-router-dom";
import NewsRepository from "../../repositories/NewsRepository";
import { useEffect, useState } from "react";
import Footer from "../../components/landingPage/Footer";
import Header from "../../components/landingPage/Header";

import GuestLayout from "../../components/layout/GuestLayout";
import DOMPurify from "dompurify";
import { format } from "date-fns";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

export function NewsDetail() {
  const { id } = useParams();
  const _repo = new NewsRepository();
  const navigate = useNavigate(true);

  const [loading, setLoading] = useState(true);
  const [newsObj, setNewObj] = useState(null);
  const [news, setNews] = useState(null);
  const [errorMessage, setError] = useState(undefined);
  useEffect(() => {
    _repo
      .getNewsById(id)
      .then((resp) => {
        setNewObj(resp);
      })
      .catch((err) => {
        if (err.code === "ERR_NETWORK") {
          setError("Server Not Loaded!");
          return;
        }
        setError(JSON.stringify(err));
        navigate(`/404`, { replace: true });
      })
      .finally(() => {});

    _repo
      .getRandomNews(id)
      .then((resp) => {
        setNews(resp);
      })
      .catch((err) => {
        if (err.code === "ERR_NETWORK") {
          setError("Server Not Loaded!");
          return;
        }
      })
      .finally(() => {});

    // .catch((err)=>(
    //     document.location.href = "/404"
    // ));
  }, [id]);
  useEffect(() => {
    if (newsObj && news) setLoading(false);
  }, [newsObj, news]);
  return (
    <div>
      <Header />
      <GuestLayout title={loading ? "Loading..." : ""}>
        {errorMessage && errorMessage}

        <section className="container m-auto flex flex-wrap justify-between gap-2 items-start">
          {loading ? (
            <div className="loading h-[800px] m-auto block "></div>
          ) : (
            <>
              <div className="w-full md:w-[64%] shadow-lg rounded-lg bg-cor3 mx text-cor5 lg:my-10  md:my-6 p-6 ">
                <div className="text-3xl font-bold ">{newsObj?.title}</div>
                <div className="text-xs mx-2 underline my-2 ">
                  {newsObj?.creationdate &&
                    format(newsObj.creationdate ?? null, "dd/MM/yyyy hh:mm:ss")}
                </div>
                <div className="flex flex-col justify-center ">
                  <img
                    className="image-full rounded-md w-full lg:w-2/3 block m-auto max-w-[500px] min-h-[16rem] border my-6"
                    src={newsObj?.thumbnail}
                    alt={newsObj?.title}
                  />
                  <div
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(newsObj?.content),
                    }}
                  ></div>
                </div>
              </div>
              <div className="w-full md:w-1/3 my-10  rounded-lg  text-cor2">
                <div className="z-10">
                  {news.map((newObj) => (
                    <div className="relative">
                      <ArrowRightIcon className="w-4 absolute start-0 top-0 bottom-0 my-auto" />
                      <div className="ps-2 my-1 hover:translate-x-5 transition relative rounded-lg  bg-cor5  ">
                        <Link
                          to={`../news/${newObj.id}`}
                          onClick={() => setLoading(true)}
                          className="whitespace-nowrap overflow-hidden "
                        >
                          <li className="list-item py-2 list-none  pe-4 list-inside overflow-hidden ">
                            {newObj.title}
                          </li>
                        </Link>
                      </div>
                    </div>
                  ))}
                  <div className="relative">
                    <Link
                      to={`../news`}
                      onClick={() => setLoading(true)}
                      className="whitespace-nowrap overflow-hidden "
                    >
                      <li className="flex items-center py-2 list-none   pe-4 list-inside overflow-hidden text-cor6 ">
                        <ArrowRightIcon className="w-6 inline mr-3 " />
                        View All News 
                      </li>
                    </Link>
                  </div>
                </div>
              </div>
            </>
          )}
        </section>
      </GuestLayout>
      <Footer />
    </div>
  );
}
