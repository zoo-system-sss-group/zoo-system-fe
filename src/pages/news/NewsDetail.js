import { useNavigate, useParams } from "react-router-dom";
import NewsRepository from "../../repositories/NewsRepository";
import { useEffect, useState } from "react";
import Footer from "../../components/landingPage/Footer";
import Header from "../../components/landingPage/Header";

import GuestLayout from "../../components/layout/GuestLayout";
import DOMPurify from "dompurify";

export function NewsDetail() {
  const { id } = useParams();
  const _repo = new NewsRepository();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(true);
  const [news, setNews] = useState(null);
  const [errorMessage, setError] = useState(undefined);
  useEffect(() => {
    _repo
      .getNewsById(id)
      .then((resp) => {
        setNews(resp);
        setLoading(false);
      })
      .catch((err) => {
        if (err.code === "ERR_NETWORK") {
          setError("Server Not Loaded!");
          return;
        }
        setError(JSON.stringify(err));
        navigate(`/404`, { replace: true });
      });
    // .catch((err)=>(
    //     document.location.href = "/404"
    // ));
  }, []);

  return (
    <div>
      <Header />
      <GuestLayout title={loading ? "Loading..." : ""}>
        {errorMessage && errorMessage}
        {loading ? (
          <div className="loading h-[800px] m-auto block "></div>
        ) : (
          <section className="container shadow-lg rounded-lg bg-cor3 text-cor5 lg:my-10 mr-auto  lg:ms-6 md:my-6 p-6 lg:w-2/3">
            <div className="text-3xl font-bold ">{news?.title}</div>
            <div className="flex flex-col justify-center ">
              <img
                className="image-full  w-2/3 block m-auto max-w-[500px] min-h-[16rem] border my-6"
                src={news?.thumbnail}
                alt={news?.title}
              />
              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(news.content),
                }}
              ></div>
            </div>
          </section>
        )}
      </GuestLayout>
      <Footer />
    </div>
  );
}
