import * as React from "react";
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
function destroyPage() {
  const html = document.querySelector("html");
  html.remove(html);
}
const LoadExitThisSite = ({ url }) => {
  return (
    <Box style={style} sx={{ "& > :not(style)": { m: 1 } }}>
      <Tooltip title="Press to exit this site">
        <Fab
          color="error"
          variant="extended"
          aria-label="exit this site"
          sx={{ textTransform: "none" }}
          onClick={destroyPage}
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
