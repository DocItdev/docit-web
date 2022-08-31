import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 660,
  height: 825,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  padding: 0
};

export default function FeedbackModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen} style={{color:"whitesmoke"}}>Advice - Bugs - Feeback </Button>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={style}>
          <iframe 
            src="https://docs.google.com/forms/d/e/1FAIpQLSfY4KnVwromp_12ccYfSLhGEdGgiOCVSQGV2wy2xXgDESHDTw/viewform?embedded=true" 
            width="640" 
            height="825" 
            frameBorder="0" 
          >
              Loading…
          </iframe>
        </Box>
      </Modal>
    </div>
  );
}
