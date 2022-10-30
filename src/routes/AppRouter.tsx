import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import DocItLayout from "../pages/DocItLayout";
import Document from "../pages/DocumentContainer";
import Empty from "../pages/Empty";
import CreateWorkspace from "../pages/CreateWorkspace";
import WorkspaceMembers from "../pages/WorkspaceMembers";

import RequireAuth from "../components/common/RequireAuth";

export default function AppRouter() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
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
              path="workspaces"
              element={
                <RequireAuth>
                  <CreateWorkspace />
                </RequireAuth>
              }
            />
            <Route
              path="members"
              element={
                <RequireAuth>
                  <WorkspaceMembers />
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
