module Home.Types

type Model = {
    input: string
    lazyView: string
}

type Msg =
  | ChangeStr of string
  | ChangeLazyView of string
