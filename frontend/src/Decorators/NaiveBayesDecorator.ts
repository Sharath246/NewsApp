import { news } from "../CommonTypes";

export function trainDecorator(news: news[], topic: string) {
  topic = topic.toLowerCase();
  const all_desc: string[] = [];
  const topics: string[] = [];
  news.forEach((article) => {
    all_desc.push(article.description);
    topics.push(topic);
  });
  return {
    news: all_desc,
    topic: topics,
  };
}
