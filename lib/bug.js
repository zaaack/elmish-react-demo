import { defaultArg } from "./fable-core/Option";
import { printf, toConsole } from "./fable-core/String";
export const lastModel = "lastModel";
export const model = "model";
export const hasUpdate = defaultArg(defaultArg(lastModel, null, function (a) {
  return !(model === a);
}), true);
toConsole(printf("hasUpdate %A"))(hasUpdate);