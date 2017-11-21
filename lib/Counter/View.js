import { createElement } from "react";
import { createObj } from "../fable-core/Util";
import { ofArray } from "../fable-core/List";
import { Props } from "../fable/Fable.Helpers.React";
import { printf, toText } from "../fable-core/String";
import { Msg } from "./Types";
export function simpleButton(txt, action, dispatch) {
  return createElement("div", {
    className: "column is-narrow"
  }, createElement("a", {
    className: "button",
    onClick: function (_arg1) {
      dispatch(action);
    }
  }, txt));
}
export function root(model, dispatch) {
  return createElement("div", {
    className: "columns is-vcentered"
  }, createElement("div", {
    className: "column"
  }), createElement("div", createObj(ofArray([new Props.HTMLAttr(22, "column is-narrow"), ["style", {
    width: "170px"
  }]]), 1), toText(printf("Counter value: %i"))(model)), simpleButton("+1", new Msg(0), dispatch), simpleButton("-1", new Msg(1), dispatch), simpleButton("Reset", new Msg(2), dispatch), createElement("div", {
    className: "column"
  }));
}