import React, { useState } from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";

export default function Bookmark({
  storeBookmark,
}: {
  storeBookmark: () => Promise<string>;
}) {
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
      onClick={async (e) => {
        e.stopPropagation();
        const response = await storeBookmark();
        if (response === "Success") setIsBookmarked(!isBookmarked);
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
    position: "absolute",
    bottom: "10px",
    right: "10px",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    fontSize: "1.5rem",
    color: "#007bff",
    outline: "none",
  } as React.CSSProperties,
  bookmarkButtonHover: {
    color: "#0056b3",
  },
};
