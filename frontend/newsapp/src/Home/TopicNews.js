import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import Card from "../Components/Card";
export default function TopicNews() {
  const props = useParams();
  const [news, setNews] = useState([]);
  const apiKey = "d82840cf2d394de2bbf45c8925147b65";
  var url = `https://newsapi.org/v2/everything?apiKey=${apiKey}`;
  if (props.topic !== "")
    url = `https://newsapi.org/v2/everything?q=${props.topic}&apiKey=${apiKey}`;
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(url);
        const allnews = await response.json();
        setNews(allnews.articles);
      } catch (error) {
        console.error("Error Message -> ", error);
      }
    };
    fetchNews();
  }, [url]);

  return (
    <div style={Styles.cardContainer}>
      {news.map((news) => {
        return (
          <Card
            key={news.title}
            title={news.title}
            description={news.description}
            link={news.url}
            imageURL={news.urlToImage}
            content={news.content}
          />
        );
      })}
    </div>
  );
}

const Styles = {
  cardContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: "10px",
    padding: "10px",
  },
};
