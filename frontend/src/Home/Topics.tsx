import Card from "../Components/Card.tsx";
import React from "react";
export default function Topic() {
  const news_topics = [
    {
      id: "0",
      topic: "Sports",
      image_url:
        "https://images.pexels.com/photos/8007408/pexels-photo-8007408.jpeg",
    },
    {
      id: "1",
      topic: "Technology",
      image_url:
        "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg",
    },
    {
      id: "2",
      topic: "Science",
      image_url:
        "https://images.pexels.com/photos/256262/pexels-photo-256262.jpeg",
    },
    {
      id: "3",
      topic: "Politics",
      image_url:
        "https://images.pexels.com/photos/1550337/pexels-photo-1550337.jpeg",
    },
    {
      id: "4",
      topic: "Business",
      image_url:
        "https://images.pexels.com/photos/3184416/pexels-photo-3184416.jpeg",
    },
    {
      id: "5",
      topic: "Health",
      image_url:
        "https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg",
    },
    {
      id: "6",
      topic: "Education",
      image_url:
        "https://images.pexels.com/photos/301926/pexels-photo-301926.jpeg",
    },
    {
      id: "7",
      topic: "Travel",
      image_url:
        "https://images.pexels.com/photos/2245436/pexels-photo-2245436.png",
    },
    {
      id: "8",
      topic: "Entertainment",
      image_url:
        "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg",
    },
    {
      id: "9",
      topic: "Environment",
      image_url:
        "https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg",
    },
    {
      id: "10",
      topic: "Crime",
      image_url:
        "https://images.pexels.com/photos/923681/pexels-photo-923681.jpeg",
    },
    {
      id: "11",
      topic: "Fashion",
      image_url:
        "https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg",
    },
    {
      id: "12",
      topic: "Movie",
      image_url:
        "https://images.pexels.com/photos/6235464/pexels-photo-6235464.jpeg",
    },
    {
      id: "13",
      topic: "Economy",
      image_url:
        "https://images.pexels.com/photos/210600/pexels-photo-210600.jpeg",
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
      }}
    >
      {news_topics.map((topic) => {
        return (
          <Card
            key={topic.id}
            title={topic.topic}
            imageURL={topic.image_url}
            link={`/dashboard/topicNews/${topic.topic}`}
            modal={false}
          />
        );
      })}
    </div>
  );
}
