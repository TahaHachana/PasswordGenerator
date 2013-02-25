﻿namespace Website

open IntelliFactory.WebSharper

module SettingsFormlet =

    module Client =

        open IntelliFactory.WebSharper.Formlet
        open IntelliFactory.WebSharper.JQuery

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
        let updateView password (strength, width, cssClass) =
            let width' = "width: " + string width + "%;"
            JQuery.Of("#password").Attr("value", password).Ignore
            JQuery.Of("#strengthLabel").Text("Strength: " + strength).Ignore
            JQuery.Of("#progressDiv").Attr("class", cssClass).Ignore
            JQuery.Of("#progress").Attr("style", width').Ignore

        [<JavaScript>]
        let formlet =
            Formlet.Run (fun settings ->
                let password = Password.generate' settings
                let password' = password |> List.fold (fun x y -> x + string y) ""
                match Password.strength password with
                    | Password.Strengh.Weak   -> "Weak"  , 25 , "progress progress-danger"
                    | Password.Strengh.Medium -> "Medium", 50 , "progress progress-warning"
                    | Password.Strengh.Strong -> "Strong", 75 , "progress progress-success"
                    | Password.Strengh.Best   -> "Best"  , 100, "progress progress-info"
                |> updateView password'
                ) form

        type SettingsFormletViewer () =
            
            inherit Web.Control ()

            [<JavaScript>]
            override __.Body = formlet