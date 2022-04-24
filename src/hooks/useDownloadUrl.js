import { useEffect, useState } from "react";
import { useSelector, } from 'react-redux';
import getFileDownloadUrl from "../utils/mediaStorage/getFileDownloadUrl";
import { AsyncStatus } from "../utils/common/constants";


export default function useDownloadUrl(filePath) {
  const userToken = useSelector(state => state.userToken);
    const [mediaDownloadUrl, setMediaDownloadUrl] = useState("");
    const [error, setError] = useState("");
    const [status, setStatus] = useState(AsyncStatus.IDLE);
    
  useEffect(() => {
    const getDownloadUrl = async () => {
        try {
            setStatus(AsyncStatus.LOADING);
            const data = await getFileDownloadUrl(userToken, filePath);
            setMediaDownloadUrl(data.mediaDownloadUrl);
            setStatus(AsyncStatus.SUCCESS);
        } catch (err) {   
            setError(err.message);
            setStatus(AsyncStatus.FAILURE);
        }
    };
    getDownloadUrl();

  },[userToken, filePath]);
  return {
      mediaDownloadUrl,
      error,
      status,
      isLoading: status === AsyncStatus.LOADING
  }
}