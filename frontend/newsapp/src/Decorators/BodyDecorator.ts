import { news } from "../CommonTypes";

export function getNewsRequest(news: news) {
  return {
    title: news.title || "",
    url: news.url || "",
    urlToImage: news.urlToImage || "",
  };
}

export function setNewsResponse(
  response: { title: string; url: string; imageURL: string }[],
) {
  const allnews = response.map((item) => {
    return {
      source: {
        id: "",
        name: "",
      },
      author: "",
      title: item.title,
      description: "",
      url: item.url,
      urlToImage: item.imageURL,
      publishedAt: "",
      content: "",
    };
  });
  return allnews;
}
