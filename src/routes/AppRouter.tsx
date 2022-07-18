import React, { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { Login, DocIt } from '../pages';
import getRefreshToken from '../utils/common/getRefreshToken';
import { setToken, setUser } from "../ducks";
import { RefreshTokenResponse } from "../@types/User";
import { useDispatch, useSelector, } from 'react-redux';
import { RootState } from "../config/reduxConfig";

export default function AppRouter() {

  const userToken: string = useSelector((state: RootState) => state.userToken);
  const dispatch = useDispatch();

  useEffect( ()=>{
    console.log(1)
   const callRefresh = async () => {
    const data:RefreshTokenResponse = await getRefreshToken();
    try {
      if(data){
        console.log("hello world")
        dispatch(setToken(data.token))
        dispatch(setUser(data.user));
      }
    } catch (error) {
      
    }
   
    } 

    callRefresh();
    
  }, [])

  useEffect(()=>{
    console.log(2)
    
      const timeout = setInterval(async () => {
        //logic to set the token
        const data:RefreshTokenResponse = await getRefreshToken();
        if (data){
          console.log("labas")
          dispatch(setToken(data.token))
          dispatch(setUser(data.user));
        }else{
          console.log("poop")
        }
         
     }, 1000 * 4);
     
     return () => {
      clearInterval(timeout);
     }
   
  },[userToken])



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