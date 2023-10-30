import { NewsServiceClient } from "../protos/autogenerate/news_grpc_web_pb";
import {
  Empty,
  NewsDTO,
  CreateNewsDTO,
  UpdateNewsDTO,
  StringMessage,
  NewsId,
} from "../protos/autogenerate/news_grpc_web_pb";
import * as google_protobuf_wrappers_pb from "google-protobuf/google/protobuf/wrappers_pb";
function NewsRepository() {
  const client = new NewsServiceClient(process.env.REACT_APP_GRPC_BASE_URL);

  const getNews = (pageIndex, pageSize) =>
    new Promise((resolve, reject) => {
      const news = [];
      const request = new Empty(); // Assuming GetNews takes an Empty request

      const call = client.getNews(request, {}); // Make the gRPC call

      call.on("data", (response) => {
        const newObj = response.toObject();
        newObj.creationdate = toDate(newObj.creationdate);
        newObj.modificationdate = toDate(newObj.modificationdate);
        newObj.thumbnail = newObj.thumbnail?.value;

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
  const getRandomNews = (id) =>
    new Promise((resolve, reject) => {
      const news = [];
      const request = new NewsId(); // Assuming GetNews takes an Empty request
      request.setId(id);

      const call = client.getRandomNews(request, {}); // Make the gRPC call

      call.on("data", (response) => {
        const newObj = response.toObject();
        newObj.creationdate = toDate(newObj.creationdate);
        newObj.modificationdate = toDate(newObj.modificationdate);
        newObj.thumbnail = newObj.thumbnail?.value;

        news.push(newObj);
      });

      call.on("end", () => {
        // The streaming is complete
        resolve(news);
      });

      call.on("error", (error) => {
        console.error(`Error: ${error}`);
        reject(error);
      });
    });
  const getNewsById = (id) =>
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
          news.creationdate = toDate(news.creationdate);
          news.modificationdate = toDate(news.modificationdate);
          news.thumbnail = news.thumbnail?.value;
          resolve(news);
        }
      });
    });
  const createNews = (newsDto) =>
    new Promise((resolve, reject) => {
      const request = new CreateNewsDTO();
      var thumbnail = new google_protobuf_wrappers_pb.StringValue();
      thumbnail.setValue(newsDto.thumbnail);
      request.setTitle(newsDto.title);
      request.setThumbnail(thumbnail);
      request.setContent(newsDto.content);

      client.createNews(request, {}, (err, response) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          const message = response.toObject().message;
          resolve(message);
        }
      });
    });
  const updateNews = (id, newsDto) =>
    new Promise((resolve, reject) => {
      const request = new UpdateNewsDTO();
      var thumbnail = new google_protobuf_wrappers_pb.StringValue();
      thumbnail.setValue(newsDto.thumbnail);
      request.setId(id);
      request.setTitle(newsDto.title);
      request.setThumbnail(thumbnail);
      request.setContent(newsDto.content);
      client.updateNews(request, {}, (err, response) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          const message = response.toObject().message;
          resolve(message);
        }
      });
    });
  const removeNews = (id) =>
    new Promise((resolve, reject) => {
      const request = new NewsId();
      request.setId(id);
      client.removeNews(request, {}, (err, response) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          const message = response.toObject().message;
          resolve(message);
        }
      });
    });
  const toDate = (timestamp) => {
    if (!timestamp) return null;
    const seconds = timestamp.seconds;
    const nanos = timestamp.nanos;
    const milliseconds = seconds * 1000 + nanos / 1000000;
    return new Date(milliseconds);
  };
  return {
    getNews,
    getRandomNews,
    getNewsById,
    createNews,
    updateNews,
    removeNews,
  };
}
export default NewsRepository;
