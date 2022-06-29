import React, { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { Login, DocIt } from '../pages';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/docit" element={<DocIt />} />
      </Routes>
  </BrowserRouter>
  );
}