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
};
