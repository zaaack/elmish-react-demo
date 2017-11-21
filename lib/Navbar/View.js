import { createElement } from "react";
import { printf, toText } from "../fable-core/String";
export function navButton(classy, href, faClass, txt) {
  return createElement("p", {
    className: "control"
  }, createElement("a", {
    className: toText(printf("button %s"))(classy),
    href: href
  }, createElement("span", {
    className: "icon"
  }, createElement("i", {
    className: toText(printf("fa %s"))(faClass)
  })), createElement("span", {}, txt)));
}
export const navButtons = createElement("span", {
  className: "nav-item"
}, createElement("div", {
  className: "field is-grouped"
}, navButton("twitter", "https://twitter.com/FableCompiler", "fa-twitter", "Twitter"), navButton("github", "https://github.com/fable-compiler/fable-elmish", "fa-github", "Fork me"), navButton("github", "https://gitter.im/fable-compiler/Fable", "fa-comments", "Gitter")));
export const root = createElement("nav", {
  className: "nav"
}, createElement("div", {
  className: "nav-left"
}, createElement("h1", {
  className: "nav-item is-brand title is-4"
}, "Elmishaaa")), createElement("div", {
  className: "nav-right"
}, navButtons));