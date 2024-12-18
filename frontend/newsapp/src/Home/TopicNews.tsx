import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import React from "react";
import { newsType } from "../CommonTypes.ts";
import { getNews } from "../api/getNews.ts";
import DisplayNews from "../Components/DisplayNews.tsx";
export default function TopicNews() {
  const props = useParams();
  const [news, setNews] = useState<newsType["articles"]>([]);
  var query: string;
  if (props?.topic) query = `q=${props.topic}`;
  else query = "";
  useEffect(() => {
    const fetchNews = async () => {
      const allNews = await getNews("Everything", query);
      setNews(allNews.articles);
    };
    fetchNews();
  }, [query]);

  return <div style={Styles.cardContainer}>{<DisplayNews news={news} />}</div>;
}

const Styles = {
  cardContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: "10px",
    padding: "10px",
  } as React.CSSProperties,
};
