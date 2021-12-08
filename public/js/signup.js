const signupForm = document.querySelector("#signup-form");

signupForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    const userObj={
        name:document.querySelector("#signupusername").value,
        password:document.querySelector("#signuppassword").value,
    }
    fetch("/api/users/signup",{
        method:"POST",
        body:JSON.stringify(userObj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){
           location.href = "/dashboard"
        } else {
            alert("Something went wrong")
        }
    })
})