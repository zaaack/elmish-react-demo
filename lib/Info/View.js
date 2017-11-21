import { createElement } from "react";
export const root = createElement("div", {
  className: "content"
}, createElement("h1", {}, "About page"), createElement("p", {}, "This template is a simple application build with Fable + Elmish + React."));