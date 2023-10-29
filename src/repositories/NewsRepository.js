import { NewsServiceClient } from "../protos/autogenerate/news_grpc_web_pb";
import {
  Empty,
  NewsDTO,
  UpdateNewsDTO,
  StringMessage,
  NewsId,
} from "../protos/autogenerate/news_grpc_web_pb";
function NewsRepository() {
  const client = new NewsServiceClient(process.env.REACT_APP_GRPC_BASE_URL);

  const getNews = (pageIndex, pageSize) =>
    new Promise((resolve, reject) => {
      const news = [];
      const request = new Empty(); // Assuming GetNews takes an Empty request

      const call = client.getNews(request, {}); // Make the gRPC call

      call.on("data", (response) => {
        const newObj = response.toObject();
        news.push(newObj);
      });

      call.on("end", () => {
        // The streaming is complete
        const startIndex = (pageIndex - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const paginatedNews = {
          count: news.length,
          value: news.slice(startIndex, endIndex),
        };
        resolve(paginatedNews);
      });

      call.on("error", (error) => {
        console.error(`Error: ${error}`);
        reject(error);
      });
    });

  const getNewsById =  (id) =>
    new Promise((resolve, reject) => {
      var news = null;

      const request = new NewsId();
      request.setId(id);
      client.getNewById(request, {}, (err, response) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          news = response.toObject();
          resolve(news);
        }
      });
    });
  const createNews = async (newsDto) => {
    try {
      const request = new NewsDTO();
      request.setTitle(newsDto.title);
      request.setThumbnail(newsDto.thumbnail);
      request.setContent(newsDto.content);
      const response = await client.createNews(request, {});
      const message = response.toObject().message;
      return message;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };
  const updateNews = (id, news) => {};
  const removeNews = (id) => {};
  return {
    getNews,
    getNewsById,
    createNews,
    updateNews,
    removeNews,
  };
}
export default NewsRepository;
