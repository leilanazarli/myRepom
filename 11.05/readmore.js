let card =document.querySelector(".card")

let id = new URLSearchParams(window.location.search).get("id")

fetch(`http://localhost:5005/blogs/${id}`).then((res)=>res.json()).then((data)=>{
    card.innerHTML=`
    <div class="card-body ">
    <h5 class="card-title">Blog Title: ${data.title}</h5>
    <p class="card-text"> ${data.body}</p>
    <p class="card-text"> Author: ${data.author}</p>
   </div>
    `


})