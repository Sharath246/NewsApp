import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Card from "../Components/Card.tsx";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import React from "react";
import { newsType } from "../CommonTypes.ts";
import LoginModal from "../Components/LoginModal.tsx";
import Bookmark from "../Components/Bookmark.tsx";
import { bookmark } from "../api/bookmark.ts";
import { getNews } from "../api/getNews.ts";
export default function Home() {
  const location = useLocation();
  const navigation = useNavigate();
  const [loginModal, setLoginModal] = useState(true);
  const [user, setUser] = useState<string | null>(null);
  const [news, setNews] = useState<newsType["articles"]>([]);
  useEffect(() => {
    const user = localStorage.getItem("User");
    setUser(user);
    if (user !== null) setLoginModal(false);
    const fetchNews = async () => {
      const allNews = await getNews("TopHeadlines", "country=us");
      setNews(allNews.articles);
    };
    fetchNews();
  }, [ navigation, location.pathname]);
  console.log(localStorage.getItem("User"),'\n\n')
  console.log('cookies  ',Cookies.get("User"), "\n\n");
  return (
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
          <h4>
            <NavLink
              to="allNews"
              style={{ textDecoration: "none", color: "#4e607a" }}
            >
              See All News &gt;
            </NavLink>
          </h4>
        </div>
      </div>
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
              bookMark={
                user !== null ? (
                  <Bookmark storeBookmark={async ()=>{return await bookmark(news)}} />
                ) : null
              }
            />
          );
        })}
      </div>
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
