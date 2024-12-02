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

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/about" element={<About />} />
      <Route path="/404Error" element={<Error />} />
      <Route path="/dashboard" element={<Dashboard />}>
        <Route index element={<Home />} />
        <Route path=":name?" element={<Home />} />
        <Route path="allNews" element={<AllNews />} />
        <Route path=":name/allNews" element={<AllNews />} />
        <Route path="topics" element={<Topic />} />
        <Route path="topicNews/:topic?" element={<TopicNews />} />
      </Route>
    </Routes>
  );
}

export default App;
