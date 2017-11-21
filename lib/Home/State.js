import List from "../fable-core/List";
export function init() {
  return ["", new List()];
}
export function update(msg, model) {
  return [msg.data, new List()];
}