namespace Website

open IntelliFactory.WebSharper

module SettingsFormlet =

    module Client =

        open IntelliFactory.WebSharper.Formlet
        open IntelliFactory.WebSharper.JQuery

//        type Settings =
//            {
//                Length    : int
//                UpperCase : bool
//                Numbers   : bool
//                Other     : bool
//            }
//
//            [<JavaScript>]
//            static member Create length upperCase numbers other =
//                {
//                    Length    = length
//                    UpperCase = upperCase
//                    Numbers   = numbers
//                    Other     = other
//                }

        [<JavaScript>]
        let lengthList = [6 .. 32] |> List.map (fun x -> string x, x)

        [<JavaScript>]
        let lengthSelect =
            Controls.Select 8 lengthList
            |> Enhance.WithTextLabel "Length"

        [<JavaScript>]
        let upperCaseCheckbox =
            Controls.Checkbox false
            |> Enhance.WithTextLabel "Upper Case"
        
        [<JavaScript>]
        let numbersCheckbox =
            Controls.Checkbox false
            |> Enhance.WithTextLabel "Numbers"
        
        [<JavaScript>]
        let otherCheckbox =
            Controls.Checkbox false
            |> Enhance.WithTextLabel "Other"

        [<JavaScript>]
        let form =
            Formlet.Yield (fun length upperCase numbers other -> Password.Settings.Create length upperCase numbers other)
            <*> lengthSelect
            <*> upperCaseCheckbox
            <*> numbersCheckbox
            <*> otherCheckbox
            |> Enhance.WithSubmitAndResetButtons
            |> Enhance.WithFormContainer

        [<JavaScript>]
        let formlet =
            Formlet.Run (fun settings ->
                let password = Password.generate' settings
                let password' = password |> List.fold (fun x y -> x + string y) ""
                let strength, width, cssClass =
                    match Password.strength password with
                        | Password.Strengh.Weak   -> "Weak"  , 25 , "progress progress-danger"
                        | Password.Strengh.Medium -> "Medium", 50 , "progress progress-warning"
                        | Password.Strengh.Strong -> "Strong", 75 , "progress progress-success"
                        | Password.Strengh.Best   -> "Best"  , 100, "progress progress-info"
                    |> fun (x, y, z) -> x, "width: " + string y + "%;", z
                JQuery.Of("#password").Attr("value", password').Ignore
                JQuery.Of("#strengthLabel").Text("Strength: " + strength).Ignore
                JQuery.Of("#progressDiv").Attr("class", cssClass).Ignore
                JQuery.Of("#progress").Attr("style", width).Ignore
                ) form

        type SettingsFormletViewer () =
            
            inherit Web.Control ()

            [<JavaScript>]
            override __.Body = formlet