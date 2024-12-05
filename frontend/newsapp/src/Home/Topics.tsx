import Card from "../Components/Card.tsx";
import React, { useEffect } from "react";
export default function Topic() {
  const news_topics = [
    {
      id: "1",
      topic: "Technology",
      image_url:
        "https://www.google.com/imgres?q=technology&imgurl=https%3A%2F%2Fwww.globalts.com%2Fimages%2Feasyblog_shared%2FOctober_2023%2F10-25-23%2Fb2ap3_thumbnail_modernTechnology_620977929_400.jpg&imgrefurl=https%3A%2F%2Fwww.globalts.com%2Fblog%2Fdo-you-understand-modern-technology&docid=ukOhRh9Evka7BM&tbnid=mNWUDAQYZ35uvM&vet=12ahUKEwiek7H43YaKAxWDrlYBHdAcIigQM3oECBkQAA..i&w=400&h=400&hcb=2&ved=2ahUKEwiek7H43YaKAxWDrlYBHdAcIigQM3oECBkQAA",
    },
    {
      id: "2",
      topic: "Science",
      image_url:
        "https://www.pexels.com/photo/science-laboratory-equipment-chemistry-736726",
    },
    {
      id: "3",
      topic: "Politics",
      image_url:
        "https://www.pexels.com/photo/politics-government-election-voting-736220",
    },
    {
      id: "4",
      topic: "Economy and Business",
      image_url:
        "https://www.pexels.com/photo/economy-finance-money-coins-468701",
    },
    {
      id: "5",
      topic: "Health and Wellness",
      image_url:
        "https://www.pexels.com/photo/health-wellness-fitness-gym-736229",
    },
    {
      id: "6",
      topic: "Education",
      image_url:
        "https://www.pexels.com/photo/education-student-learning-knowledge-736219",
    },
    {
      id: "7",
      topic: "Travel",
      image_url:
        "https://www.pexels.com/photo/travel-adventure-wanderlust-vacation-736221",
    },
    {
      id: "8",
      topic: "Entertainment",
      image_url:
        "https://www.pexels.com/photo/entertainment-fun-party-celebration-736222",
    },
    {
      id: "9",
      topic: "Environment",
      image_url:
        "https://www.pexels.com/photo/environment-nature-landscape-scenery-736223",
    },
    {
      id: "10",
      topic: "Crime and Law",
      image_url: "https://www.pexels.com/photo/crime-law-justice-court-736224",
    },
    {
      id: "11",
      topic: "Fashion",
      image_url: "https://www.pexels.com/photo/crime-law-justice-court-736224",
    },
    {
      id: "12",
      topic: "Movies",
      image_url: "https://www.pexels.com/photo/crime-law-justice-court-736224",
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
