module Home.View

open Fable.Core
open Fable.Core.JsInterop
open Fable.Import.React
open Fable.Helpers.React
open Fable.Helpers.React.Props
open Types
open Elmish.React.Common

type [<Pojo>] Props = {
    name: string
}
type [<Pojo>] State = {
    state: int
}
type FakeView(props) =
    inherit Component<Props, State>(props)

    member x.render() =
        printfn "render FakeView: %A" (props.name)
        div [] [ str (sprintf "render FakeView: %A" (props.name)) ]

let fakeView name =
    com<FakeView, Props, State> {name=name} []


let root model dispatch =
  printfn "root"
  div
    [ ]
    [ p
        [ ClassName "control" ]
        [ input
            [ ClassName "input"
              Type "text"
              Placeholder "Type your name"
              Value model.input
              AutoFocus true
              OnChange (fun ev -> !!ev.target?value |> ChangeStr |> dispatch ) ] ]
      br [ ]
      span
        [ ]
        [ str (sprintf "Hello %s" model.input) ]
      button [ OnClick (fun e -> "" |> ChangeStr |> dispatch) ] [ str "Clean"]
      fakeView (sprintf "non lazyview2: %s" model.lazyView)
      lazyView fakeView (sprintf "lazyview2: %s" model.lazyView)
      button [ OnClick (fun e -> "aa" |> ChangeLazyView |> dispatch) ] [ str "Change Lazyview"]

    ]
