document.addEventListener("DOMContentLoaded", function() {
 let LOGIN_URL = "https://reqres.in/api/login"; 
 const loginForm = document.getElementById("loginForm");
 if(loginForm){
    loginForm.addEventListener("submit", async function(event) {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const res = await fetch(LOGIN_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": "reqres-free-v1"

        },
        body: JSON.stringify({ email, password })
    })

    const data = await res.json();
    if (data.token) {
        localStorage.setItem("token", data.token);
        window.location.href = "dashboard.html";
    }else{
        document.getElementById("errorMessage").textContent = "Login failed. Please check your credentials.";
    }
 })
}
})
let customers = JSON.parse(localStorage.getItem("customers")) || [];
const customerList = document.getElementById("customerList");
const addForm = document.getElementById("addCustomerForm");

if(customerList && addForm){
   

    function renderCustomers() {
      customerList.innerHTML = "";
      customers.forEach((c,i)=>{
        console.log(c);
        customerList.innerHTML += `
          <tr>
           <td>${c.name}</td>
           <td>${c.name}</td>
           <td><button class='btn btn-sm btn-danger' onclick='deleteCustomer(${i})'>Delete</td>
        `
      })
    }
}

renderCustomers();

addForm.addEventListener("submit", function(event) {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;

  customers.push({ name, email });
  localStorage.setItem("customers", JSON.stringify(customers));
  renderCustomers();
  addForm.reset();
})

function Logout() {
  localStorage.removeItem("token");
  window.location.href = "index.html";
}   

document.getElementById("logoutButton").addEventListener("click", Logout);