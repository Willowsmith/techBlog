const newBlogForm = document.querySelector("#newBlog-form");

newBlogForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    const userObj={
        name:document.querySelector("#name").value,
        description:document.querySelector("#description").value
    }
    fetch("/api/blogs/",{
        method:"POST",
        body:JSON.stringify(userObj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){
           location.href = "/profile"
        } else {
            alert("trumpet sound")
        }
    })
})