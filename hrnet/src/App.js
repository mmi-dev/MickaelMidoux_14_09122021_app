import "./App.css";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

import Home from "./pages/Home";
import Employees from "./pages/Employees";
import Error from "./pages/Error.js";

function App() {
  return (
    <div className="App">
      <Header />
      <main id="main" className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/*" element={<Error status="" message="" />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
