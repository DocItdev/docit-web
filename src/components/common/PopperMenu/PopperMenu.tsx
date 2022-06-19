import React, {
  useState,
  useRef,
  useEffect,
  SyntheticEvent,
  MouseEvent,
  FC,
} from "react";
import IconButton from "@mui/material/IconButton";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export interface MenuItem {
  title: string;
  onClick: (event: MouseEvent<HTMLLIElement, globalThis.MouseEvent>) => void;
  icon: FC;
}

export interface PopperMenuProps {
  menuItems: MenuItem[];
}

export default function PopperMenu({ menuItems }: PopperMenuProps) {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleToggle = (event: SyntheticEvent) => {
    event.stopPropagation();
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <>
      <IconButton
        ref={anchorRef}
        id="composition-button"
        aria-controls={open ? "composition-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        sx={{
          color: "white",
          borderRadius: "5px",
          padding: 0,
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.3)",
          },
        }}
      >
        <MoreVertIcon />
      </IconButton>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        placement="bottom-start"
        transition
        disablePortal
        style={{ zIndex: 5 }}
        onBlur={(e) => handleClose(e)}
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom-start" ? "left top" : "left bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="composition-menu"
                  aria-labelledby="composition-button"
                  onKeyDown={(e) => handleListKeyDown(e)}
                >
                  {menuItems?.map(({ title, onClick, icon: MuiIcon }) => (
                    <MenuItem
                      key={title}
                      onClick={(e) => {
                        e.stopPropagation();
                        onClick(e);
                        handleClose(e);
                      }}
                    >
                      <ListItemIcon>
                        <MuiIcon />
                      </ListItemIcon>
                      <Typography variant="inherit">{title}</Typography>
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
}
