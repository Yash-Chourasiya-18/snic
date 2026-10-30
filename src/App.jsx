import { HashRouter, Routes, Route } from "react-router-dom";
import SearchPage from "./pages/SearchPage";
import ResultPage from "./pages/ResultPage";
import "./index.css";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/result/:name" element={<ResultPage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
