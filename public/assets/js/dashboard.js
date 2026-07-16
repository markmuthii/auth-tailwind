const logoutButton = document.getElementById("logout");
const totalUsersElement = document.getElementById("totalUsers");
const usersThisMonthElement = document.getElementById("usersThisMonth");
const usersTableBody = document.getElementById("usersTableBody");

// Define the function that runs when the logout button is clicked.
function logout() {
  // Remove the login state from local storage to log the user out.
  localStorage.removeItem("auth_logged_in");

  window.location.href = "login.html";
}

// Attach the logout function to the click event of the logout button.
logoutButton.addEventListener("click", logout);

async function fetchUserData() {
  // Get the users from the api
  const apiUrl = "https://charity-minds-backend.onrender.com/api/v1/users";

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error("Failed to fetch user data. Please try again later.");
    }

    const resData = await response.json();

    if (!resData.success) {
      throw new Error(
        resData.message || "An error occurred. Please try again later.",
      );
    }

    const users = resData.data;

    populateDashboard(users);
  } catch (error) {
    console.error("Error:", error);
    // Optionally, you can display the error message to the user in the UI.
  } finally {
    // Any cleanup or final steps can be performed here, if necessary.
  }
  // Show the analytics numbers in the dashboard as well as the users data in the table
}

function populateDashboard(users) {
  // Get the analytics numbers from the users data
  populateUserAnalytics(users);

  // Populate the users table with the fetched data
  populateUsersTable(users);
}

function populateUserAnalytics(users) {
  const totalUsers = users.length;
  const usersThisMonth = users.filter((user) => {
    const createdAt = new Date(user.createdAt);
    const now = new Date();
    return (
      createdAt.getMonth() === now.getMonth() &&
      createdAt.getFullYear() === now.getFullYear()
    );
  });
  const totalUsersThisMonth = usersThisMonth.length;

  totalUsersElement.textContent = totalUsers;
  usersThisMonthElement.textContent = totalUsersThisMonth;
}

function populateUsersTable(users) {
  usersTableBody.innerHTML = ""; // Clear existing rows
  users.forEach((user) => {
    const userRow = `
        <tr>
          <td class="px-6 py-4">${user.firstName}</td>
          <td class="px-6 py-4">${user.lastName}</td>
          <td class="px-6 py-4">${user.username}</td>
          <td class="px-6 py-4">${user.email}</td>
          <td class="px-6 py-4">${user.phone}</td>
          <td class="px-6 py-4">${user.dob}</td>
          <td class="px-6 py-4">${user.gender}</td>
          <td class="px-6 py-4">${user.createdAt}</td>
        </tr>
      `;

    usersTableBody.innerHTML += userRow;
  });
}

window.onload = fetchUserData;
