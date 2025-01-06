import React, { useEffect, useState } from "react";
import "../Styles/LikesAndBookmarks.css";
import { allBookmarks, bookmark, removeBookmark } from "../api/bookmark";
import DisplayNews from "../Components/DisplayNews";
import { allLikes, like, removeLike } from "../api/like";

export default function LikesAndBookmarks() {
  const [bookmarks, setBookmarks] = useState([]);
  const [likes, setLikes] = useState([]);
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [showLikes, setShowLikes] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();
    const email =
      localStorage.getItem("Email") || sessionStorage.getItem("Email");
    async function getBookmarks() {
      const bookmarkResponse = await allBookmarks(email);
      const likeResponse = await allLikes(email);
      setBookmarks(bookmarkResponse);
      setLikes(likeResponse);
    }
    getBookmarks();
    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <div className="lab-page-container">
      <div className="lab-dropdown">
        <div
          className="lab-dropdown-button"
          onClick={() => setShowBookmarks((prev) => !prev)}
        >
          {showBookmarks ? "Hide Bookmarks" : "Show Bookmarks"}
        </div>
        <div className={`lab-dropdown-content ${showBookmarks ? "show" : ""}`}>
          <DisplayNews
            news={bookmarks}
            menuOptions={[
              {
                option: "Remove from Bookmarks",
                function: removeBookmark,
                setFunction: setBookmarks,
              },
              { option: "Like", function: like, setFunction: setLikes },
            ]}
          />
        </div>
      </div>

      <div className="lab-dropdown">
        <div
          className="lab-dropdown-button"
          onClick={() => setShowLikes((prev) => !prev)}
        >
          {showLikes ? "Hide Likes" : "Show Likes"}
        </div>
        <div className={`lab-dropdown-content ${showLikes ? "show" : ""}`}>
          <DisplayNews
            news={likes}
            menuOptions={[
              {
                option: "Remove from Likes",
                function: removeLike,
                setFunction: setLikes,
              },
              {
                option: "Bookmark",
                function: bookmark,
                setFunction: setBookmarks,
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
