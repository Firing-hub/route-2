import React from "react";
import Register from "./pages/register/Register";
import Home from "./pages/home/Home";
import Header from "./component/header/Header"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Legal from "./pages/legal/Legal"

const App = () => {
  return (
    <BrowserRouter>
    <Header></Header>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/legal" element={<Legal />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
