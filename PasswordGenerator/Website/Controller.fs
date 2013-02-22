namespace Website

open IntelliFactory.WebSharper.Sitelets
open Model
open View

module Controller =

    let controller =

        let handle = function Home  -> homeView

        { Handle = handle }