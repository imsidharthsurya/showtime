
const showForm=document.querySelector("form")
const show=document.querySelector("input")

showForm.addEventListener("submit",(e)=>{
    e.preventDefault()
    document.querySelector("#show-img").src=""
    document.querySelector("#msg-1").textContent="Loading..."
    document.querySelector("#msg-2").textContent=""
    document.querySelector("#msg-3").textContent=""
    document.querySelector("#msg-4").textContent=""
    document.querySelector("#msg-5").textContent=""
    document.querySelector("#msg-6").textContent=""
    document.querySelector("#msg-7").textContent=""
    const showName=show.value
    console.log(showName)
    fetch("/show?q="+showName).then((response)=>{
    response.json().then((data)=>{
            if(data.error)
            {
                document.querySelector("#show-img").src=""
                document.querySelector("#msg-1").textContent=data.error
                document.querySelector("#msg-2").textContent=""
                document.querySelector("#msg-3").textContent=""
                document.querySelector("#msg-4").textContent=""
                document.querySelector("#msg-5").textContent=""
                document.querySelector("#msg-6").textContent=""
                document.querySelector("#msg-7").textContent=""
            }
            else{
                if(data.image===null)
                    document.querySelector("#show-img").src=""
                else
                    document.querySelector("#show-img").src=data.image.medium
                document.querySelector("#msg-1").innerHTML="<strong>Name: </strong>"+data.name
                document.querySelector("#msg-2").innerHTML="<strong>Language: </strong>"+data.language
                document.querySelector("#msg-3").innerHTML="<strong>Runtime: </strong>"+data.runtime
                document.querySelector("#msg-4").innerHTML="<strong>Genre: <strong>"
                console.log(data.genre)
                for(var i=0;i<data.genre.length;++i)
                {
                    document.querySelector("#msg-4").innerHTML+=data.genre[i]
                    document.querySelector("#msg-4").innerHTML+=", "
                }
                if(data.networkName===null)
                    document.querySelector("#msg-5").innerHTML="<strong>Network Name: </strong>"+data.networkName
                else
                    document.querySelector("#msg-5").innerHTML="<strong>Network Name: </strong>"+data.networkName.name
                document.querySelector("#msg-6").innerHTML="<strong>Premiered on Date: </strong>"+data.premiered
                document.querySelector("#msg-7").innerHTML="<strong>Summary: </strong>"+data.summary
            }
      })
    })

})