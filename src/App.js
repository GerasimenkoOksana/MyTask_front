import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import NaviBar from "./components/NaviBar";
import Footer from "./components/Footer";
import Error404 from "./components/Error404";
import {Home} from "./components/Home";
import ColumnList from "./components/ColumnList";
import {UserRoutes} from "./components/UserRoutes";

function App() {
  const userRoutes = UserRoutes(true)
  return (
      <Router>
          <NaviBar/>
          {userRoutes}
        <Footer/>
      </Router>
  );
}

export default App;

