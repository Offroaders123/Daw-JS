/* @refresh reload */
import { render } from "solid-js/web";
import App from "./App.js";
import "./index.css";

const root: HTMLDivElement = document.querySelector("#root")!;

render(() => <App/>, root);