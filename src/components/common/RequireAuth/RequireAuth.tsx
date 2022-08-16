import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from "../../../config/reduxConfig";
import getRefreshToken from "../../../utils/common/getRefreshToken";
import { setToken, setTokenExpire, setUser } from "../../../ducks";
import { RefreshTokenResponse } from "../../../@types/User";
import { useQuery } from "react-query";
import { AxiosError } from "axios";
import Loader from '../Loader';

export interface RequireAuthProps {
  children: JSX.Element
}

export default function RequireAuth({ children }: RequireAuthProps) {
  const userToken: string = useSelector((state: RootState) => state.userToken);
  const location = useLocation();
  const tokenExpire: number = useSelector(
    (state: RootState) => state.tokenExpiresIn
  );
  const dispatch = useDispatch();
  const { isLoading, isError } = useQuery<RefreshTokenResponse, AxiosError>(
    "refreshToken",
    () => getRefreshToken(),
    {
      staleTime: tokenExpire,
      retry: false,
      onSuccess: (data) => {
        dispatch(setToken(data.token));
        dispatch(setTokenExpire(data.expiresIn));
        dispatch(setUser(data.user));
      }
    }
  );

  if(isLoading && !isError) {
    return <Loader />
  }

  if (!userToken) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}