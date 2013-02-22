namespace Website

open IntelliFactory.WebSharper.Sitelets
open Model
open Controller

module Site =

    let router : Router<Action> =
        Router.Table
            [
                Home, "/"
            ]

    let sitelet =
        {
            Controller = controller
            Router     = router
        }
            
type Website() =
    interface IWebsite<Action> with
        member this.Sitelet = Site.sitelet
        member this.Actions = []

[<assembly: WebsiteAttribute(typeof<Website>)>]
do ()