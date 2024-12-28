import { Routes, Route } from "react-router";
import About from "./Onboarding/About/About.tsx";
import Login from "./Onboarding/Login/Login.tsx";
import Register from "./Onboarding/Register/Register.tsx";
import Landing from "./Onboarding/Landing/Landing.tsx";
import Home from "./Home/Home.tsx";
import Dashboard from "./Home/Dashboard.tsx";
import Error from "./Components/Error.tsx";
import AllNews from "./Home/AllNews.tsx";
import Topic from "./Home/Topics.tsx";
import TopicNews from "./Home/TopicNews.tsx";
import React from "react";
import Settings from "./Home/Settings/Settings.tsx";
import NotAuthorizedPage from "./Components/NotAuthorized.tsx";
import Sudoku from "./Components/Sudoku.tsx";
import LikesAndBookmarks from "./Home/LikesAndBookmarks.tsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/about" element={<About />} />
      <Route path="/404Error" element={<Error />} />
      <Route path="notAuthorized" element={<NotAuthorizedPage />} />
      <Route path="/dashboard" element={<Dashboard />}>
        <Route index element={<Home />} />
        <Route path="l&b" element={<LikesAndBookmarks />} />
        <Route path="allNews" element={<AllNews />} />
        <Route path="Sudoku" element={<Sudoku initialArray={[]} />} />
        <Route path="topics" element={<Topic />} />
        <Route path="topicNews/:topic?" element={<TopicNews />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

export default App;
