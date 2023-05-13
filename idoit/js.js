let firstname=document.querySelector("#firstname")
let lastname=document.querySelector("#lastname")
let email=document.querySelector("#email")
let submit=document.querySelector(".submit")
let form=document.querySelector("form")

let searchinput=document.querySelector("#searchinput")

let thfirstname=document.querySelector("#thfirstname")
let arrowup=document.querySelector(".arrowup")
let arrowdown=document.querySelector(".arrowdown")

let thlastname=document.querySelector("#thlastname")

let tbody=document.querySelector(".tbody")

axios("http://localhost:9000/users").then((res)=>{
    console.log(res.data);
    getAllData(res.data)
})
function getAllData(arr){
    tbody.innerHTML=""
    arr.forEach(element => {
        let tr =document.createElement("tr")
        tr.innerHTML+=`
        <td>${element.name}</td>
        <td>${element.username}</td>
        <td>${element.email}</td>
        <td>
       <div>        
       <button class="edit btn btn-warning" onclick=edit("${element.id}")>Edit</button>
       <button class="delete btn btn-danger" onclick=deleteData("${element.id}")>Delete</button></div>
        </td>
        `
        tbody.append(tr)
    });
}

function deleteData(id){
    axios.delete(`http://localhost:9000/users/${id}`)
}

let editid
let status =false
function edit(id){
    status=true
    editid=id
    axios(`http://localhost:9000/users/${editid}`).then((res)=>{
        firstname.value=res.data.name
        lastname.value=res.data.username
        email.value=res.data.email
    })
}

form.addEventListener("submit",function(e){
    e.preventDefault()
    let obj={
        name:firstname.value,
        username:lastname.value,
        email:email.value
    }

if(status){
        axios.patch(`http://localhost:9000/users/${editid}`,obj)
}
else{
    axios.post(`http://localhost:9000/users`,obj)

}
})
let arr=[]
let searchsort=null
searchinput.addEventListener("input",function(event){
    searchsort=true
     axios(`http://localhost:9000/users`).then((res)=>{
         arr= res.data.filter((item)=>item.name.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase()) || item.username.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase()) )
      getAllData(arr) 
    })
})


let bool = false
thfirstname.addEventListener("click" ,function(){
   bool=!bool
   if(searchsort){
    if(bool){
        arrowdown.style.display="none"
      arrowup.style.display="inline-block"
          let sortedarr =arr.sort((a,b)=>a.name.localeCompare(b.name))
          console.log(getAllData(sortedarr))
    }
    else{
      arrowup.style.display="none"
      arrowdown.style.display="inline-block"
          let sortedarr =arr.sort((a,b)=>b.name.localeCompare(a.name))
          getAllData(sortedarr)
  
  }
   }
  else{ if(bool){
      arrowdown.style.display="none"
    arrowup.style.display="inline-block"
    axios(`http://localhost:9000/users`).then((res)=>{
        let sorted =res.data.sort((a,b)=>a.name.localeCompare(b.name))
        console.log(getAllData(sorted))
        
    })
  }
  else{
    arrowup.style.display="none"
    arrowdown.style.display="inline-block"
    axios(`http://localhost:9000/users`).then((res)=>{
        let sorted =res.data.sort((a,b)=>b.name.localeCompare(a.name))
        getAllData(sorted)

  })
}
}
})
