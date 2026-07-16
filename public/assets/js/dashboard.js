const logoutButton = document.getElementById("logout");

// Define the function that runs when the logout button is clicked.
function logout() {
  // Remove the login state from local storage to log the user out.
  localStorage.removeItem("auth_logged_in");

  window.location.href = "login.html";
}

// Attach the logout function to the click event of the logout button.
logoutButton.addEventListener("click", logout);
