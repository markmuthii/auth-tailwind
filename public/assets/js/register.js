// Get the registration form element from the DOM so it can be handled programmatically.
const registerForm = document.getElementById("registrationForm");

// Find the form's submit button so its state can be updated while registration is in progress.
const submitButton = registerForm.querySelector('button[type="submit"]');

// Get the element that will display validation or API error messages to the user.
const errorMessage = document.getElementById("errorMessage");

// Define the async function that runs when the registration form is submitted.
async function register(event) {
  // Prevent the browser from submitting the form the normal way.
  event.preventDefault();

  // Clear any previous error text before starting a new submission attempt.
  errorMessage.textContent = "";

  // Disable the submit button and change its text to show the request is processing.
  submitButton.disabled = true;
  submitButton.textContent = "Registering...";

  // Collect all form field values into a plain object for validation and API submission.
  const formData = new FormData(registerForm);
  const data = Object.fromEntries(formData);

  // Trim whitespace from all string values to avoid accidental validation issues.
  for (const key in data) {
    if (typeof data[key] === "string") {
      data[key] = data[key].trim();
    }
  }

  try {
    // Check that every required field has a value before sending anything to the server.
    if (
      !data.firstName ||
      !data.lastName ||
      !data.username ||
      !data.email ||
      !data.phone ||
      !data.dob ||
      !data.gender ||
      !data.password ||
      !data.confirmPassword
    ) {
      throw new Error("All fields are required.");
    }

    // Define the allowed Kenyan phone number format for the registration form.
    const phoneRegex = /^\+254(?:7\d{8}|1\d{8})$/;

    // Validate the phone number using the regular expression.
    if (!phoneRegex.test(data.phone)) {
      throw new Error("Please enter a valid phone number.");
    }

    // Define a basic email pattern to ensure the address looks valid.
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validate the email format before submitting the request.
    if (!emailRegex.test(data.email)) {
      throw new Error("Please enter a valid email address.");
    }

    // Confirm that both password fields match exactly.
    if (data.password !== data.confirmPassword) {
      throw new Error("Passwords do not match.");
    }

    // Set the backend endpoint that receives the registration request.
    const apiUrl =
      "https://charity-minds-backend.onrender.com/api/v1/auth/register";

    // Send the form data to the API using a JSON POST request.
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    // Stop if the server response indicates a failed request.
    if (!response.ok) {
      throw new Error("Failed to register. Please try again later.");
    }

    // Parse the JSON response body returned by the server.
    const resData = await response.json();

    // Check whether the API reports success before redirecting the user.
    if (!resData.success) {
      throw new Error(
        resData.message || "An error occurred. Please try again later.",
      );
    }

    // Log the created user data for debugging or confirmation purposes.
    console.log(resData.user);

    // Redirect the user to the login page after successful registration.
    window.location.href = "login.html";
  } catch (error) {
    // Log the error to the console for developers and show the message to the user.
    console.error("Error:", error);
    errorMessage.textContent =
      error.message || "An error occurred. Please try again later.";
  } finally {
    // Re-enable the submit button and restore the default text after the request completes.
    submitButton.disabled = false;
    submitButton.textContent = "Create account";
  }
}

// Attach the registration handler to the form submit event.
registerForm.addEventListener("submit", register);
