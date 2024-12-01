import { React, useState } from "react";
import { NavLink } from "react-router-dom";
import "../Styles/Card.css";
import Modal from "react-bootstrap/Modal";

export default function Card({
  link,
  imageURL,
  title,
  width,
  description,
  content,
}) {
  const placeholderImage = "https://via.placeholder.com/150";
  const [modalShow, setModalShow] = useState(false);

  return (
    <div className="cardLayout">
      <MyVerticallyCenteredModal
        show={modalShow}
        title={title}
        link={link}
        content={content}
        imageURL={imageURL}
        description={description}
        onHide={() => setModalShow(false)}
      />
      <div
        onClick={() => {
          setModalShow(true);
        }}
      >
        <div className="image">
          <img
            style={{ display: "block" }}
            src={imageURL || placeholderImage}
            alt={title}
          />
        </div>
        <div className="cardTitle">
          <p>{title}</p>
        </div>
      </div>
    </div>
  );
}

function MyVerticallyCenteredModal(props) {
  const placeholderImage = "https://via.placeholder.com/150";
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          <NavLink
            to={props.link}
            style={{ textDecoration: "none" }}
          >
            {props.title}
          </NavLink>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={modalStyles.container}>
          <div style={modalStyles.imageContainer}>
            <img
              style={modalStyles.image}
              src={props.imageURL || placeholderImage}
              alt={props.title}
            />
          </div>
          <div style={modalStyles.textContainer}>
            <p style={modalStyles.description}>{props.description}</p>
            <p style={modalStyles.content}>{props.content}</p>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

const modalStyles = {
  container: {
    display: "flex",
    flexDirection: "column", // Arrange elements vertically
    alignItems: "center", // Center align content horizontally
    textAlign: "center", // Center align text
    gap: "15px", // Add spacing between sections
  },
  imageContainer: {
    width: "100%", // Ensure the image spans the modal width
    borderRadius: "8px", // Rounded edges for the image
    overflow: "hidden", // Prevent image overflow
  },
  image: {
    display: "block",
    width: "100%", // Image fills the container
    height: "auto", // Maintain aspect ratio
    objectFit: "cover", // Crop the image if necessary
  },
  textContainer: {
    width: "90%", // Keep the text area smaller than the modal width
  },
  title: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    margin: "10px 0",
    color: "#333",
  },
  description: {
    fontSize: "1.2rem",
    marginBottom: "10px",
    color: "#555",
  },
  content: {
    fontSize: "1rem",
    color: "#666",
  },
};
