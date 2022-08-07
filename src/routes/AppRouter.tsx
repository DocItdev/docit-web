import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login, DocIt } from "../pages";

import RequireAuth from "../components/common/RequireAuth";
import Loader from "../components/common/Loader";

export default function AppRouter() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path=":workspaceId"
            element={
              <RequireAuth>
                <DocIt />
              </RequireAuth>
            }
          >
            <Route
              path=":projectId"
              element={
                <RequireAuth>
                  <DocIt />
                </RequireAuth>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
