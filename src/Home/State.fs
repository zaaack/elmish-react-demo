module Home.State

open Elmish
open Types

let init () : Model * Cmd<Msg> =
  {input = ""; lazyView = ""}, []

let update msg model : Model * Cmd<Msg> =
  printfn "update"
  match msg with
  | ChangeStr str ->
      {model with input=str}, []
  | ChangeLazyView str ->
      {model with lazyView=str}, []
