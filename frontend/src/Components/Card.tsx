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
    function: (index?: number) => Promise<void>;
  }[];
  topics?: string[];
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
}: CardProps) {
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
      </div>
      <div style={{ position: "absolute", bottom: "10px", left: "10px" }}>
        <div className="topicsContainer">
          {topics && topics.map((item, index) => (
            <span key={index} className="topicTag">
              {item}
            </span>
          ))}
        </div>
      </div>
      {menuOptions && (
        <Dropdown
          className="cardDropdown"
          style={{ position: "absolute", bottom: "10px", right: "10px" }}
        >
          <Dropdown.Toggle
            variant="secondary"
            id="dropdown-basic"
            style={{ backgroundColor: "#e1e4e8", border: "none" }}
          >
            ⋮
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {menuOptions.map((option, index) => {
              return (
                <Dropdown.Item
                  key={index}
                  onClick={() => {
                    option.function(index);
                  }}
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
