import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../Styles/Card.css";
import Modal from "react-bootstrap/Modal";

type CardProps = {
  link?: string;
  imageURL?: string;
  title?: string;
  modal?: boolean;
  description?: string;
  content?: string;
  bookMark?: React.ReactNode;
};

export default function Card({
  link="",
  imageURL="",
  title="",
  modal = true,
  description = "",
  content = "",
  bookMark = null,
}:CardProps) {
  const placeholderImage = "https://via.placeholder.com/150";
  const [modalShow, setModalShow] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="cardLayout">
      {modal && (
        <MyVerticallyCenteredModal
          show={modalShow}
          title={title}
          link={link}
          content={content}
          imageURL={imageURL}
          description={description}
          onHide={() => setModalShow(false)}
        />
      )}
      <div
        onClick={() => {
          if (modal) setModalShow(true);
          else navigate(link);
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
        {bookMark}
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
          <NavLink to={props.link} style={{ textDecoration: "none" }}>
            {props.title}
          </NavLink>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="container">
          <div className="imageContainer">
            <img
              className="image"
              src={props.imageURL || placeholderImage}
              alt={props.title}
            />
          </div>
          <div className="textContainer">
            <p className="description">{props.description}</p>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
