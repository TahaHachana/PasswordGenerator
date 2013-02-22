namespace Website

open IntelliFactory.WebSharper.Sitelets
open IntelliFactory.WebSharper.Sitelets.Content
open IntelliFactory.Html
open Model

module HomeContent =

    let forkme : Content.HtmlElement =
        A [HRef "https://github.com/TahaHachana/PasswordGenerator"; Target "_blank"] -< [
            Img [
                Src "https://s3.amazonaws.com/github/ribbons/forkme_right_darkblue_121621.png"
                Alt "Fork me on GitHub"
                Id "forkme"
            ]
        ]

//    let analyticsScript : Content.HtmlElement = Script [Src "../Scripts/"]

    let title = "Online Password Generator"
    let metaDescription = "Generate strong random password online."