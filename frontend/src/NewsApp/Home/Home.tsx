import { NavLink } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import React from "react";
import { newsType } from "../CommonTypes.ts";
import LoginModal from "../Components/LoginModal.tsx";
import { getNews } from "../api/getNews.ts";
import DisplayNews from "../Components/DisplayNews.tsx";
import { like } from "../api/like.ts";
import { bookmark } from "../api/bookmark.ts";
import LoadingSpinner from "../Components/Loading.tsx";
import { topicContext } from "../Contexts/TopicContext.ts";

export default function Home() {
  const [loginModal, setLoginModal] = useState(true);
  const [user, setUser] = useState<string | null>(null);
  const [news, setNews] = useState<newsType["articles"]>([]);
  const [topics, setTopics] = useState<string[][]>([]);
  const [loading, setLoading] = useState(true);
  const getTopic: WebSocket = useContext(topicContext);
  useEffect(() => {
    localStorage.removeItem("News");
    localStorage.removeItem("Topics");
    const abortController = new AbortController();
    const user = localStorage.getItem("User") || sessionStorage.getItem("User");
    let cached_news = sessionStorage.getItem("News"),
      cached_topics = sessionStorage.getItem("Topics");
    setUser(user);
    if (user !== null) setLoginModal(false);
    const fetchNews = async () => {
      let allTopics: string[][] = [];
      const allNews = await getNews("TopHeadlines", "country=us");
      setNews(allNews.slice(0, allNews.length / 2));

      const getAllTopics = () =>
        new Promise<void>((resolve) => {
          let receivedCount = 0;
          getTopic.onmessage = (event) => {
            allTopics.push(JSON.parse(event.data));
            receivedCount++;
            if (receivedCount === allNews.length) {
              resolve();
            }
          };

          for (let i = 0; i < allNews.length; i++) {
            getTopic.send(allNews[i].description);
          }
        });

      await getAllTopics();
      setTopics(allTopics.slice(0, allTopics.length / 2));
      sessionStorage.setItem("News", JSON.stringify(allNews));
      sessionStorage.setItem("Topics", JSON.stringify(allTopics));
      setLoading(false);
    };
    if (cached_news === undefined || cached_news === null) fetchNews();
    else {
      console.log(JSON.parse(cached_news).length);
      setNews(JSON.parse(cached_news).slice(0, 16));
      setTopics(JSON.parse(cached_topics).slice(0, 16));
      setLoading(false);
    }
    return () => {
      abortController.abort();
    };
  }, []);

  return loading === true ? (
    <LoadingSpinner />
  ) : (
    <div>
      {loginModal && (
        <LoginModal
          onClose={() => {
            setLoginModal(false);
          }}
        />
      )}
      <div style={Styles.feature_heading}>
        <center>
          <h1>Hello {user !== null ? user : "User"}</h1>
        </center>
        <div>
          <h4>Here is your daily feature: -</h4>
        </div>
        <div>
          {user && (
            <h4>
              <NavLink
                to="allNews"
                style={{ textDecoration: "none", color: "#4e607a" }}
              >
                See All News &gt;
              </NavLink>
            </h4>
          )}
        </div>
      </div>
      <DisplayNews
        news={news}
        topics={topics}
        menuOptions={[
          { option: "Bookmark", function: bookmark },
          { option: "Like", function: like },
        ]}
      />
    </div>
  );
}

const Styles = {
  feature_heading: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "20px 6%",
    backgroundColor: "#1e293b",
    color: "#ffffff",
    borderBottom: "2px solid #0f172a",
    marginBottom: "20px",
  } as React.CSSProperties,
};
