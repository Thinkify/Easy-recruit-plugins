import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Find from "./pages/Find";
import { AuthProvider } from "./context/Auth";
import PrivateRoute from "./HOC/PrivateRoute";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className={'App h-screen'}>
          <PrivateRoute exact path="/find" component={Find} />
          <PrivateRoute exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
