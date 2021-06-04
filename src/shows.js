const request=require("request")

const showDetails=(showName,callback)=>{
    const url="https://api.tvmaze.com/search/shows?q="+showName

    request({url:url,json:true},(error,response)=>{
        if(error)
        {
            callback("Unable to fetch the data at the moment",undefined)
        }else if(response.body.length===0)
        {
            callback("Unable to find information about this show, please enter another name",undefined)
        }else{
            callback(undefined,{
                name:response.body[0].show.name,
                language:response.body[0].show.language,
                runtime:response.body[0].show.runtime,
                genre:response.body[0].show.genres,
                networkName:response.body[0].show.network,
                premiered:response.body[0].show.premiered,
                image:response.body[0].show.image,
                summary:response.body[0].show.summary
            })
        }
    })
}

module.exports=showDetails