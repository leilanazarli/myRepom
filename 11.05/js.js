let cards=document.querySelector(".cards")
let search=document.querySelector(".search")


axios("http://localhost:5005/blogs").then((res)=>{
    console.log(res.data);
    getData(res.data)

})
function getData(arr){
    cards.innerHTML="" 
    arr.forEach(element => {
        let card=document.createElement("div")
        card.innerHTML+=`
        <div class="card  mt-3  w-100" >
        <h1 style="color: blue;">${element.title}</h1>
        <p style="color: red;">${element.body.slice(0,100)}... <a href="readmore.html?id=${element.id}" style="color: rgb(17, 83, 159);">Read More</a></p>
        <p style="color:gray"> Written by ${element.author}</p>
        <div>
        <button class="btn btn-danger w-25" onclick=deleteData("${element.id}")>Delete</button>
        <a href="NewBlog.html?id=${element.id}" class="btn btn-success w-25"
        
        >Edit</a>
        </div>
    </div>
        `
        cards.append(card)
    });

}

async function deleteData(id){
    await  fetch(`http://localhost:5005/blogs/${id}`, {
        method: "DELETE"
      } )
}

search.addEventListener("input", function(event){
    axios("http://localhost:5005/blogs").then((res)=>{
    let arr =res.data.filter((item)=>item.title.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase()))
    getData(arr)
})
})
// async function editData(id){
 
// }