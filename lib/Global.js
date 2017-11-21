import { setType } from "./fable-core/Symbol";
import _Symbol from "./fable-core/Symbol";
import { compareUnions, equals } from "./fable-core/Util";
export class Page {
  constructor(tag, data) {
    this.tag = tag;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Global.Page",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["Home"], ["Counter"], ["About"]]
    };
  }

  Equals(other) {
    return this === other || this.tag === other.tag && equals(this.data, other.data);
  }

  CompareTo(other) {
    return compareUnions(this, other) | 0;
  }

}
setType("Global.Page", Page);
export function toHash(page) {
  if (page.tag === 1) {
    return "#counter";
  } else if (page.tag === 0) {
    return "#home";
  } else {
    return "#about";
  }
}