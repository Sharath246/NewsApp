import { NavLink, useParams } from "react-router-dom";
import Card from "../Components/Card.tsx";
import { useEffect, useState } from "react";
import React from "react";
import { newsType } from "../CommonTypes.ts";
export default function Home() {
  const params = useParams();
  const apiKey = "d82840cf2d394de2bbf45c8925147b65";
  const newsurl = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;
  // const userUrl = "localhost:8080/getuser";
  const [news, setNews] = useState<newsType["articles"]>([]);
  // const [user,setUSer] = useState("");
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response1 = await fetch(newsurl);
        const allnews = await response1.json();
        setNews(allnews.articles.slice(0, 8));
        // const response2 = await fetch(userUrl);
        // const name = await response2.text();
        // setUSer(name);
      } catch (error) {
        console.error("Error Message -> ", error);
      }
    };
    fetchNews();
  }, [newsurl]);

  return (
    <div>
      <center>
        <h1>Hello {params && params.name}</h1>
      </center>
      <div style={Styles.feature_heading}>
        <div>
          <h3>Here is your daily feature: -</h3>
        </div>
        <div>
          <h3>
            <NavLink
              to="allNews"
              style={{ textDecoration: "none", color: "#4e607a" }}
            >
              See All &gt;
            </NavLink>
          </h3>
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
