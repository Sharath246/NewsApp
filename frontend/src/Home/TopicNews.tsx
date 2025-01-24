import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import React from "react";
import { newsType } from "../CommonTypes.ts";
import { getNews } from "../api/getNews.ts";
import DisplayNews from "../Components/DisplayNews.tsx";
import { bookmark } from "../api/bookmark.ts";
import { like } from "../api/like.ts";
// import { trainModel } from "../api/topic.ts";
import LoadingSpinner from "../Components/Loading.tsx";
export default function TopicNews() {
  const props = useParams();
  const [loading,setLoading] = useState(true);
  const [news, setNews] = useState<newsType["articles"]>([]);
  var query: string;
  if (props?.topic) query = `q=${props.topic}`;
  else query = "";
  useEffect(() => {
    const abortController = new AbortController();
    const fetchNews = async () => {
      const allNews = await getNews("Everything", query);
      setNews(allNews);
      // if (props?.topic) trainModel(allNews.articles, props?.topic);
      setLoading(false);
    };
    fetchNews();
    return () => {
      abortController.abort();
    };
  }, [query,props?.topic]);

  return ( loading ? <LoadingSpinner/> : 
    <DisplayNews
          news={news}
          menuOptions={[
            { option: "Bookmark", function: bookmark },
            { option: "Like", function: like },
          ]}
        />
  );
}

