import { useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import { useSelector, } from 'react-redux';
import { RootState } from "../config/reduxConfig";

export default function useAuthEffect(): void {
  const navigate = useNavigate();
  const userToken: string = useSelector((state: RootState) => state.userToken);
  console.log('userToken', userToken);
  useEffect(() => {
    if (userToken) {
      navigate('../docit', { replace: true });
    } else {
      navigate('../', { replace: true });
    }
  },[userToken])
}