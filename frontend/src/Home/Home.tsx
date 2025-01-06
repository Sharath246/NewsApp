import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import React from "react";
import { newsType } from "../CommonTypes.ts";
import LoginModal from "../Components/LoginModal.tsx";
import { getNews } from "../api/getNews.ts";
import DisplayNews from "../Components/DisplayNews.tsx";
import { like } from "../api/like.ts";
import { bookmark } from "../api/bookmark.ts";
import { getTopic } from "../api/topic.ts";
import LoadingSpinner from "../Components/Loading.tsx";

export default function Home() {
  const [loginModal, setLoginModal] = useState(true);
  const [user, setUser] = useState<string | null>(null);
  const [news, setNews] = useState<newsType["articles"]>([]);
  const [topics, setTopics] = useState<string[][]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const abortController = new AbortController();
    const user = localStorage.getItem("User") || sessionStorage.getItem("User");
    setUser(user);
    if (user !== null) setLoginModal(false);
    const fetchNews = async () => {
      const allNews = await getNews("TopHeadlines", "country=us");
      const article_topics: string[][] = [];
      setNews(allNews.articles);
      const articles = allNews.articles;
      for (let i = 0; i < articles.length; i++) {
        const response = await getTopic(articles[i].description);
        article_topics.push(response);
      }
      setTopics(article_topics);
      setLoading(false);
    };
    fetchNews();
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
      <center>
        <h1>Hello {user !== null ? user : "User"}</h1>
      </center>
      <div style={Styles.feature_heading}>
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
  cardContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: "10px",
    padding: "10px",
  } as React.CSSProperties,
  feature_heading: {
    display: "flex",
    padding: "0 6%",
    justifyContent: "space-between",
    color: "#4e607a",
  },
};
