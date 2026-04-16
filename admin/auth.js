const API = "http://localhost:5000/api/auth/login";

async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch(API, {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message);

    localStorage.setItem("token", data.token);

    window.location.href = "index.html";

  } catch (err) {
    alert("Login failed");
  }
}