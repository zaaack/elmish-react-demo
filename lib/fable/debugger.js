import { setType } from "../fable-core/Symbol";
import _Symbol from "../fable-core/Symbol";
import { Any, compareUnions, equals } from "../fable-core/Util";
import CurriedLambda from "../fable-core/CurriedLambda";
import { inflate, toJson, deflate } from "../fable-core/Serialize";
import { Options } from "./Fable.Import.RemoteDev";
import { getName, getUnionFields } from "../fable-core/Reflection";
import { extractState, connectViaExtension } from "remotedev";
import { last } from "../fable-core/Seq";
import { Cmd } from "./cmd";
import { ofArray } from "../fable-core/List";
import { Program as Program_1 } from "./program";
export const Debugger = function (__exports) {
  const ConnectionOptions = __exports.ConnectionOptions = class ConnectionOptions {
    constructor(tag, data) {
      this.tag = tag;
      this.data = data;
    }

    [_Symbol.reflection]() {
      return {
        type: "Elmish.Debug.Debugger.ConnectionOptions",
        interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
        cases: [["ViaExtension"], ["Remote", "string", "number"], ["Secure", "string", "number"]]
      };
    }

    Equals(other) {
      return this === other || this.tag === other.tag && equals(this.data, other.data);
    }

    CompareTo(other) {
      return compareUnions(this, other) | 0;
    }

  };
  setType("Elmish.Debug.Debugger.ConnectionOptions", ConnectionOptions);
  const connect = __exports.connect = CurriedLambda((() => {
    const serialize = {
      replacer: function (_arg1, v) {
        return deflate(v);
      }
    };
    const fallback = new Options(true, 443, "remotedev.io", true, function (cmd) {
      return {
        type: (() => {
          const matchValue = getUnionFields(cmd, Any);
          return getName(matchValue[0]);
        })(),
        msg: cmd
      };
    }, serialize);
    return $var1 => connectViaExtension(function (_arg1_1) {
      if (_arg1_1.tag === 1) {
        const getActionType = null;
        return new Options(fallback.remote, _arg1_1.data[1], _arg1_1.data[0], false, getActionType, fallback.serialize);
      } else if (_arg1_1.tag === 2) {
        const getActionType_1 = null;
        return new Options(fallback.remote, _arg1_1.data[1], _arg1_1.data[0], fallback.secure, getActionType_1, fallback.serialize);
      } else {
        return new Options(false, 8000, "localhost", false, fallback.getActionType, fallback.serialize);
      }
    }($var1));
  })());
  return __exports;
}({});
export const Program = function (__exports) {
  const withDebuggerUsing = __exports.withDebuggerUsing = function (connection, program, _genArgs) {
    const init = function (a) {
      const patternInput = program.init(a);

      const deflated = function (arg00) {
        return JSON.parse(arg00);
      }(toJson(patternInput[0]));

      connection.init(deflated, null);
      return [patternInput[0], patternInput[1]];
    };

    const update = function (msg, model) {
      const patternInput_1 = program.update(msg, model);
      connection.send(msg, patternInput_1[0]);
      return [patternInput_1[0], patternInput_1[1]];
    };

    const subscribe = function (model_1) {
      const sub = function (dispatch) {
        CurriedLambda(function (arg00_1) {
          return connection.subscribe(arg00_1);
        })(function (_arg1) {
          if (_arg1.type === "DISPATCH") {
            try {
              const matchValue = _arg1.payload.type;
              const $var2 = matchValue === "JUMP_TO_ACTION" ? [0] : matchValue === "JUMP_TO_STATE" ? [0] : matchValue === "IMPORT_STATE" ? [1] : [2];

              switch ($var2[0]) {
                case 0:
                  const state = inflate(function (arg00_2) {
                    return extractState(arg00_2);
                  }(_arg1), {
                    T: _genArgs.model
                  });
                  program.setState(state, dispatch);
                  break;

                case 1:
                  const state_1 = last(_arg1.payload.nextLiftedState.computedStates);
                  program.setState(inflate(state_1.state, {
                    T: _genArgs.model
                  }), dispatch);
                  connection.send(null, _arg1.payload.nextLiftedState);
                  break;

                case 2:
                  break;
              }
            } catch (ex) {
              console.error("Unable to process monitor command", _arg1, ex);
            }
          }
        });
      };

      return Cmd.batch(ofArray([ofArray([sub]), program.subscribe(model_1)]));
    };

    const onError = function (tupledArg) {
      connection.error([tupledArg[0], tupledArg[1]]);
    };

    return new Program_1(init, update, subscribe, program.view, program.setState, onError);
  };

  const withDebuggerAt = __exports.withDebuggerAt = function (options, program, _genArgs) {
    try {
      return withDebuggerUsing(Debugger.connect(options), program, {
        a: _genArgs.a,
        model: _genArgs.model,
        msg: _genArgs.msg,
        view: _genArgs.view
      });
    } catch (ex) {
      console.error("Unable to connect to the monitor, continuing w/o debugger", ex);
      return program;
    }
  };

  const withDebugger = __exports.withDebugger = function (program, _genArgs) {
    try {
      return withDebuggerUsing(Debugger.connect(new Debugger.ConnectionOptions(0)), program, {
        a: _genArgs.a,
        model: _genArgs.model,
        msg: _genArgs.msg,
        view: _genArgs.view
      });
    } catch (ex) {
      console.error("Unable to connect to the monitor, continuing w/o debugger", ex);
      return program;
    }
  };

  return __exports;
}({});