const uri = "http://localhost:9090/customer";
let customers = [];
let updateIndex=0;

function getItems() {
  fetch(uri)
    .then((response) => response.json())
    .then((data) => _displayItems(data))
    .catch((error) => console.error("Unable to get items.", error));
}

function addItem() {
  const addNameTextbox = document.getElementById("customername");

  const item = { customername: document.getElementById("customername").value };

  fetch(uri, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  })
    .then(() => {
      getItems();
      addNameTextbox.value = "";
    });
}

function deleteItem(id) {
  const item = {
    customerid: id,
    customername: document.getElementById("customername").value.trim(),
  };
  fetch(uri, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  })
    .then(() => {
      getItems();
    });
}

function editItem(id) {
  document.getElementById("myBtn").innerHTML = "Update";
  const item = customers.find((item) => item.customerid === id);
  document.getElementById("customername").value = item.customername;
  updateIndex=id;
}

function saveORupdateItem() {
  //   document.getElementById("myBtn").innerHTML == "Save"
  //     ? addItem()
  //     : updateItem();
  if (document.getElementById("myBtn").innerHTML == "Save") {
    addItem();
  } else {
    updateItem();
  }
}

function updateItem() {
  const item = {
    customerid: updateIndex,
    customername: document.getElementById("customername").value.trim(),
  };
  fetch(uri, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  }).then(() => getItems());
  document.getElementById("myBtn").innerHTML = "Save";
  document.getElementById("customername").value = "";
  updateIndex=0;
}

function _displayCount(itemCount) {
  const name = itemCount === 1 ? "customer" : "customers";

  document.getElementById("counter").innerText = `${itemCount} ${name}`;
}

function _displayItems(data) {
  const tBody = document.getElementById("customers");
  tBody.innerHTML = "";

  _displayCount(data.length);

  const button = document.createElement("button");

  data.forEach((item) => {
    
    let editButton = button.cloneNode(false);
    editButton.innerText = "Edit";
    editButton.setAttribute("onclick", `editItem(${item.customerid})`);

    let deleteButton = button.cloneNode(false);
    deleteButton.innerText = "Delete";
    deleteButton.setAttribute("onclick", `deleteItem(${item.customerid})`);

    let tr = tBody.insertRow();

    let td1 = tr.insertCell(0);
    let custid = document.createTextNode(item.customerid);
    td1.appendChild(custid);

    let td2 = tr.insertCell(1);
    let custname = document.createTextNode(item.customername);
    td2.appendChild(custname);

    let td3 = tr.insertCell(2);
    td3.appendChild(editButton);

    let td4 = tr.insertCell(3);
    td4.appendChild(deleteButton);
  });

  customers = data;
}
