import React from "react";
import LayoutSections from "../layout/LayoutSections";
import Slider from "../layout/Slider";
import { Link } from "react-router-dom";
import NewsRepository from "../../repositories/NewsRepository";
import { useState } from "react";
import { useEffect } from "react";
import { cleanContent } from './../../utils/MyUtils';

const News = () => {
  const [news, setNews] = useState(null);
  const _repo = NewsRepository();
  useEffect(() => {
    _repo
      .getNews(1, 5)
      .then((response) => {
        setNews(response.value);
      })
      .catch((err) => console.log("Server Not Loaded!"));
  }, []);

  return (
    <section className="bg-cor4 text-cor2 flex flex-col sm:flex-row pt-0 sm:pt-16 pb-16 ">
      <LayoutSections title="News">
        <p className="mb-8 w-max-[450px]">
          Discover the Latest Happenings at Our Zoo!
        </p>
        <Link to="/news" className="btn btn-primary">
          Read news
        </Link>
      </LayoutSections>
      <Slider>
        {news && news.map((newsObj) => (
          <Link to={`news/${newsObj.id}`} key={newsObj.id} className="bg-[#1b3323] p-4 h-full rounded-xl">
            <img
              className="h-[180px] w-full md:h-[250px] object-cover mb-4"
              src={newsObj.thumbnail ?? "../img/noImage.jpg" }
              alt={newsObj.title}
            />
            <h3 className="mb-4 text-base font-medium">{newsObj.title}</h3>
            <p className="text-cor7">{cleanContent(newsObj.content)}</p>
          </Link>
        ))}
      </Slider>
    </section>
  );
};

export default News;
