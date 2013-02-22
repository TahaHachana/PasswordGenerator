namespace Website

open IntelliFactory.Html
open Model

module View =

    let homeView =
        Skin.withMainTemplate HomeContent.title HomeContent.metaDescription <| fun ctx ->
            [
                HomeContent.forkme
                Div [Class "container"] -< [
                    H1 [Text "Generate Strong Passwords Online"]
                    P [Text "Use this tool to generate strong random passwords. Every thing happens in the browser and passwords aren't sent to or retrieved from the server."]
                    Div [new SettingsFormlet.Client.SettingsFormletViewer () ]
                    HR []
                    Div [
                        Label [Text "Password"]
                        Input [Type "text"; Id "password"]
                    ]
                ]
            ]
                //SharedContent.analyticsScript