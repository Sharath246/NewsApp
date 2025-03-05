import { Route } from "react-router";
import About from "./Onboarding/About/About.tsx";
import Login from "./Onboarding/Login/Login.tsx";
import Register from "./Onboarding/Register/Register.tsx";
import Home from "./Home/Home.tsx";
import Dashboard from "./Home/Dashboard.tsx";
import Error from "./Components/Error.tsx";
import AllNews from "./Home/AllNews.tsx";
import Topic from "./Home/Topics.tsx";
import TopicNews from "./Home/TopicNews.tsx";
import React from "react";
import Settings from "./Home/Profile/Settings/Settings.tsx";
import NotAuthorizedPage from "./Components/NotAuthorized.tsx";
import LikesAndBookmarks from "./Home/LikesAndBookmarks.tsx";
import DTLanding from "./DT/DTLanding.tsx";
import DateTasks from "./DT/DateTasks.tsx";
import Edutainment, { Games } from "./Home/Edutainment/Edutainment.tsx";
import PlaySudoku from "./Home/Edutainment/Sudoku/Play/PlaySudoku.tsx";
import CreateSudoku from "./Home/Edutainment/Sudoku/Create/CreateSudoku.tsx";

export default function NewsApp() {
  return (
    <React.Fragment>
      <Route path="/DT" element={<DTLanding />} />
      <Route path="/dateTasks" element={<DateTasks />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/about" element={<About />} />
      <Route path="/404Error" element={<Error />} />
      <Route path="/newsapp/notAuthorized" element={<NotAuthorizedPage />} />
      <Route path="/newsapp/:name?" element={<Dashboard />}>
        <Route index element={<Home />} />
        <Route path="l&b" element={<LikesAndBookmarks />} />
        <Route path="allNews" element={<AllNews />} />
        <Route path="play" element={<Edutainment />}>
          <Route index element={<Games />} />
          <Route path="sudoku" element={<PlaySudoku />} />
          <Route path="createSudoku" element={<CreateSudoku />} />
        </Route>
        <Route path="topics" element={<Topic />} />
        <Route path="topicNews/:topic?" element={<TopicNews />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </React.Fragment>
  );
}
