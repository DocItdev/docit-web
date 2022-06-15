import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export interface TimerProps {
  hours: Number;
  minutes: Number;
  seconds: Number;
}

const Timer = ({ hours, minutes, seconds }: TimerProps) => (
  <Box component="span">
    {hours > 0 && (
      <Typography component="span">
        {hours < 10 ? hours.toString().padStart(2, "0") : String(hours)}:
      </Typography>
    )}
    <Typography component="span">
      {minutes < 10 ? minutes.toString().padStart(2, "0") : String(minutes)}:
    </Typography>
    <Typography component="span">
      {seconds < 10 ? seconds.toString().padStart(2, "0") : String(seconds)}
    </Typography>
  </Box>
);

export default Timer;
