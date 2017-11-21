import { compare, equals, toString } from "./Util";
// Options are erased in runtime by Fable, but some cases
// (unit, not resolved generics, nested options) are wrapped
// by the following JS type (for Some cases)
// So options in Fable follow these two rules:
// 1- None is always null in runtime, so a non-strict null check
//    (`x == null`) is enough to check the case of an option.
// 2- To get the value of an option the `getValue` helper
//    below must **always** be used.
export class Some {
  constructor(value) {
    this.value = value;
    this.value = value;
  }
  // We don't prefix it with "Some" for consistency with erased options
  ToString() {
    return toString(this.value);
  }
  Equals(other) {
    if (other instanceof Some) {
      return equals(this.value, other.value);
    } else if (other == null) {
      return false;
    } else {
      return equals(this.value, other);
    }
  }
  CompareTo(other) {
    if (other instanceof Some) {
      return compare(this.value, other.value);
    } else if (other == null) {
      return 1;
    } else {
      return compare(this.value, other);
    }
  }
}
export function getValue(x) {
  if (x instanceof Some) {
    return x.value;
  } else if (x == null) {
    throw new Error("Option has no value");
  } else {
    return x;
  }
}
export function flatten(x) {
  return x instanceof Some ? x.value : x;
}
export function defaultArg(arg, defaultValue, f) {
  return arg == null ? defaultValue : f != null ? f(getValue(arg)) : getValue(arg);
}
export function defaultArgWith(arg, defThunk) {
  return arg == null ? defThunk() : getValue(arg);
}
export function filter(predicate, arg) {
  return arg != null ? !predicate(getValue(arg)) ? null : arg : arg;
}