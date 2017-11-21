import * as main_sass from "./sass/main.sass";
import { printf, toConsole } from "./fable-core/String";
import { hasUpdate } from "./bug";
import { createElement } from "react";
import { Interface, makeGeneric, Unit, createObj } from "./fable-core/Util";
import { ofArray } from "./fable-core/List";
import { Props, classList } from "./fable/Fable.Helpers.React";
import { Page, toHash } from "./Global";
import { root as root_1 } from "./Counter/View";
import { Model, Msg } from "./Types";
import { root as root_2 } from "./Home/View";
import { root as root_3 } from "./Info/View";
import { root as root_4 } from "./Navbar/View";
import { Program as Program_2, ProgramModule } from "./fable/program";
import { Program } from "./react";
import { Program as Program_1 } from "./fable/debugger";
import { Navigable, ProgramModule as ProgramModule_1 } from "./fable/navigation";
import { parseHash } from "./fable/parser";
import { update as update_1, init as init_1, urlUpdate, pageParser } from "./State";
import { Cmd } from "./fable/cmd";
import { hmrState, HMRModel, HMRMsg } from "./fable/hmr";
main_sass;
toConsole(printf("%A"))(hasUpdate);
export function menuItem(label, page, currentPage) {
  return createElement("li", {}, createElement("a", createObj(ofArray([classList(ofArray([["is-active", page.Equals(currentPage)]])), new Props.HTMLAttr(51, toHash(page))]), 1), label));
}
export function menu(currentPage) {
  return createElement("aside", {
    className: "menu"
  }, createElement("p", {
    className: "menu-label"
  }, "General"), createElement("ul", {
    className: "menu-list"
  }, menuItem("Home", new Page(0), currentPage), menuItem("Counter sample", new Page(1), currentPage), menuItem("About", new Page(2), currentPage)));
}
export function root(model, dispatch) {
  const pageHtml = function (_arg1) {
    if (_arg1.tag === 1) {
      return root_1(model.counter, $var1 => dispatch(function (arg0) {
        return new Msg(0, arg0);
      }($var1)));
    } else if (_arg1.tag === 0) {
      return root_2(model.home, $var2 => dispatch(function (arg0_1) {
        return new Msg(1, arg0_1);
      }($var2)));
    } else {
      return root_3;
    }
  };

  return createElement("div", {}, createElement("div", {
    className: "navbar-bg"
  }, createElement("div", {
    className: "container"
  }, root_4)), createElement("div", {
    className: "section"
  }, createElement("div", {
    className: "container"
  }, createElement("div", {
    className: "columns"
  }, createElement("div", {
    className: "column is-3"
  }, menu(model.currentPage)), createElement("div", {
    className: "column"
  }, pageHtml(model.currentPage))))));
}
ProgramModule.run(Program.withReact("elmish-app", (() => {
  const $var3 = Program_1.withDebugger(ProgramModule_1.toNavigable(function (location) {
    return parseHash(pageParser, location);
  }, function (result, model) {
    return urlUpdate(result, model);
  }, ProgramModule.mkProgram(function (result_1) {
    return init_1(result_1);
  }, function (msg, model_1) {
    return update_1(msg, model_1);
  }, function (model_2, dispatch) {
    return root(model_2, dispatch);
  })), {
    a: Unit,
    model: Model,
    msg: makeGeneric(Navigable, {
      msg: Msg
    }),
    view: Interface("Fable.Import.React.ReactElement")
  });

  if (!(module.hot == null)) {
    module.hot.accept();
  }

  const map = function (tupledArg) {
    return [tupledArg[0], Cmd.map(function (arg0) {
      return new HMRMsg(0, arg0);
    }, tupledArg[1])];
  };

  const update = function (msg_1, model_3) {
    const patternInput_1 = map(msg_1.tag === 1 ? [new HMRModel(model_3.HMRCount + 1, model_3.UserModel), Cmd.none()] : (() => {
      const patternInput = $var3.update(msg_1.data, model_3.UserModel);
      return [new HMRModel(model_3.HMRCount, patternInput[0]), patternInput[1]];
    })());
    hmrState(patternInput_1[0]);
    return [patternInput_1[0], patternInput_1[1]];
  };

  const createModel = function (tupledArg_1) {
    return [new HMRModel(0, tupledArg_1[0]), tupledArg_1[1]];
  };

  const init = hmrState() == null ? $var5 => createModel(($var4 => map($var3.init($var4)))($var5)) : function () {
    return [hmrState(), Cmd.ofMsg(new HMRMsg(1))];
  };

  const subs = function (model_4) {
    return Cmd.batch(ofArray([Cmd.map(function (arg0_1) {
      return new HMRMsg(0, arg0_1);
    }, $var3.subscribe(model_4.UserModel))]));
  };

  const setState = function (model_5, dispatch_1) {
    $var3.setState(model_5.UserModel, $var6 => dispatch_1(function (arg0_2) {
      return new HMRMsg(0, arg0_2);
    }($var6)));
  };

  return new Program_2(init, update, subs, function (model_6, dispatch_2) {
    return $var3.view(model_6.UserModel, $var7 => dispatch_2(function (arg0_3) {
      return new HMRMsg(0, arg0_3);
    }($var7)));
  }, setState, $var3.onError);
})()));