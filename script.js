var id = document.getElementById("id");
var fullName = document.getElementById("fname");
var email = document.getElementById("email");
var tel = document.getElementById("tel");
var age = document.getElementById("age");
var form = document.getElementById("form");
var tableResult = document.querySelector("#tableResult");
document.getElementById("add").addEventListener("click", function () {
  if (validateAll() == true) {
    var user = {
      id: id.value,
      fullName: fullName.value,
      email: email.value,
      tel: tel.value,
      age: age.value,
    };
    var returnedData = JSON.parse(localStorage.getItem("users"));
    if (returnedData == null) {
      var users = [];
      users.push(user);
      localStorage.setItem("users", JSON.stringify(users));
      alert("New user registered");
    } else {
      var users = returnedData;
      var idS = [];
      for (let i = 0; i < returnedData.length; i++) {
        const user = returnedData[i];
        idS.push(user.id);
      }
      if (idS.includes(id.value)) {
        alert("ID is Found Please Insert Another One");
      } else {
        users.push(user);
        localStorage.setItem("users", JSON.stringify(users));
        alert("New user registered");
      }
    }
  }
});
document.getElementById("display").addEventListener("click", function () {
  var returnedData = JSON.parse(localStorage.getItem("users"));
  if (returnedData == null) {
    if (tableResult.innerText == "") {
      createResult();
    } else {
      tableResult.removeChild(tableResult.childNodes[0]);
      createResult();
    }
  } else {
    if (tableResult.innerText == "") {
      createTable();
    } else {
      tableResult.removeChild(tableResult.childNodes[0]);
      createTable();
    }
  }
  console.log(returnedData);
  return returnedData;
});
document.getElementById("reset").addEventListener("click", function () {
  id.value = "";
  fullName.value = "";
  email.value = "";
  tel.value = "";
  age.value = "";
});
function validateAll() {
  var validatedId = validateId(id.value);
  var validatedName = validateName(fullName.value);
  var validatedEmail = validateEmail(email.value);
  var validatedTel = validateTel(tel.value);
  var validatedAge = validateAge(age.value);
  if (
    validatedId == true &&
    validatedName == true &&
    validatedEmail == true &&
    validatedTel == true &&
    validatedAge == true
  ) {
    return true;
  } else {
    return false;
  }
}
function validateId(idv) {
  if (idv == "") {
    id.classList.add("empty");
    alert("Please Insert an ID");
    return false;
  } else {
    id.classList.remove("empty");
    return true;
  }
}
function validateName(name) {
  var nameRegex = /^[a-zA-Z\- ]+$/;
  if (nameRegex.test(name) == false) {
    fullName.classList.add("empty");
    alert("Please Enter a valid Name");
    return false;
  } else {
    fullName.classList.remove("empty");
    return true;
  }
}
function validateEmail(em) {
  var emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gi;
  if (emailPattern.test(em) == false) {
    email.classList.add("empty");
    alert("Please Enter a valid Email Pattern");
    return false;
  } else {
    email.classList.remove("empty");
    return true;
  }
}
function validateTel(tele) {
  var telPattern = /^\d{7}$/;
  if (telPattern.test(tele) == false) {
    tel.classList.add("empty");
    alert("Please Enter a valid Phone Number");
    return false;
  } else {
    tel.classList.remove("empty");
    return true;
  }
}
function validateAge(agee) {
  if (agee > 45 || agee == "") {
    alert("Please Enter age lower than 45");
    age.classList.add("empty");
    return false;
  } else {
    age.classList.remove("empty");
    return true;
  }
}
function createTable() {
  var returnedData = JSON.parse(localStorage.getItem("users"));
  var table = document.createElement("table");
  var thead = document.createElement("tr");
  var arr = ["ID", "User Name", "Email", "Telephone", "Age"];
  for (let i = 0; i < arr.length; i++) {
    const element = arr[i];
    var tdata = document.createElement("td");
    tdata.innerText = element;
    thead.appendChild(tdata);
    thead.style.backgroundColor = "aqua";
  }
  table.appendChild(thead);
  for (let i = 0; i < returnedData.length; i++) {
    const user = returnedData[i];
    var row = document.createElement("tr");
    for (const info in user) {
      var cell = document.createElement("td");
      cell.innerText = user[info];
      row.appendChild(cell);
    }
    table.appendChild(row);
  }
  tableResult.appendChild(table);
  return table;
}

function createResult() {
  var result = document.createElement("h1");
  result.innerText = "There is no data found";
  result.classList.add("red");
  tableResult.appendChild(result);
}
