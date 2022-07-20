import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login, DocIt } from "../pages";
import getRefreshToken from "../utils/common/getRefreshToken";
import { setToken, setTokenExpire, setUser, setWorkspace } from "../ducks";
import { RefreshTokenResponse } from "../@types/User";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../config/reduxConfig";
import { WorkspaceType } from "../@types/Workspace";
import { useQuery } from "react-query";

export default function AppRouter() {
  const tokenExpire: number = useSelector(
    (state: RootState) => state.tokenExpiresIn
  );
  const dispatch = useDispatch();
  const { data } = useQuery("refreshToken", () => getRefreshToken(), {
    staleTime: tokenExpire,
  });
  useEffect(() => {
    if (data) {
      dispatch(setToken(data.token));
      dispatch(setTokenExpire(data.expiresIn));
      dispatch(setUser(data.user));
      const workspace: WorkspaceType = JSON.parse(
        localStorage.getItem("workspace")
      );
      dispatch(setWorkspace(workspace));
    }
  }, [data]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/docit" element={<DocIt />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
