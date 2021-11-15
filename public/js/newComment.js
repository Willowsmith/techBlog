const newCommentForm = document.querySelector("#addComment-form");

newCommentForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
      ];
    const userObj={
        name:document.querySelector("#name").value,
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
            location.href = "/profile"
            alert("all good")
        } else {
            alert("An Error Occurred")
        }
    })
})

newAccountant.addEventListener ("submit", (e) =>{


if (!accountant) {
    fetch("/api/manatees", {
        method: "POST"
    })
} else {
    fetch("/api/manatees", {
        method: "PUT"
    })
}


});