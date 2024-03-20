import React, { useState } from "react";
import Register from "./pages/register/Register";
import Home from "./pages/home/Home";
import Header from "./component/header/Header"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Legal from "./pages/legal/Legal"
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

const App = () => {
  const [user, setUser] = useState(null);
  onAuthStateChanged(auth, (credentialUser) => {
    setUser(credentialUser);
  })
  return (
    <BrowserRouter>
    <Header></Header>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/legal" element={user ? <Legal /> : <Register/>} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
