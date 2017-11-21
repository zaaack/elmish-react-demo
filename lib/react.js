import { createElement, Component } from "react";
import { setType } from "./fable-core/Symbol";
import _Symbol from "./fable-core/Symbol";
import { createAtom, extendInfo } from "./fable-core/Util";
import { printf, toConsole } from "./fable-core/String";
import { defaultArg, getValue } from "./fable-core/Option";
import { Common } from "./common";
import { render } from "react-dom";
import { Program as Program_1 } from "./fable/program";
export const AppComponents = function (__exports) {
  const App = __exports.App = class App extends Component {
    [_Symbol.reflection]() {
      return extendInfo(App, {
        type: "Elmish.React.AppComponents.App",
        interfaces: [],
        properties: {}
      });
    }

    constructor(props) {
      super(props);
      this["init@20"] = 1;
      this.state = {
        view: null
      };
      props.getInternalSetState((() => {
        const objectArg = this;
        return arg00 => {
          objectArg.setState(arg00);
        };
      })());
    }

    render() {
      toConsole(printf("render"));
      return this.state.view;
    }

  };
  setType("Elmish.React.AppComponents.App", App);
  return __exports;
}({});
export const Program = function (__exports) {
  let setInternalState = createAtom(null);

  const withReact = __exports.withReact = function (placeholderId, program) {
    const setState_1 = function (model, dispatch) {
      let lastModel = null;

      if (setInternalState() == null) {
        throw new Error("withReact init failed.");
      } else {
        const setState = getValue(setInternalState());
        const hasUpdate = defaultArg(defaultArg(lastModel, null, function (a) {
          return !(model === a);
        }()), true);
        toConsole(printf("%A"))(hasUpdate);
        const view = Common.lazyView2With(function (a_1, b) {
          return a_1 === b;
        }, program.view, model, dispatch);
        setState({
          view: view
        });
      }
    };

    const props = {
      getInternalSetState: function (setState_2) {
        return setInternalState(setState_2);
      }
    };
    const app = createElement(AppComponents.App, props);
    render(app, document.getElementById(placeholderId));
    return new Program_1(program.init, program.update, program.subscribe, program.view, setState_1, program.onError);
  };

  return __exports;
}({});