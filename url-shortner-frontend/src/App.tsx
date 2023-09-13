import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Snip, SnipTable } from "./pages";

function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Snip />} />
          <Route path="/snipped-urls" element={<SnipTable />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
