import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../Styles/Card.css";
import Modal from "react-bootstrap/Modal";
import { Dropdown } from "react-bootstrap";

type CardProps = {
  link: string;
  imageURL?: string;
  title: string;
  modal?: boolean;
  description?: string;
  content?: string;
  bookMark?: () => Promise<string>;
  like?: () => Promise<string>;
  menuOptions?: {
    option: string;
    function: ((index?: number) => Promise<void>) | ((id: number) => void);
  }[];
  topics?: string[];
  styles?: React.CSSProperties;
};

export default function Card({
  link = "",
  imageURL = "",
  title = "",
  modal = true,
  description = "",
  content = "",
  menuOptions,
  topics = [],
  styles = {},
}: CardProps) {
  const placeholderImage = "https://via.placeholder.com/150";
  const [modalShow, setModalShow] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="cardLayout" style={styles}>
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
        className="cardLayout"
        onClick={() => {
          if (modal) setModalShow(true);
          else navigate(link);
        }}
      >
        <div className="image">
          <img src={imageURL || placeholderImage} alt={title} />
        </div>
        <div className="cardContent">
          <p className="cardTitle">{title}</p>
          <p className="cardDescription">{description || ""}</p>
          <div className="topicsContainer">
            {topics.map((topic, index) => (
              <span key={index} className="topicTag">
                {topic}
              </span>
            ))}
          </div>
        </div>
      </div>
      {menuOptions && (
        <Dropdown
          className="cardDropdown"
          style={{
            position: "absolute",
            bottom: "10px",
            right: "10px",
            zIndex: 1050, // Ensure the dropdown is above other elements
          }}
        >
          <Dropdown.Toggle
            variant="secondary"
            id="dropdown-basic"
            style={{ backgroundColor: "#e1e4e8", border: "none" }}
          >
            ⋮
          </Dropdown.Toggle>

          <Dropdown.Menu
            style={{
              position: "absolute",
              zIndex: 1060,
            }}
          >
            {menuOptions.map((option, index) => {
              return (
                <Dropdown.Item
                  key={index}
                  onClick={() => {
                    option.function(index);
                  }}
                  style={{ cursor: "pointer" }} // Ensure the cursor is a pointer on items
                >
                  {option.option}
                </Dropdown.Item>
              );
            })}
          </Dropdown.Menu>
        </Dropdown>
      )}
    </div>
  );
}

type MyVerticallyCenteredModalProps = {
  show: boolean;
  title: string;
  link: string;
  content: string;
  imageURL: string;
  description: string;
  onHide: () => void;
};

function MyVerticallyCenteredModal(props: MyVerticallyCenteredModalProps) {
  const placeholderImage = "https://via.placeholder.com/150";
  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="custom-modal"
    >
      <Modal.Header className="modal-header">
        <Modal.Title id="contained-modal-title-vcenter">
          <NavLink
            to={props.link}
            style={{ textDecoration: "none" }}
            className="modal-title"
          >
            {props.title}
          </NavLink>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body">
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
      <Modal.Footer className="modal-footer">
        <button onClick={props.onHide} className="close-button">
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
}
