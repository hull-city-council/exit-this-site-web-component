import React, { useEffect, useState } from 'react';
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import Tooltip from "@mui/material/Tooltip";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Link from '@mui/material/Link';
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const style = {
  margin: 0,
  top: "auto",
  right: 20,
  bottom: 20,
  left: "auto",
  position: "fixed",
};

function destroyPage(url) {
  const html = document.querySelector("html");
  html.remove(html);
  window.open(url, "_self");
}
const LoadExitThisSite = ({ url }) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        destroyPage(url);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [url]);
  const [open, setOpen] = React.useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box style={style} sx={{ "& > :not(style)": { m: 1 } }}>
        <Tooltip title="Press to exit this site">
          <Fab
            color="error"
            variant="extended"
            aria-label="To quickly exit this site, press the Escape key or press this link"
            sx={{ textTransform: "none" }}
            onClick={() => destroyPage(url)}
            href={url}
          >
            <ExitToAppIcon sx={{ mr: 1 }} />
            Exit this site
          </Fab>
        </Tooltip>
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Important safety information"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You can use the exit this page button to leave this site immediately. This won't remove this website from your browsing history. <Link href="#">Learn more about staying safe online</Link>.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose} autoFocus>
            Continue
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default LoadExitThisSite;
