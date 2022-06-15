import { useEffect, useState } from "react";
import { useSelector, } from 'react-redux';
import getFile from "../utils/mediaStorage/getFile";
import { AsyncStatus } from "../utils/common/constants";
import { RootState } from "../config/reduxConfig";

export default function useFile(filePath: string) {
  const userToken: string = useSelector((state: RootState) => state.userToken);
    const [data, setData] = useState(null);
    const [error, setError] = useState<string>("");
    const [status, setStatus] = useState<AsyncStatus>(AsyncStatus.IDLE);
    
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