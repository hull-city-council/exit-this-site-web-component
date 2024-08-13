import React from "react";
import r2wc from "@r2wc/react-to-web-component";
import LoadExitThisPage from "./App";

const exitThisPage = r2wc(LoadExitThisPage, { props: { url: "string" } });
customElements.define("gov-metric-rating", exitThisPage);
