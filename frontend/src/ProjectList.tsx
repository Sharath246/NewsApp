import React from "react";
import "./ProjectList.css";
import { useNavigate } from "react-router-dom";

const projects = [
  {
    name: "News App",
    description: "A news aggregator with ML-powered recommendations.",
    to: "/newsapp",
  },
  {
    name: "Chess App",
    description: "A React-based chess application.",
    to: "/chess",
  },
  {
    name: "Handwritten Digit Recognizer",
    description: "A React and ML project for recognizing handwritten digits.",
    to: "/digitRecognizer",
  },
];

const ProjectList = () => {
  const navigate = useNavigate();
  return (
    <div className="ProjectList-container">
      {projects.map((project, index) => (
        <div
          key={index}
          className="ProjectList-card"
          onClick={() => {
            navigate(project.to);
          }}
        >
          <h2 className="ProjectList-title">{project.name}</h2>
          <p className="ProjectList-description">{project.description}</p>
        </div>
      ))}
    </div>
  );
};

export default ProjectList;
