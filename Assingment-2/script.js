// ---------------------- FORM VALIDATION ----------------------

document.getElementById("registerForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const password = document.getElementById("password").value.trim();
  const confirmPassword = document.getElementById("confirmPassword").value.trim();
  const message = document.getElementById("message");
  message.style.color = "red";
  message.textContent = "";

  if (!username || !email || !phone || !password || !confirmPassword) {
    message.textContent = "All fields are required!";
    return;
  }

  const phoneRegex = /^[0-9]{10}$/;
  if (!phoneRegex.test(phone)) {
    message.textContent = "Phone number must be 10 digits and numeric only!";
    return;
  }

  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z]{3}\.[A-Za-z]{2,3}$/;
  if (!emailRegex.test(email)) {
    message.textContent = "Invalid email format!";
    return;
  }

  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[&$#@])[A-Za-z\d&$#@]{7,}$/;
  if (!passwordRegex.test(password)) {
    message.textContent =
      "Password must have 7+ chars, 1 uppercase, 1 digit & 1 special char (&,$,#,@)";
    return;
  }

  if (password !== confirmPassword) {
    message.textContent = "Passwords do not match!";
    return;
  }

  message.style.color = "green";
  message.textContent = "Registration successful!";
});


// ---------------------- COOKIE EXAMPLE ----------------------

document.getElementById("saveCookieButton").addEventListener("click", function () {
  const username = document.getElementById("username").value.trim();
  if (username === "") {
    alert("Enter a username first!");
    return;
  }
  document.cookie = "username=" + username + "; path=/;";
  alert("Cookie saved! Username = " + username);
});


// ---------------------- DOM MANIPULATION ----------------------

document.getElementById("btnChangeText").addEventListener("click", function () {
  const p = document.getElementById("domText");
  p.innerHTML = "Text has been changed using DOM manipulation!";
  p.style.color = "blue";
});

document.getElementById("btnChangeImage").addEventListener("click", function () {
  const img = document.getElementById("demoImg");
  img.src = "https://via.placeholder.com/200x120?text=Image2";
});

document.getElementById("btnAddNode").addEventListener("click", function () {
  const newNode = document.createElement("p");
  const textNode = document.createTextNode("This is a new dynamically added node!");
  newNode.appendChild(textNode);
  document.body.appendChild(newNode);
});

document.getElementById("btnRemoveNode").addEventListener("click", function () {
  const node = document.getElementById("domText");
  if (node) node.remove();
});


// ---------------------- jQuery SECTION ----------------------

$(document).ready(function () {
  // Change button text
  $("#btnChangeText").click(function () {
    $(this).text("Text Changed (via jQuery too!)");
  });

  // Change background
  $("body").css("background-image", "linear-gradient(to right, #f8f9fa, #d6e4ff)");

  // Access form data
  $("#registerForm").on("submit", function () {
    const formData = $(this).serializeArray();
    console.log("Form Data via jQuery:", formData);
  });

  // Add an attribute using jQuery
  $("#demoImg").attr("title", "Dynamic Image added via jQuery");
});
