// Get the login form element from the DOM so it can be handled programmatically.
const loginForm = document.getElementById("loginForm");

// Find the form's submit button so its state can be updated while login is in progress.
const submitButton = loginForm.querySelector('button[type="submit"]');

// Get the element that will display validation or API error messages to the user.
const errorMessage = document.getElementById("errorMessage");

// Define the async function that runs when the login form is submitted.
async function login(event) {
  // Prevent the browser from submitting the form the normal way.
  event.preventDefault();

  // Clear any previous error text before starting a new submission attempt.
  errorMessage.textContent = "";

  // Disable the submit button and change its text to show the request is processing.
  submitButton.disabled = true;
  submitButton.textContent = "Logging in...";

  // Collect all form field values into a plain object for validation and API submission.
  const formData = new FormData(loginForm);
  const data = Object.fromEntries(formData);

  // Trim whitespace from all string values to avoid accidental validation issues.
  for (const key in data) {
    if (typeof data[key] === "string") {
      data[key] = data[key].trim();
    }
  }

  try {
    // Check that every required field has a value before sending anything to the server.
    if (!data.email || !data.password) {
      throw new Error("All fields are required.");
    }

    // Set the backend endpoint that receives the login request.
    const apiUrl =
      "https://charity-minds-backend.onrender.com/api/v1/auth/login";

    // Send the form data to the API using a JSON POST request.
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    // Parse the JSON response body returned by the server.
    const resData = await response.json();

    // Stop if the server response indicates a failed request.
    if (!response.ok || !resData.success) {
      throw new Error(
        resData.message || "Failed to login. Please try again later.",
      );
    }

    // Log the login message for debugging or confirmation purposes.
    console.log(resData.message);

    localStorage.setItem("auth_logged_in", true);

    // Redirect the user to the dashboard page after successful login.
    window.location.href = "dashboard.html";
  } catch (error) {
    // Log the error to the console for developers and show the message to the user.
    console.error("Error:", error);
    errorMessage.textContent =
      error.message || "An error occurred. Please try again later.";
  } finally {
    // Re-enable the submit button and restore the default text after the request completes.
    submitButton.disabled = false;
    submitButton.textContent = "Login";
  }
}

// Attach the login handler to the form submit event.
loginForm.addEventListener("submit", login);
