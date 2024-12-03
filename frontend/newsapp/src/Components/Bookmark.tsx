import React, { useState } from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";

export default function Bookmark({storeBookmark}) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      style={
        isHovered
          ? { ...Styles.bookmarkButton, ...Styles.bookmarkButtonHover }
          : Styles.bookmarkButton
      }
      className="bookmarkButton"
      onClick={(e) => {
        e.stopPropagation();
        setIsBookmarked(!isBookmarked);
        storeBookmark();
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isBookmarked ? <FaBookmark /> : <FaRegBookmark />}
    </button>
  );
}

const Styles = {
  bookmarkButton: {
    left: "10px",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    fontSize: "1.5rem",
    color: "#007bff",
  } as React.CSSProperties,
  bookmarkButtonHover: {
    color: "#0056b3",
  },
};
