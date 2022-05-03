import { useEffect, useState } from "react";
import { useSelector, } from 'react-redux';
import getFile from "../utils/mediaStorage/getFile";
import { AsyncStatus } from "../utils/common/constants";


export default function useFile(filePath) {
  const userToken = useSelector(state => state.userToken);
    const [data, setData] = useState(null);
    const [error, setError] = useState("");
    const [status, setStatus] = useState(AsyncStatus.IDLE);
    
  useEffect(() => {
    const getUploadedFile = async () => {
        try {
            setStatus(AsyncStatus.LOADING);
            const file = await getFile(userToken, filePath);
            setData(file)
            setStatus(AsyncStatus.SUCCESS);
        } catch (err) {   
            setError(err.message);
            setStatus(AsyncStatus.FAILURE);
        }
    };
    getUploadedFile();

  },[userToken, filePath]);
  return {
      ...data,
      error,
      status,
      isLoading: status === AsyncStatus.LOADING
  }
}