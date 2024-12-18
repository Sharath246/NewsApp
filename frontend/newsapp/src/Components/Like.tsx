import React, { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

export default function Like({
  storeLike,
}: {
  storeLike: () => Promise<string>;
}) {
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      style={
        isHovered
          ? { ...Styles.likeButton, ...Styles.likeButtonHover }
          : Styles.likeButton
      }
      className="likeButton"
      onClick={async (e) => {
        e.stopPropagation();
        const response = await storeLike();
        if (response === "Success") setIsLiked(!isLiked);
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isLiked ? <FaHeart /> : <FaRegHeart />}
    </button>
  );
}

const Styles = {
  likeButton: {
    position: "absolute",
    bottom: "10px",
    left: "10px",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    fontSize: "1.5rem",
    color: "#e63946",
    outline: "none"
  } as React.CSSProperties,
  likeButtonHover: {
    color: "#c62828",
  },
};
