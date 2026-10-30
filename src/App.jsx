import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchPage from "./pages/SearchPage";
import ResultPage from "./pages/ResultPage";
import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/result/:name" element={<ResultPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
