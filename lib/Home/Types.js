import { setType } from "../fable-core/Symbol";
import _Symbol from "../fable-core/Symbol";
import { compareUnions, equals } from "../fable-core/Util";
export class Msg {
  constructor(tag, data) {
    this.tag = tag;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Home.Types.Msg",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["ChangeStr", "string"]]
    };
  }

  Equals(other) {
    return this === other || this.tag === other.tag && equals(this.data, other.data);
  }

  CompareTo(other) {
    return compareUnions(this, other) | 0;
  }

}
setType("Home.Types.Msg", Msg);