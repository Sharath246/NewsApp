import React, { useEffect, useState } from "react";
import Card from "./Card";
import { bookmark } from "../api/bookmark";
import { like } from "../api/like";
import { news, newsType } from "../CommonTypes";
import { Toast, ToastContainer, ToastHeader } from "react-bootstrap";

export default function DisplayNews({
  news,
  menuOptions,
}: {
  news: newsType["articles"];
  menuOptions: {
    option: string;
    function: (news: news, email: string) => Promise<string>;
  }[];
}) {
  const [user, setUser] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  useEffect(() => {
    const user = localStorage.getItem("User") || sessionStorage.getItem("User");
    const email =
      localStorage.getItem("Email") || sessionStorage.getItem("Email");
    setUser(user);
    setEmail(email);
  }, []);

  const handleToast = (message: string, option: string) => {
    if (message === "Success") {
      if (option === "Bookmark")
        message = "Successfully added News to your Bookmarks";
      else if (option === "Like")
        message = "Successfully added News to your Likes";
      else if (option === "Remove from Bookmarks")
        message = "Successfully removed News from your Bookmarks";
      else if (option === "Remove from Likes")
        message = "Successfully removed News from your Likes";
      else message = "Failed ! Please try again";
    } else {
      message = "Failed ! Please try again";
    }
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 1500);
  };

  return (
    <>
      <div style={Styles.toastContainer}>
        <ToastContainer
          className="p-3"
          style={{
            position: "absolute",
            top: "10px",
          }}
        >
          <Toast
            show={showToast}
            onClose={() => setShowToast(false)}
            style={
              toastMessage.match("^Successfully.*")
                ? { backgroundColor: "#4caf50", color: "white" }
                : { backgroundColor: "#f44336", color: "white" }
            }
          >
            <Toast.Body>{toastMessage}</Toast.Body>
          </Toast>
        </ToastContainer>
      </div>
      <div style={Styles.cardContainer}>
        {news
          .filter((news: news) => news.title !== "[Removed]")
          .map((news: news, index: number) => {
            return (
              <Card
                key={index}
                title={news.title}
                description={news.description || ""}
                link={news.url}
                imageURL={news.urlToImage}
                content={news.content || ""}
                menuOptions={menuOptions.map((option) => {
                  return {
                    option: option.option,
                    function: async () => {
                      const response = await option.function(news, email);
                      handleToast(response, option.option);
                    },
                  };
                })}
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
    gap: "10px",
    padding: "10px",
  } as React.CSSProperties,
  toastContainer: {
    display: "flex",
    justifyContent: "center",
  } as React.CSSProperties,
};
