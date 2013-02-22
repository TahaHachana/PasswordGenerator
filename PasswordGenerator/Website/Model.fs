namespace Website

open IntelliFactory.WebSharper.Sitelets
open IntelliFactory.WebSharper.Sitelets.Content

module Model =

    type Action = Home

    type Page =
        {
            Title           : string
            MetaDescription : string
            Body            : HtmlElement list
        }