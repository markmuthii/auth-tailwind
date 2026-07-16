window.onload = function () {
  const isLoggedIn = localStorage.getItem("auth_logged_in");
  if (!isLoggedIn && window.location.pathname === "/dashboard.html") {
    // Redirect to the login page if the user is not logged in.
    window.location.href = "login.html";
  }

  if (
    isLoggedIn &&
    (window.location.pathname === "/login.html" ||
      window.location.pathname === "/register.html")
  ) {
    // Redirect to the dashboard page if the user is already logged in.
    window.location.href = "dashboard.html";
  }

  if (isLoggedIn && window.location.pathname === "/index.html") {
    const indexNav = document.getElementById("indexNav");
    if (indexNav) {
      indexNav.innerHTML = `
        <a href="dashboard.html" class="transition hover:text-white">Dashboard</a>
        <button id="logout" class="rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-300 transition hover:border-cyan-400 hover:text-white">Logout</button>
      `;
    }

    const logoutButton = document.getElementById("logout");

    // Define the function that runs when the logout button is clicked.
    function logout() {
      // Remove the login state from local storage to log the user out.
      localStorage.removeItem("auth_logged_in");

      window.location.href = "login.html";
    }

    // Attach the logout function to the click event of the logout button.
    logoutButton.addEventListener("click", logout);
  }
};
