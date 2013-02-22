namespace Website

open IntelliFactory.WebSharper

module SettingsFormlet =

    module Client =

        open IntelliFactory.WebSharper.Formlet
        open IntelliFactory.WebSharper.JQuery

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
                    Length = length
                    UpperCase = upperCase
                    Numbers = numbers
                    Other = other
                }

        [<JavaScript>]
        let lengthList = [6 .. 32] |> List.map (fun x -> string x, x)

        [<JavaScript>]
        let main () =
            let lengthSelect =
                Controls.Select 8 lengthList
                |> Enhance.WithTextLabel "Length"
            let upperCaseCheckbox =
                Controls.Checkbox false
                |> Enhance.WithTextLabel "Upper Case"
            let numbersCheckbox =
                Controls.Checkbox false
                |> Enhance.WithTextLabel "Numbers"
            let otherCheckbox =
                Controls.Checkbox false
                |> Enhance.WithTextLabel "Other"
            let form =
                Formlet.Yield (fun length upperCase numbers other -> Settings.Create length upperCase numbers other)
                <*> lengthSelect
                <*> upperCaseCheckbox
                <*> numbersCheckbox
                <*> otherCheckbox
                |> Enhance.WithSubmitAndResetButtons
                |> Enhance.WithFormContainer
            Formlet.Run (fun settings ->
                let password = Password.generate' settings.UpperCase settings.Numbers settings.Other settings.Length
                JQuery.Of("#password").Attr("value", password).Ignore
                ) form

        type SettingsFormletViewer () =
            
            inherit Web.Control ()

            [<JavaScript>]
            override __.Body = main ()