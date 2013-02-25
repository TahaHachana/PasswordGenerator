namespace Website

open IntelliFactory.WebSharper
open IntelliFactory.WebSharper.EcmaScript
open ExtSharper

module Password =

    [<JavaScript>]
    let remove item lst = lst |> List.filter (fun x -> x <> item)

    [<JavaScript>]
    let rec shuffle (lst : 'a list) = 
        [
            let item = Random.Next(0, (lst.Length - 1))
            let x = lst.[item]
            yield x
            let lst' = remove x lst
            if not lst'.IsEmpty then
                yield! shuffle lst'
        ]

    [<JavaScript>]
    let generate chars length =    
        let chars' = shuffle chars
        [
            for x in 1 .. length do
                let item = Random.Next(0, (chars.Length - 1))
                yield chars'.[item]
        ]
 
    [<JavaScript>]
    let alpha = ['a' .. 'z']

    [<JavaScript>]
    let upperCase = ['A' .. 'Z']

    [<JavaScript>]
    let numbers = ['1' .. '9']
   
    [<JavaScript>]    
    let punctuation = ['~'; '`'; '!'; '@'; '#'; '$'; '%'; '^'; '&'; '*'; '('; ')'; '-'; '_'; '+'; '='; '\"']

    type Settings =
        {
            Length    : int
            UpperCase : bool
            Numbers   : bool
            Other     : bool
        }

        [<JavaScript>]
        static member Create length upperCase numbers other =
            {
                Length    = length
                UpperCase = upperCase
                Numbers   = numbers
                Other     = other
            }

    [<JavaScript>]
    let generate' settings =
        let useUpperCase = settings.UpperCase
        let useNumbers = settings.Numbers
        let useOther = settings.Other
        let chars =
            [
                yield! alpha
                if useUpperCase then yield! upperCase
                if useNumbers   then yield! numbers
                if useOther     then yield! punctuation
            ]
        let length = settings.Length
        generate chars length

    [<JavaScript>]
    let (|Alpha|Upper|Number|Punct|Other|) (c : char) =
        match c with
        | _ when alpha       |> List.exists (fun x -> x = c) -> Alpha
        | _ when upperCase   |> List.exists (fun x -> x = c) -> Upper
        | _ when numbers     |> List.exists (fun x -> x = c) -> Number
        | _ when punctuation |> List.exists (fun x -> x = c) -> Punct
        | _                                                  -> Other

    [<JavaScript>]
    let charStrength = function
        | Alpha | Upper -> 26
        | Number        -> 9
        | Punct | Other -> 17

    type Strengh = Weak | Medium | Strong | Best

    [<JavaScript>]
    let (|Weak|Medium|Strong|Best|) x =
        match x with
        | _ when x >= 128.             -> Best
        | _ when x <  128. && x >= 64. -> Strong
        | _ when x <   64. && x >= 56. -> Medium
        | _                            -> Weak

    [<JavaScript>]
    let strength password =
        List.sumBy charStrength password
        |> fun x -> (log <| float x) * (float password.Length / log 2.) |> floor
        |> function
            | Weak   -> Weak
            | Medium -> Medium
            | Strong -> Strong
            | Best   -> Best