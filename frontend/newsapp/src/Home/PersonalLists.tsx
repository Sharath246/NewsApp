import React, { useEffect, useState } from "react";
import { news } from "../CommonTypes";
import DisplayNews from "../Components/DisplayNews";
import { allLikes } from "../api/like";
import { useNavigate } from "react-router-dom";
import { allBookmarks } from "../api/bookmark";

export default function(){
    const navigate = useNavigate();
    const [likes,setLikes] = useState<news[] | null>(null);
    const [bookmarks, setBookmarks] = useState<news[] | null>(null);
    useEffect(()=>{
        const email = localStorage.getItem("Email") || sessionStorage.getItem("Email");
        if(email === null)
            navigate("notAuthorized");
        async function setNews() {
            const likedNews = await allLikes(email);
            const bookmarkedNews = await allBookmarks(email);
            setBookmarks(bookmarkedNews);
            setLikes(likedNews);
        }
        setNews();
    },[])
    return (
      <div>
        Liked News
        <div>
          <DisplayNews news={likes} />
        </div>
        BookMarks
        <div>
          <DisplayNews news={bookmarks} />
        </div>
      </div>
    );
}