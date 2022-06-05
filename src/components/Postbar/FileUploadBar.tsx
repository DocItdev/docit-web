import {
  useEffect,
  useState,
  useCallback,
  useMemo,
  CSSProperties,
} from "react";
import { useDropzone } from "react-dropzone";
import { useDispatch } from "react-redux";

import { setFileName, setMediaBlobUrl, setMediaType } from "../../ducks";
import { MediaTypes } from "../../utils/common/constants";

const baseStyle = {
  alignItems: "center",
  padding: "100px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const focusedStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

export interface FileUploadBarProps {
  start: boolean;
  resetTriggerFeature: () => void;
}

export default function FileUploadBar({
  start,
  resetTriggerFeature,
}: FileUploadBarProps) {
  const [show, setShow] = useState<boolean>(false); // defualt should be false

  const dispatch = useDispatch();

  useEffect(() => {
    if (start) {
      setShow(true);
    } else {
      setShow(false);
      resetTriggerFeature();
    }
  }, [start]);

  const onDrop = useCallback((acceptedFile: File[]) => {
    //take the first file
    const url = URL.createObjectURL(acceptedFile[0]);
    dispatch(setMediaBlobUrl(url));
    dispatch(setMediaType(MediaTypes.FILE));
    dispatch(setFileName(acceptedFile[0].name));
    setShow(false);
  }, []);

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({ onDrop });

  const style: CSSProperties = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  return !show ? (
    <div />
  ) : (
    <div>
      Upload File
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop a file here, or click to select a file</p>
      </div>
    </div>
  );
}

//TODO look into propTypes
// RecorderBar.propTypes = {
//   start: PropTypes.bool.isRequired,
//   setOpen: PropTypes.func,
// };

// RecorderBar.defaultProps = {
//   setOpen: () => {},
// };
