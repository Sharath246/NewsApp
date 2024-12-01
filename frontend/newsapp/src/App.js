import { Routes, Route } from "react-router";
import About from "./Onboarding/About/About";
import Login from "./Onboarding/Login/Login";
import Register from "./Onboarding/Register/Register";
import Landing from "./Onboarding/Landing/Landing";
import Home from "./Home/Home";
import Dashboard from "./Home/Dashboard";
import Error from "./Components/Error";
import AllNews from "./Home/AllNews";
import Topic from "./Home/Topics";
import TopicNews from "./Home/TopicNews";

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
        <Route path="topics" element={<Topic/>}/>
        <Route path="topicNews/:topic?" element={<TopicNews/>}/>
      </Route>
    </Routes>
  );
}

export default App;
