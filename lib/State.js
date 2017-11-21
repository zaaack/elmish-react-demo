import CurriedLambda from "./fable-core/CurriedLambda";
import { ofArray } from "./fable-core/List";
import List from "./fable-core/List";
import { oneOf, s, map } from "./fable/parser";
import { toHash, Page } from "./Global";
import { Msg, Model } from "./Types";
import { getValue } from "./fable-core/Option";
import { Navigation } from "./fable/navigation";
import { update as update_2, init as init_1 } from "./Counter/State";
import { update as update_1, init as init_2 } from "./Home/State";
import { Cmd } from "./fable/cmd";
export const pageParser = CurriedLambda((() => {
  const parsers = ofArray([map(new Page(2), s("about")), map(new Page(1), s("counter")), map(new Page(0), s("home"))]);
  return function (state) {
    return oneOf(parsers, state);
  };
})());
export function urlUpdate(result, model) {
  if (result != null) {
    return [new Model(getValue(result), model.counter, model.home), new List()];
  } else {
    console.error("Error parsing url");
    return [model, Navigation.modifyUrl(toHash(model.currentPage))];
  }
}
export function init(result) {
  const patternInput = init_1();
  const patternInput_1 = init_2();
  const patternInput_2 = urlUpdate(result, new Model(new Page(0), patternInput[0], patternInput_1[0]));
  return [patternInput_2[0], Cmd.batch(ofArray([patternInput_2[1], Cmd.map(function (arg0) {
    return new Msg(0, arg0);
  }, patternInput[1]), Cmd.map(function (arg0_1) {
    return new Msg(1, arg0_1);
  }, patternInput_1[1])]))];
}
export function update(msg, model) {
  if (msg.tag === 1) {
    const patternInput = update_1(msg.data, model.home);
    return [new Model(model.currentPage, model.counter, patternInput[0]), Cmd.map(function (arg0) {
      return new Msg(1, arg0);
    }, patternInput[1])];
  } else {
    const patternInput_1 = update_2(msg.data, model.counter);
    return [new Model(model.currentPage, patternInput_1[0], model.home), Cmd.map(function (arg0_1) {
      return new Msg(0, arg0_1);
    }, patternInput_1[1])];
  }
}