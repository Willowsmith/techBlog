const loginForm = document.getElementById("login");


loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const loginUsername = document.getElementById("username").value;
  const loginPassword = document.getElementById("password").value;

  if (loginUsername && loginPassword) {
    const resp = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ username: loginUsername, password: loginPassword }),
      headers: { "Content-Type": "application/json" },
    });

    if (resp.ok) {
      console.log(resp);
      location.replace("/dashboard");
    } else {
      alert("YOU ENTERED THE WRONG INFORMATION");
    }
  }
});


