import React from "react";

export default function LoginWarning({ onClose }) {
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <p style={styles.text}>
          Please <strong>log in</strong> to save and keep track of your Likes
          and Intrests.
        </p>
        <button style={styles.closeButton} onClick={onClose}>
          ✖
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: "100%",
    backgroundColor: "#ffeeba",
    color: "#856404",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    zIndex: 1000,
  } as React.CSSProperties,
  content: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    maxWidth: "1200px",
    margin: "0 auto",
  } as React.CSSProperties,
  text: {
    margin: 0,
    fontSize: "16px",
  } as React.CSSProperties,
  closeButton: {
    background: "none",
    border: "none",
    fontSize: "20px",
    color: "#856404",
    cursor: "pointer",
  } as React.CSSProperties,
};
