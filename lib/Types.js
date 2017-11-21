import { setType } from "./fable-core/Symbol";
import _Symbol from "./fable-core/Symbol";
import { Msg as Msg_1 } from "./Counter/Types";
import { Msg as Msg_2 } from "./Home/Types";
import { compareRecords, equalsRecords, compareUnions, equals } from "./fable-core/Util";
import { Page } from "./Global";
export class Msg {
  constructor(tag, data) {
    this.tag = tag;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "App.Types.Msg",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["CounterMsg", Msg_1], ["HomeMsg", Msg_2]]
    };
  }

  Equals(other) {
    return this === other || this.tag === other.tag && equals(this.data, other.data);
  }

  CompareTo(other) {
    return compareUnions(this, other) | 0;
  }

}
setType("App.Types.Msg", Msg);
export class Model {
  constructor(currentPage, counter, home) {
    this.currentPage = currentPage;
    this.counter = counter | 0;
    this.home = home;
  }

  [_Symbol.reflection]() {
    return {
      type: "App.Types.Model",
      interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
      properties: {
        currentPage: Page,
        counter: "number",
        home: "string"
      }
    };
  }

  Equals(other) {
    return equalsRecords(this, other);
  }

  CompareTo(other) {
    return compareRecords(this, other) | 0;
  }

}
setType("App.Types.Model", Model);