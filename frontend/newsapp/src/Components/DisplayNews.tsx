import React, { useEffect, useState } from "react";
import Card from "./Card";
import { bookmark } from "../api/bookmark";
import { like } from "../api/like";
import Bookmark from "./Bookmark";
import Like from "./Like";
import { news } from "../CommonTypes";

export default function DisplayNews({ news }) {
  const [user, setUser] = useState<string | null>(null);
  useEffect(() => {
    const user = localStorage.getItem("User") || sessionStorage.getItem("User");
    setUser(user);
  }, []);
  return (
    <>
      {news
        .filter((news: news) => news.title !== "[Removed]")
        .map((news: news, index: number) => {
          return (
            <Card
              key={index}
              title={news.title}
              description={news.description}
              link={news.url}
              imageURL={news.urlToImage}
              content={news.content}
              bookMark={
                user !== null ? (
                  <Bookmark
                    storeBookmark={async () => {
                      return await bookmark(news);
                    }}
                  />
                ) : null
              }
              like={
                user !== null ? (
                  <Like
                    storeLike={async () => {
                      return await like(news);
                    }}
                  />
                ) : null
              }
            />
          );
        })}
    </>
  );
}
