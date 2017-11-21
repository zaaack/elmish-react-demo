import { createElement, Component as Component_1 } from "react";
import { setType } from "../fable-core/Symbol";
import _Symbol from "../fable-core/Symbol";
import { compareUnions, equals, extendInfo } from "../fable-core/Util";
import { Msg as Msg_1 } from "./Types";
import { printf, toText } from "../fable-core/String";
export const Component = Component_1;
export class TinyElmishComponent extends Component_1 {
  [_Symbol.reflection]() {
    return extendInfo(TinyElmishComponent, {
      type: "Home.View.TinyElmishComponent",
      interfaces: [],
      properties: {}
    });
  }

  constructor(props) {
    super(props);
  }

  dispatch(msg) {
    (arg00 => {
      this.setState(arg00);
    })(((arg00_1, arg10) => this.update(arg00_1, arg10))(msg, this.state));
  }

}
setType("Home.View.TinyElmishComponent", TinyElmishComponent);
export class Msg {
  constructor(tag, data) {
    this.tag = tag;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Home.View.Msg",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["Increase"], ["Decrease"]]
    };
  }

  Equals(other) {
    return this === other || this.tag === other.tag && equals(this.data, other.data);
  }

  CompareTo(other) {
    return compareUnions(this, other) | 0;
  }

}
setType("Home.View.Msg", Msg);
export class Counter extends TinyElmishComponent {
  [_Symbol.reflection]() {
    return extendInfo(Counter, {
      type: "Home.View.Counter",
      interfaces: [],
      properties: {}
    });
  }

  constructor(props) {
    super(props);
    this["init@71-1"] = 1;
    this.state = {
      counter: 0
    };
  }

  update(msg, state) {
    if (msg.tag === 1) {
      return {
        counter: state.counter - 1
      };
    } else {
      return {
        counter: state.counter + 1
      };
    }
  }

  render() {
    return createElement("div", {}, createElement("button", {
      onClick: _arg1 => {
        this.dispatch(new Msg(0));
      }
    }, "+"), createElement("span", {}, this.state.counter.toString()), createElement("button", {
      onClick: _arg2 => {
        this.dispatch(new Msg(1));
      }
    }, "-"));
  }

}
setType("Home.View.Counter", Counter);
export function root(model, dispatch) {
  return createElement("div", {}, createElement("p", {
    className: "control"
  }, createElement("input", {
    className: "input",
    type: "text",
    placeholder: "Type your name",
    value: model,
    autoFocus: true,
    onChange: function (ev) {
      dispatch(new Msg_1(0, ev.target.value));
    }
  })), createElement("br", {}), createElement("span", {}, toText(printf("Hello %s"))(model)), createElement("button", {
    onClick: function (e) {
      dispatch(new Msg_1(0, ""));
    }
  }, "Clean"), createElement(function (arg00) {
    return new Counter(arg00);
  }, {}));
}