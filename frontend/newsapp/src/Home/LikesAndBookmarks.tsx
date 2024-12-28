import React, { useEffect, useState } from "react";
import "../Styles/LikesAndBookmarks.css";
import { allBookmarks, removeBookmark } from "../api/bookmark";
import DisplayNews from "../Components/DisplayNews";
import { allLikes, removeLike } from "../api/like";

export default function LikesAndBookmarks() {
  const [bookmarks, setBookmarks] = useState([]);
  const [likes, setLikes] = useState([]);
  useEffect(() => {
    const email =
      localStorage.getItem("Email") || sessionStorage.getItem("Email");
    async function getBookmarks() {
      const bookmarkResponse = await allBookmarks(email);
      const likeResponse = await allLikes(email);
      setBookmarks(bookmarkResponse);
      setLikes(likeResponse);
    }
    getBookmarks();
  }, [bookmarks, likes]);
  return (
    <>
      <center>
        <h3>Bookmarks:-</h3>
      </center>
      <DisplayNews
        news={bookmarks}
        menuOptions={[
          { option: "Remove from Bookmarks", function: removeBookmark },
        ]}
      />
      <center>
        <h3>Likes:-</h3>
      </center>
      <DisplayNews
        news={likes}
        menuOptions={[{ option: "Remove from Likes", function: removeLike }]}
      />
    </>
  );
}
