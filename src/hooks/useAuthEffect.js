import { useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import { useSelector, } from 'react-redux';


export default function useAuthEffect() {
  const navigate = useNavigate();
  const userToken = useSelector(state => state.userToken);
  useEffect(() => {
    if (userToken) {
      navigate('../docit', { replace: true });
    } else {
      navigate('../', { replace: true });
    }
  },[userToken])
}