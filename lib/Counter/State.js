import List from "../fable-core/List";
export function init() {
  return [0, new List()];
}
export function update(msg, model) {
  if (msg.tag === 1) {
    return [model - 1, new List()];
  } else if (msg.tag === 2) {
    return [0, new List()];
  } else {
    return [model + 1, new List()];
  }
}