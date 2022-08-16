import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login, DocItLayout, Document, Empty } from "../pages";

import RequireAuth from "../components/common/RequireAuth";

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
                <DocItLayout />
              </RequireAuth>
            }
          >
            <Route
              path=":docId"
              element={
                <RequireAuth>
                  <Document />
                </RequireAuth>
              }
            />
            <Route
            path="*"
            element={
              <RequireAuth>
                <Empty />
              </RequireAuth>
            }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
