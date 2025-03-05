import { Routes, Route } from "react-router";
import NewsApp from "./NewsApp/newsApp.tsx";
import ProjectList from "./ProjectList.tsx";
import DigitApp from "./DigitRecogniser/DigitApp.tsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<ProjectList />} />
      {NewsApp()}
      {DigitApp()}
    </Routes>
  );
}

export default App;
