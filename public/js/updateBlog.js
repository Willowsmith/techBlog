const updateBlogHandler = async (event) => {
  const id = document.querySelector("#blogId").value;
    event.preventDefault();
    const userObj={
        name:document.querySelector("#name").value,
        description:document.querySelector("#description").value
    }
    fetch("/api/blogs/" + id,{
        method:"PUT",
        body:JSON.stringify(userObj),
        headers:{
            "Content-Type":"application/json"
        }
        }).then(res=>{
          if(res.ok){
             location.href = "/dashboard"
          } else {
              alert("Failed to update blog")
          }
    });
}

const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/blogs/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to delete project');
      }
    }
  };

  
  document
  .querySelector('#update')
  .addEventListener('click', updateBlogHandler);

  document
  .querySelector('#updateBlog-form')
  .addEventListener('click', delButtonHandler);