let btn = document.querySelector(".btn")
let title = document.querySelector("#title")
let textarea = document.querySelector("#textarea")
let select = document.querySelector("#select")
let form = document.querySelector(".form")
let h1 = document.querySelector(".text")



let id = new URLSearchParams(window.location.search).get("id")


let status=false
// let editedId = null

   axios(`http://localhost:5005/blogs/${id}`)
   .then((res)=>{
       title.value=res.data.title;
       textarea.value=res.data.body;
       select.value=res.data.author;
  status=true
  btn.innerHTML="Edit"
  h1.innerHTML="Edit Blog"
   })

   form.addEventListener("submit" , function(event){
    event.preventDefault();
       let obj=({
       title:title.value,
       body:textarea.value,
       author:select.value
    })
    if(status){ 
     
        axios.patch(`http://localhost:5005/blogs/${id}`,obj)
        }
      else{
          axios.post("http://localhost:5005/blogs",obj)
      }
     
      window.location="index.html"
   }
     
)
    