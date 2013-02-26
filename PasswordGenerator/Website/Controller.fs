namespace Website

open IntelliFactory.WebSharper.Sitelets
open Model
open View

module Controller =

    let controller = { Handle = function Home -> homeView }