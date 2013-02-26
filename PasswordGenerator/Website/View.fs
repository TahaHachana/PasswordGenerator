namespace Website

open IntelliFactory.Html
open ExtSharper.Server
open Model

module View =

    let mainTemplate = Skin.MakeDefaultTemplate "~/Main.html" Skin.LoadFrequency.Once 
    let withMainTemplate = Skin.WithTemplate<Action> mainTemplate
    
    let homeView =
        withMainTemplate HomeContent.title HomeContent.metaDescription <| fun ctx ->
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
                        Label [Id "strengthLabel"] -< [Text "Strength: "]
                        Div [Class "progress"; Style "width: 200px;"; Id "progressDiv"] -< [
                            Div [Class "bar"; Id "progress"]
                        ]
                    ]
                    Div [
                        Span [Class "pull-right"] -<
                            [Text "Powered by "] -<
                                [A [HRef "http://www.websharper.com/"; Target "_blank"] -<
                                    [Text "WebSharper"]]
                    ]
                    Script [Src "../Scripts/GoogleAnalytics.js"]
                ]
            ]