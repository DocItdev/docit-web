import { useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector, } from 'react-redux';
import { RootState } from "../config/reduxConfig";
import getRefreshToken from '../utils/common/getRefreshToken';
import { setToken, setUser } from "../ducks";
import { RefreshTokenResponse } from "../@types/User";


export default function useAuthEffect(): void {
  const navigate = useNavigate();
  const userToken: string = useSelector((state: RootState) => state.userToken);
  // const dispatch = useDispatch();
  // useEffect(()=>{
    
  //     const timeout = setInterval(async () => {
  //       //logic to set the token
  //       const data:RefreshTokenResponse = await getRefreshToken();
  //       dispatch(setToken(data.token))
  //       dispatch(setUser(data.user));
  //    }, 1000 * 60 * 15);
     
  //    return () => {
  //     clearInterval(timeout);
  //    }
   
  // },[userToken])

  useEffect(() => {
    if (userToken) {
      navigate('../docit', { replace: true });
    } else {
      navigate('../', { replace: true });
    }
  },[userToken])
}