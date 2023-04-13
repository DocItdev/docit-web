import { useSelector, } from 'react-redux';
import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import getFile from "../utils/mediaStorage/getFile";
import { RootState } from "../config/reduxConfig";

export interface S3FileMetadata {
  mediaDownloadUrl: string;
}

export default function useFile(fileKey: string) {
  const userToken: string = useSelector((state: RootState) => state.userToken);
  const tokenExpire: number = useSelector(
    (state: RootState) => state.tokenExpiresIn
  );
  const query = useQuery<S3FileMetadata, AxiosError>(fileKey, () => getFile(userToken, fileKey), {
    refetchOnWindowFocus: false,
    staleTime: tokenExpire,
    enabled: fileKey !== undefined || fileKey !== null || fileKey !== '',
    suspense: true,
    useErrorBoundary: false
  });

  return query;
}