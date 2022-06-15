import Grid from "@mui/material/Grid";
import Popover from "@mui/material/Popover";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import PropTypes from 'prop-types';
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import { Feature } from "../../@types/Feature";

export interface MediaBarProps {
  features: Feature[];
}

export default function MediaBar({ features }: MediaBarProps) {
  return (
    <>
      {features.map(({ featureDescription, featureName, icon, onClick }) => (
        <Grid item key={featureName}>
          <PopupState variant="popover" popupId="demo-popup-popover">
            {(popupState) => (
              <div>
                <button
                  className="btn-lg"
                  {...bindTrigger(popupState)}
                  onClick={onClick ? onClick: bindTrigger(popupState).onClick}
                  style={{
                    borderRadius: "5px",
                    borderWidth: "0px",
                    margin: "0px 1px 0px 1px",
                    background: "transparent",
                  }}
                >
                  <i className={icon}></i>
                </button>
                <Popover
                  {...bindPopover(popupState)}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                >
                  <Card sx={{ minWidth: 275, maxWidth: 275, padding: "15px" }}>
                    <Typography variant="h5" component="div">
                      {featureName}
                    </Typography>
                    <Typography sx={{ p: 2 }}>{featureDescription}</Typography>
                  </Card>
                </Popover>
              </div>
            )}
          </PopupState>
        </Grid>
      ))}
    </>
  );
}

MediaBar.propTypes = {
  features: PropTypes.arrayOf(PropTypes.shape({
    featureDescription: PropTypes.string.isRequired,
    featureName: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    onClick: PropTypes.func,
  })),
};
