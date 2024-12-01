import Card from "../Components/Card";
import { useState,useEffect } from "react";
export default function AllNews(){
    const url = "https://newsapi.org/v2/top-headlines?country=us&apiKey=";
    const apiKey = "d82840cf2d394de2bbf45c8925147b65";
    const [news, setNews] = useState([]);
    useEffect(() => {
      const fetchNews = async () => {
        try {
          const response = await fetch(url + apiKey);
          const allnews = await response.json();
          setNews(allnews.articles);
        } catch (error) {
          console.error("Error Message -> ", error);
        }
      };
      fetchNews();
    }, []);

    return (
      <>
        <center><h3 style={{marginTop:"2%"}}>Your Curated News</h3></center>
        <div style={Styles.cardContainer}>
          {news.map((news) => {
            return (
              <Card
                key={news.title}
                title={news.title}
                description={news.description}
                link={news.url}
                imageURL={news.urlToImage}
                width={"22%"}
              />
            );
          })}
        </div>
      </>
    );
}

const Styles = {
  cardContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: "10px",
    padding: "10px",
  }
};