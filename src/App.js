import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Game, Main } from "./pages/";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />} />
        {/* <Route path="/game" element={<Game />} /> */}
        <Route path="/game/:difficulty" element={<Game />} />
        <Route path="*" element={<div>Ошибка 404</div>} />
      </Routes>
    </div>
  );
}

export default App;
