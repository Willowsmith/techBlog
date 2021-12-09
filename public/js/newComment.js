const newCommentForm = document.querySelector("#addComment-form");

newCommentForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
      ];
    const userObj={
        description:document.querySelector("#description").value,
        blogid: id
    }
    fetch("/api/comments/",{
        method:"POST", 
        body:JSON.stringify(userObj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){
            location.href = "/blogs/" + id;
        } else {
            alert("An Error Occurred")
        }
    })
})

