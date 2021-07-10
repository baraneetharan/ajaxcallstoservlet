var app = new (function () {
    // alert("app called");
  this.create = function () {
    // document.getElementById("name").value
      var customername=document.getElementById("customername").value;
    // console.log("create called " + customername);
    var newCustomer={"customername":document.getElementById("customername").value};
    console.log(newCustomer);
    
    // Call Ajax
    $.ajax({
        type: "POST",
        url: "http://localhost:9090/customer",
        data: JSON.stringify(newCustomer),
        success: function(result) {
            alert('msg');
        },
        error: function(result) {
            alert('msg');
        }
    });
  };
  this.select = function () {
    console.log("select called");
    $.ajax({
        url: 'http://localhost:9090/customer',
        type: "GET",
        dataType: "json",
        success: function (data) {
            console.log(data);
        },
        error: function (error) {
            console.log(`Error ${error}`);
        }
    });
  };
  this.update = function () {
    console.log("update called");
    // document.getElementById("name").value
    var customername=document.getElementById("customername").value;
    // console.log("create called " + customername);
    var updateCustomer={"customerid":1,"customername":document.getElementById("customername").value};
    console.log(updateCustomer);
    
    // Call Ajax
    $.ajax({
        type: "PUT",
        url: "http://localhost:9090/customer",
        data: JSON.stringify(updateCustomer),
        success: function(result) {
            alert('msg');
        },
        error: function(result) {
            alert('msg');
        }
    });

  };
  this.delete = function () {
    console.log("delete called");
    var customername=document.getElementById("customername").value;
    // console.log("create called " + customername);
    var deleteCustomer={"customerid":2,"customername":document.getElementById("customername").value};
    console.log(deleteCustomer);
    
    // Call Ajax
    $.ajax({
        type: "DELETE",
        url: "http://localhost:9090/customer",
        data: JSON.stringify(deleteCustomer),
        success: function(result) {
            alert('msg');
        },
        error: function(result) {
            alert('msg');
        }
    });
  };
})();
