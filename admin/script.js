
document.addEventListener("DOMContentLoaded", () => {

const token = localStorage.getItem("token");

if (!token) {
  window.location.href = "login.html";
}

const API = "http://localhost:5000/api/items";
const ORDER_API = "http://localhost:5000/api/orders";


window.showPage = function(page, el) {
  document.querySelectorAll(".page").forEach(p => p.style.display = "none");

  const target = document.getElementById(page + "Page");
  if (target) target.style.display = "block";

  document.querySelectorAll(".sidebar li").forEach(li => li.classList.remove("active"));
  if (el) el.classList.add("active");
};

async function loadItems() {
  try {
    const res = await fetch(API);
    const data = await res.json();

    document.getElementById("totalItems").textContent = data.length;

    const table = document.getElementById("itemsTable");
    table.innerHTML = "";

    data.forEach(item => {
      table.innerHTML += `
        <tr>
          <td>
            <img src="http://localhost:5000/uploads/${item.image}" width="40">
            ${item.name}
          </td>
          <td>$${item.price}</td>
          <td>
            <button onclick="deleteItem(${item.id})" class="btn btn-danger btn-sm">
              Delete
            </button>
          </td>
        </tr>
      `;
    });

  } catch (err) {
    console.error("Load Items Error:", err);
  }
}


const addBtn = document.getElementById("addBtn");

if (addBtn) {
  addBtn.addEventListener("click", async () => {

    const nameInput = document.getElementById("name");
    const categoryInput = document.getElementById("category");
    const descriptionInput = document.getElementById("description");
    const priceInput = document.getElementById("price");
    const imageInput = document.getElementById("image");

    const itemName = nameInput.value.trim();
    const itemCategory = categoryInput.value.trim();
    const itemDescription = descriptionInput.value.trim();
    const itemPrice = priceInput.value;
    const itemImage = imageInput.files[0];

    if (!itemName || !itemCategory || !itemImage) {
      Swal.fire({
        icon: "warning",
        title: "Missing Fields",
        text: "Please fill Name, Category and Image"
      });
      return;
    }

    const formData = new FormData();
    formData.append("name", itemName);
    formData.append("category", itemCategory);
    formData.append("description", itemDescription);
    formData.append("price", itemPrice);
    formData.append("image", itemImage);

    addBtn.disabled = true;
    addBtn.textContent = "Adding...";

    try {
      const res = await fetch(API, {
        method: "POST",
        body: formData
      });

      if (!res.ok) throw new Error();

      Swal.fire({
        icon: "success",
        title: "Added!",
        text: "Item added successfully"
      });

      nameInput.value = "";
      categoryInput.value = "";
      descriptionInput.value = "";
      priceInput.value = "";
      imageInput.value = "";

      loadItems();

    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to add item"
      });
    }

    addBtn.disabled = false;
    addBtn.textContent = "Add Item";
  });
}


window.deleteItem = async function(id) {
  try {
    const confirm = await Swal.fire({
      title: "Delete?",
      showCancelButton: true
    });

    if (!confirm.isConfirmed) return;

    await fetch(`${API}/${id}`, { method: "DELETE" });
    loadItems();

  } catch (err) {
    console.error(err);
  }
};


async function loadOrders() {
  try {
    const res = await fetch(ORDER_API);
    const data = await res.json();

    document.getElementById("totalOrders").textContent = data.length;

    let revenue = 0;
    const table = document.getElementById("ordersTable");
    table.innerHTML = "";

    data.forEach(o => {
      revenue += Number(o.total);

      table.innerHTML += `
        <tr>
          <td>${o.id}</td>
          <td>${o.customer_name}</td>
          <td>$${o.total}</td>
          <td>
            <select onchange="updateStatus(${o.id}, this.value)">
              <option ${o.status === "Pending" ? "selected" : ""}>Pending</option>
              <option ${o.status === "Completed" ? "selected" : ""}>Completed</option>
            </select>
          </td>
          <td>
            <button onclick="deleteOrder(${o.id})" class="btn btn-danger btn-sm">
              Delete
            </button>
          </td>
        </tr>
      `;
    });

    document.getElementById("totalRevenue").textContent = "$" + revenue;

  } catch (err) {
    console.error("Load Orders Error:", err);
  }
}

window.updateStatus = async function(id, status) {
  await fetch(`${ORDER_API}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status })
  });

  loadOrders();
};

window.deleteOrder = async function(id) {
  await fetch(`${ORDER_API}/${id}`, { method: "DELETE" });
  loadOrders();
};


window.logout = function() {
  Swal.fire({
    title: "Are you sure?",
    icon: "warning",
    showCancelButton: true
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.removeItem("token");
      window.location.href = "login.html";
    }
  });
};


loadItems();
loadOrders();

});