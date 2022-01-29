import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import { Login, DocIt } from '../pages';

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/docit">
          <DocIt />
        </Route>
        <Route path="/">
          <Login />
        </Route>
      </Routes>
  </Router>
  );
}