import React from "react";
import Modal from "react-bootstrap/Modal";
import { Button, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import { newsType } from "../CommonTypes.ts";
import { getNews } from "../api/getNews.ts";
import { useNavigate } from "react-router-dom";
import DisplayNews from "../Components/DisplayNews.tsx";

export default function AllNews() {
  const [news, setNews] = useState<newsType["articles"]>([]);
  const [query, setQuery] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (sessionStorage.getItem("User") === null) {
      if (localStorage.getItem("User") === null) navigate("/notAuthorized");
    }
    const fetchNews = async () => {
      var allNews: newsType;
      if (query !== "") allNews = await getNews("Everything", query);
      else allNews = { status: "", totalResults: 0, articles: [] };
      setNews(allNews.articles);
    };
    fetchNews();
  }, [query,navigate]);

  return (
    <>
      <div style={Styles.mainHeading}>
        <div>
          <h2>Your Curated News</h2>
        </div>
        <div>
          <button onClick={() => setModalShow(true)}>Open Filter</button>
          <FilterModal
            show={modalShow}
            onHide={() => setModalShow(false)}
            setQuery={setQuery}
          />
        </div>
      </div>
      {news.length !== 0 ? (
        <div style={Styles.cardContainer}>{<DisplayNews news={news} />}</div>
      ) : (
        <div style={{ display: "flex", justifyContent: "center" }}>
          No News To Display. Select Atleast one topic in the Filters.
        </div>
      )}
    </>
  );
}

export function FilterModal({ show, onHide, setQuery }) {
  const [topic, setTopic] = useState("");
  // const [topics, setTopics] = useState<string[]>([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [language, setLanguage] = useState("");
  const [error, setError] = useState(false);
  const [sortBy, setSortBy] = useState("relevance");

  const today = new Date();
  const oneMonthBefore = new Date();
  oneMonthBefore.setMonth(today.getMonth() - 1);

  const maxFromDate = oneMonthBefore.toISOString().split("T")[0];
  const maxToDate = today.toISOString().split("T")[0];
  const languages = ["English", "Spanish", "French", "German", "Italian"];
  const sortOptions = ["relevance", "popularity", "publishedAt"];

  const handleSubmit = (e) => {
    e.preventDefault();
    var query = "";
    if (topic !== "") {
      // query += `q=${topics[0]}`;
      // for (let i = 1; i < topics.length; i++) query += `OR${topics[i]}`;
      query += `q=${topic}`;
    } else {
      setError(true);
      return;
    }
    if (fromDate !== "") query += `&from=${fromDate}`;
    if (toDate !== "") query += `&to=${toDate}`;
    if (sortBy !== "") query += `&sortBy=${sortBy}`;
    if (language === "English") query += `&language=en`;
    else if (language === "Spanish") query += `&language=es`;
    else if (language === "French") query += `&language=fr`;
    else if (language === "German") query += `&language=de`;
    else if (language === "Italian") query += `&language=it`;
    setQuery(query);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Filter News</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formTopic">
            <Form.Label>Topic</Form.Label>
            {/* <div style={{ display: "flex", alignItems: "center" }}> */}
            <Form.Control
              type="text"
              placeholder="Enter topic"
              value={topic}
              onChange={(e) => {
                setTopic(e.target.value.trim());
                setError(false);
              }}
              style={{ marginRight: "10px" }}
            />
            {/* <Button
              variant="secondary"
              onClick={() => {
                if (
                  topics.some(
                    (item) => item.toLowerCase() === topic.toLowerCase()
                  )
                )
                  setError(true);
                else if (topic !== "") {
                  setTopics((prevItems) => [...prevItems, topic]);
                  setTopic("");
                }
              }}
            >
              Add
            </Button>
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              {topics.map((topic, index) => (
                <span key={index} style={Styles.topic}>
                  {topic} &nbsp;
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setTopics((prev) => [
                        ...prev.slice(0, index),
                        ...prev.slice(index + 1),
                      ]);
                    }}
                  >
                    x
                  </span>
                </span>
              ))}
            </div>*/}
            {error && (
              <p style={{ fontSize: "0.8rem", color: "red" }}>
                Type atleast one topic
              </p>
            )}
          </Form.Group>

          <Form.Group controlId="formFromDate">
            <Form.Label>From Date</Form.Label>
            <Form.Control
              type="date"
              value={fromDate}
              min={maxFromDate}
              max={maxToDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formToDate">
            <Form.Label>To Date</Form.Label>
            <Form.Control
              type="date"
              value={toDate}
              min={maxFromDate}
              max={maxToDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formLanguage">
            <Form.Label>Language</Form.Label>
            <Form.Control
              as="select"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="">Select a language</option>
              {languages.map((language, index) => (
                <option key={index} value={language}>
                  {language}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="formSortBy">
            <Form.Label>Sort By</Form.Label>
            <Form.Control
              as="select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              {sortOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Button
            variant="primary"
            onClick={handleSubmit}
            style={{ marginTop: "15px" }}
          >
            Apply Filter
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

const Styles = {
  mainHeading: {
    display: "flex",
    justifyContent: "space-between",
  },
  cardContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: "10px",
    padding: "10px",
  } as React.CSSProperties,
  topic: {
    display: "flex",
    padding: "1%",
    backgroundColor: "grey",
    color: "black",
    justifyContent: "space-between",
    margin: "1%",
  },
};
