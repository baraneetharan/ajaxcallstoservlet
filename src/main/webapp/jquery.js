const uri = "http://localhost:9090/customer";
let customers = [];
let updateIndex = 0;

function getItems() {
  $.ajax({
    url: "http://localhost:9090/customer",
    type: "GET",
    dataType: "json",
    success: function (data) {
      console.log(data);
      _displayItems(data);
    },
    error: function (error) {
      console.log(`Error ${error}`);
    },
  });
}

function addItem() {
  const addNameTextbox = document.getElementById("customername");

  const item = { customername: document.getElementById("customername").value };

  $.ajax({
    type: "POST",
    url: "http://localhost:9090/customer",
    data: JSON.stringify(item),
    success: function (result) {
      getItems();
    },
    error: function (result) {
      alert("msg");
    },
  });
}

function deleteItem(id) {
  const item = {
    customerid: id,
    customername: document.getElementById("customername").value.trim(),
  };
  $.ajax({
    type: "DELETE",
    url: "http://localhost:9090/customer",
    data: JSON.stringify(item),
    success: function (result) {
      getItems();
    },
    error: function (result) {
      alert("msg");
    },
  });
}

function editItem(id) {
  document.getElementById("myBtn").innerHTML = "Update";
  const item = customers.find((item) => item.customerid === id);
  document.getElementById("customername").value = item.customername;
  updateIndex = id;
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
  $.ajax({
    type: "PUT",
    url: "http://localhost:9090/customer",
    data: JSON.stringify(item),
    success: function (result) {
      getItems();
      document.getElementById("myBtn").innerHTML = "Save";
      document.getElementById("customername").value = "";
      updateIndex = 0;
    },
    error: function (result) {
      alert("msg");
    },
  });
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