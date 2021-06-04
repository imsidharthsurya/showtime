const path=require("path")
const express=require("express")
const hbs=require("hbs")
const showDetails = require("./shows")

const app=express()
const port=process.env.PORT || 3000

const publicPath=path.join(__dirname,"../public")
const viewspath=path.join(__dirname,"../template/views")
const partialPath=path.join(__dirname,"../template/partials")


app.use(express.static(publicPath))
app.set("view engine","hbs")
app.set("views",viewspath)
hbs.registerPartials(partialPath)

app.get("/",(req,res)=>{
    res.render("index",{
        title:"ShowTime",
        creator:"Sidharth Surya",
        msg:"Get the information about any show"
    })
})

app.get("/about",(req,res)=>{
    res.render("about",{
        title:"About",
        msg:"This app gives you all the details about a show and let you pick a show to watch",
        creator:"Sidharth Surya"
    })
})

app.get("/help",(req,res)=>{
    res.render("help",{
        title:"Help",
        msg:"I am here to help you",
        creator:"Sidharth Surya"
    })
})

app.get("/show",(req,res)=>{
    const showName=req.query.q
    if(!showName)
    {
        return res.send({
            error:"Please enter show name"
        })
    }
        
    showDetails(showName,(error,body)=>{
        if(error)
        {
            return res.send({
                error:error
            })
        }
       return res.send({
           name:body.name,
           language:body.language,
           runtime:body.runtime,
           genre:body.genre,
           networkName:body.networkName,
           premiered:body.premiered,
           image:body.image,
           summary:body.summary

       })
    })
})

app.get("*",(req,res)=>{
    res.render("404",{
        title:"404 page",
        creator:"Sidharth Surya",
        msg:"Page Not found"
    })
})


app.listen(port,()=>{
    console.log("running on port "+port)
})