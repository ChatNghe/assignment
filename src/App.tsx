import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import RandomUser from "./pages/user/randomUser";

function App() {
  return (
    <Routes>
      <Route path={"users"} element={<RandomUser />} />
    </Routes>
  );
}
export default App;
