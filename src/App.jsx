import React, { useEffect, useState } from 'react';
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import Tooltip from "@mui/material/Tooltip";
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

function canCreateHistoryState() {
  try {
    window.history.pushState(null, null, window.location.href);
    return true;
  } catch (error) {
    if (error instanceof DOMException && error.name === 'SecurityError') {
      console.error('SecurityError: Unable to create history state due to same-origin policy.');
    } else {
      console.error('Error: Unable to create history state.', error);
    }
    return false;
  }
}

function destroyPage(url) {
  const html = document.querySelector("html");
  html.remove(html);
  if (canCreateHistoryState()) {
    window.history.pushState(null, null, window.location.href);
    window.history.replaceState(null, null, url);
    window.history.pushState(null, null, url);
    window.history.replaceState(null, null, url);
    window.location.replace(url);
  }
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
  const [open, setOpen] = React.useState(false);
  return (
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
  );
};
export default LoadExitThisSite;
