import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

//Pages
import AuthGuard from "./components/AuthGuard";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";


function App() {
  return (
    <Router>
      {/* <Layout> */}
      <Routes>
        <Route
          exact
          path="/"
          element={
            <AuthGuard>
              <Home />
            </AuthGuard>
          }
        />
        <Route exact path="/login" element={<Login />} />
        {/* <Route path="*" element={<NotFound />}/> */}
      </Routes>
      {/* </Layout> */}
    </Router>
  );
}

export default App;
