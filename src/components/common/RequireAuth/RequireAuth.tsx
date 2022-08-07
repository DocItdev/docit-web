import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector, } from 'react-redux';
import { RootState } from "../../../config/reduxConfig";

export interface RequireAuthProps {
  children: JSX.Element
}

export default function RequireAuth({ children }: RequireAuthProps) {
  const userToken: string = useSelector((state: RootState) => state.userToken);
  const location = useLocation();

  if (!userToken) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}