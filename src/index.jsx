import React from "react";
import r2wc from "@r2wc/react-to-web-component";
import LoadExitThisSite from "./App";

const exitThisSite = r2wc(LoadExitThisSite, { props: { url: "string" } });
customElements.define("exit-this-site", exitThisSite);
