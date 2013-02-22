namespace Website

open IntelliFactory.WebSharper
open IntelliFactory.WebSharper.EcmaScript

module Password =

    [<JavaScript>]
    let random lowerBound upperBound =
        Math.Random() * (upperBound - lowerBound + 1 |> float)
        |> Math.Floor

    [<JavaScript>]
    let remove item lst = lst |> List.filter (fun x -> x <> item)

    [<JavaScript>]
    let rec shuffle (lst : 'a list) = 
        [
            let item = random 0 (lst.Length - 1)
            let x = lst.[item]
            yield x
            let lst' = remove x lst
            if not lst'.IsEmpty then
                yield! shuffle lst'
        ]

    [<JavaScript>]
    let generate chars length =    
        let chars' = shuffle chars
        [|
            for x in 1 .. length do
                let item = random 0 (chars.Length - 1)
                yield chars'.[item]
        |]
 
    [<JavaScript>]
    let alpha = ['a' .. 'z']

    [<JavaScript>]
    let upperCase = ['A' .. 'Z']

    [<JavaScript>]
    let numbers = ['1' .. '9']
   
    [<JavaScript>]    
    let punctuation = ['~'; '`'; '!'; '@'; '#'; '$'; '%'; '^'; '&'; '*'; '('; ')'; '-'; '_'; '+'; '='; '\"']

    [<JavaScript>]
    let generate' forceUpperCase forceNumbers forcePunctuation length =
        let chars =
            [
                yield! alpha
                if forceUpperCase   then yield! upperCase
                if forceNumbers     then yield! numbers
                if forcePunctuation then yield! punctuation
            ]
        generate chars length
        |> Array.map string
        |> String.concat ""


//    // Password checking
//    let totalChars = 0x7f - 0x20
//    let alphaLen = alpha.Length
//    let upperLen = upper.Length
//    let digitsLen = digits.Length
//    let punctLen = punct.Length
//    let otherChars = totalChars - (alphaLen + upperLen + digitsLen + punctLen)
// 
//    /// Evaluates the strength of a password.
//    let evalPass pass = 
//        let evalChar (c : char) =
//            match c with
//            | _ when alpha |> List.exists (fun x -> x = c) -> alphaLen
//            | _ when upper |> List.exists (fun x -> x = c) -> upperLen
//            | _ when digits |> List.exists (fun x -> x = c) -> digitsLen
//            | _ when punct |> List.exists (fun x -> x = c) -> punctLen
//            | _ -> otherChars
//    
//        let score = pass |> Array.sumBy evalChar
// 
//        let score' = (log <| float score) * (float pass.Length / log 2.) |> floor
// 
//        let evalScore (bits : float) =
//            match bits with
//            | _ when bits >= 128. -> "Very Strong"
//            | _ when bits < 128. && bits >= 64. -> "Strong"
//            | _ when bits < 64. && bits >= 56. -> "Medium"
//            | _ -> "Weak"  
// 
//        evalScore score'


        
