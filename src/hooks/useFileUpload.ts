import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useMutation } from "react-query";
import { RootState } from "../config/reduxConfig";
import uploadMediaFile from "../utils/mediaStorage/uploadMediaFile";
import { FileRecordType } from "../@types/FileRecord";
import { AxiosError } from "axios";

export interface FileUpload {
  fileUrl: string;
  fileName: string;
}

export default function useFileUpload() {
  const userToken: string = useSelector((state: RootState) => state.userToken);
  const { docId } = useParams();
  const { mutate, isLoading, error, isError } = useMutation<
   FileRecordType,
   AxiosError,
   FileUpload,
   unknown
  >(
    ({ fileUrl, fileName }) => uploadMediaFile(userToken, fileUrl, docId, fileName)
    );

  return {
    isError,
    isLoading,
    error,
    upload: mutate,
  };
}
