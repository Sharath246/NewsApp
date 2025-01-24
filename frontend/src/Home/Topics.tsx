import { getImage } from "../api/getImage.ts";
import Card from "../Components/Card.tsx";
import React, { useEffect, useState } from "react";

export default function Topic() {
  const [topics, setTopics] = useState([]);
  const [isCustomizing, setIsCustomizing] = useState(false);

  useEffect(()=>{
    const topic = localStorage.getItem('UserTopics') || sessionStorage.getItem('UserTopics');
    if(topic)
      setTopics(JSON.parse(topic));
  },[])

  const handleAddTopic = async () => {
    const topicName = prompt("Enter new topic name:");
    if (!topicName) {
      alert("Topic name is required");
      return;
    }
    const imageURL = await getImage(topicName);
    const newTopic = {
      id: Date.now().toString(),
      topic: topicName,
      image_url: imageURL,
    };
    sessionStorage.setItem("UserTopics", JSON.stringify([...topics, newTopic]));
    if(localStorage.getItem('UserTopics'))
      localStorage.setItem("UserTopics", JSON.stringify([...topics, newTopic]));
    sessionStorage.setItem('TopicsChanged', "yes");
    setTopics([...topics, newTopic]);
  };

  const handleRemoveTopic = (id: string) => {
    const updatedTopics = topics.filter((topic) => topic.id !== id);
    sessionStorage.setItem("UserTopics", JSON.stringify(updatedTopics));
    if (localStorage.getItem("UserTopics"))
      localStorage.setItem("UserTopics", JSON.stringify(updatedTopics));
    sessionStorage.setItem("TopicsChanged", "yes");
    setTopics(updatedTopics);
  };

  return (
    <>
      <div style={Styles.mainContainer}>
        <button
          onClick={() => setIsCustomizing(!isCustomizing)}
          style={Styles.toggleButton}
        >
          {isCustomizing ? "Done Customizing" : "Customize Topics"}
        </button>
        {isCustomizing && (
          <button onClick={handleAddTopic} style={Styles.addButton}>
            Add Topic
          </button>
        )}
      </div>
      <div style={Styles.container}>
        {topics.map((topic) => (
          <div style={Styles.cardContainer} key={topic.id}>
            <Card
              title={topic.topic}
              imageURL={topic.image_url}
              link={`/dashboard/topicNews/${topic.topic}`}
              modal={false}
              styles={{width:"100%"}}
            />
            {isCustomizing && (
              <button
                onClick={() => handleRemoveTopic(topic.id)}
                style={Styles.removeButton}
              >
                X
              </button>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

const Styles = {
  mainContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    width: "100%",
    backgroundColor: "#f4f4f4",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    marginBottom: "15px",
  } as React.CSSProperties,
  container: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "15px",
    padding: "20px",
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  } as React.CSSProperties,
  toggleButton: {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "bold",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
  } as React.CSSProperties,
  addButton: {
    padding: "10px 20px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "bold",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
  } as React.CSSProperties,
  cardContainer: {
    position: "relative",
    width: "22%",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    overflow: "hidden",
  } as React.CSSProperties,
  removeButton: {
    position: "absolute",
    top: "10px",
    right: "10px",
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    borderRadius: "50%",
    cursor: "pointer",
    width: "25px",
    height: "25px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "14px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
  } as React.CSSProperties,
};
