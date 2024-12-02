import Card from "../Components/Card.tsx";
import React from "react";
export default function Topic() {
  const news_topics = [
    {
      topic: "Technology",
      image_url:
        "https://www.google.com/imgres?q=technology&imgurl=https%3A%2F%2Fwww.globalts.com%2Fimages%2Feasyblog_shared%2FOctober_2023%2F10-25-23%2Fb2ap3_thumbnail_modernTechnology_620977929_400.jpg&imgrefurl=https%3A%2F%2Fwww.globalts.com%2Fblog%2Fdo-you-understand-modern-technology&docid=ukOhRh9Evka7BM&tbnid=mNWUDAQYZ35uvM&vet=12ahUKEwiek7H43YaKAxWDrlYBHdAcIigQM3oECBkQAA..i&w=400&h=400&hcb=2&ved=2ahUKEwiek7H43YaKAxWDrlYBHdAcIigQM3oECBkQAA",
    },
    {
      topic: "Science",
      image_url:
        "https://www.pexels.com/photo/science-laboratory-equipment-chemistry-736726",
    },
    {
      topic: "Politics",
      image_url:
        "https://www.pexels.com/photo/politics-government-election-voting-736220",
    },
    {
      topic: "Economy and Business",
      image_url:
        "https://www.pexels.com/photo/economy-finance-money-coins-468701",
    },
    {
      topic: "Health and Wellness",
      image_url:
        "https://www.pexels.com/photo/health-wellness-fitness-gym-736229",
    },
    {
      topic: "Education",
      image_url:
        "https://www.pexels.com/photo/education-student-learning-knowledge-736219",
    },
    {
      topic: "Travel",
      image_url:
        "https://www.pexels.com/photo/travel-adventure-wanderlust-vacation-736221",
    },
    {
      topic: "Entertainment",
      image_url:
        "https://www.pexels.com/photo/entertainment-fun-party-celebration-736222",
    },
    {
      topic: "Environment",
      image_url:
        "https://www.pexels.com/photo/environment-nature-landscape-scenery-736223",
    },
    {
      topic: "Crime and Law",
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
