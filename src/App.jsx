import React, { useEffect, useState, useMemo } from 'react';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  Box,
  Fab,
  Tooltip,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import Link from '@mui/material/Link';
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";


const LoadExitThisSite = ({ url, info_url, container }) => {

  function destroyPage(url) {
  const html = document.querySelector("html");
  html.remove(html);
  window.open(url, "_self");
}

  const shadowRootElement = document.createElement("div");
  const shadowModal = document.createElement("div");
  shadowModal.setAttribute("id", "modal-alert");
  container.appendChild(shadowRootElement);
  container.appendChild(shadowModal);

  const style = {
    margin: 0,
    top: "auto",
    right: 20,
    bottom: 20,
    left: "auto",
    position: "fixed",
  };

  const shadowTheme = createTheme({
    palette: {
      mode: "light"
    },
    components: {
      MuiPopover: {
        defaultProps: {
          container: shadowRootElement
        }
      },
      MuiPopper: {
        defaultProps: {
          container: shadowRootElement
        }
      },
      MuiModal: {
        defaultProps: {
          container: shadowModal
        }
      }
    }
  });

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        destroyPage(url);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [url]);

  const [showSafetyDialog] = useState(() => {
    const currentValue = localStorage.getItem("showSafetyDialog");
    return currentValue === null ? true : JSON.parse(currentValue);
  });

  const handleClose = () => {
    if (container.contains(shadowModal)){
      container.removeChild(shadowModal);
      document.body.style.overflow = "";
    }
    localStorage.setItem("showSafetyDialog", false);
  };

  const cache = useMemo(() => createCache({ container, key: "css", prepend: true }), [container])

  return (
    <>
      <CacheProvider value={cache}>
        <ThemeProvider theme={shadowTheme}>
          <Box style={style} sx={{ "& > :not(style)": { m: 1 } }} id="button-box">
            <Tooltip title="Press to exit this site"
                slotProps={{
                  container: document.getElementById("button-box")
                }}
            
            >
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
            open={showSafetyDialog}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            
          >
            <DialogTitle id="alert-dialog-title">
              {"Important safety information"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                You can use the exit this page button to leave this site immediately. This won't remove this website from your browsing history. <Link href={info_url}>Learn more about staying safe online</Link>.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button variant="contained" onClick={handleClose} autoFocus>
                Continue
              </Button>
            </DialogActions>
          </Dialog>
        </ThemeProvider>
      </CacheProvider>
    </>
  );
};
export default LoadExitThisSite;
