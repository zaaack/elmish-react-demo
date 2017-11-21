import { setType } from "../fable-core/Symbol";
import _Symbol from "../fable-core/Symbol";
import { equalsRecords, Array as _Array, Any, Function as _Function, Option } from "../fable-core/Util";
import { extractState as extractState_1, connectViaExtension as connectViaExtension_1, connect as connect_1 } from "remotedev";
export class Options {
  constructor(remote, port, hostname, secure, getActionType, serialize) {
    this.remote = remote;
    this.port = port | 0;
    this.hostname = hostname;
    this.secure = secure;
    this.getActionType = getActionType;
    this.serialize = serialize;
  }

  [_Symbol.reflection]() {
    return {
      type: "Fable.Import.RemoteDev.Options",
      interfaces: ["FSharpRecord"],
      properties: {
        remote: "boolean",
        port: "number",
        hostname: "string",
        secure: "boolean",
        getActionType: Option(_Function([Any, Any])),
        serialize: Any
      }
    };
  }

}
setType("Fable.Import.RemoteDev.Options", Options);
export class Action {
  constructor(type, fields) {
    this.type = type;
    this.fields = fields;
  }

  [_Symbol.reflection]() {
    return {
      type: "Fable.Import.RemoteDev.Action",
      interfaces: ["FSharpRecord", "System.IEquatable"],
      properties: {
        type: "string",
        fields: _Array(Any)
      }
    };
  }

  Equals(other) {
    return equalsRecords(this, other);
  }

}
setType("Fable.Import.RemoteDev.Action", Action);
export class LiftedState {
  constructor(actionsById, computedStates, currentStateIndex, nextActionId) {
    this.actionsById = actionsById;
    this.computedStates = computedStates;
    this.currentStateIndex = currentStateIndex | 0;
    this.nextActionId = nextActionId | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Fable.Import.RemoteDev.LiftedState",
      interfaces: ["FSharpRecord", "System.IEquatable"],
      properties: {
        actionsById: _Array(Action),
        computedStates: _Array(Any),
        currentStateIndex: "number",
        nextActionId: "number"
      }
    };
  }

  Equals(other) {
    return equalsRecords(this, other);
  }

}
setType("Fable.Import.RemoteDev.LiftedState", LiftedState);
export class Payload {
  constructor(nextLiftedState, type) {
    this.nextLiftedState = nextLiftedState;
    this.type = type;
  }

  [_Symbol.reflection]() {
    return {
      type: "Fable.Import.RemoteDev.Payload",
      interfaces: ["FSharpRecord", "System.IEquatable"],
      properties: {
        nextLiftedState: LiftedState,
        type: "string"
      }
    };
  }

  Equals(other) {
    return equalsRecords(this, other);
  }

}
setType("Fable.Import.RemoteDev.Payload", Payload);
export class Msg {
  constructor(state, action, type, payload) {
    this.state = state;
    this.action = action;
    this.type = type;
    this.payload = payload;
  }

  [_Symbol.reflection]() {
    return {
      type: "Fable.Import.RemoteDev.Msg",
      interfaces: ["FSharpRecord", "System.IEquatable"],
      properties: {
        state: "string",
        action: Any,
        type: "string",
        payload: Payload
      }
    };
  }

  Equals(other) {
    return equalsRecords(this, other);
  }

}
setType("Fable.Import.RemoteDev.Msg", Msg);
export const connect = connect_1;
export const connectViaExtension = connectViaExtension_1;
export const extractState = extractState_1;