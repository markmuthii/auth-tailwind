const registerForm = document.getElementById("registrationForm");
const firstNameInput = document.getElementById("firstName");
const lastNameInput = document.getElementById("lastName");
const usernameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const dobInput = document.getElementById("dob");
const genderInput = document.getElementById("gender");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");

// Submit button
const submitButton = registerForm.querySelector('button[type="submit"]');

const errorMessage = document.getElementById("errorMessage");

async function register(event) {
  event.preventDefault();
  errorMessage.textContent = ""; // Clear any previous error messages
  submitButton.disabled = true; // Disable the submit button to prevent multiple submissions
  submitButton.textContent = "Registering..."; // Change button text to indicate loading

  // Get the data from the form
  const formData = new FormData(registerForm);
  const data = Object.fromEntries(formData);

  try {
    // Validate the data
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

    const phoneRegex = /^\+254(?:7\d{8}|1\d{8})$/;

    if (!phoneRegex.test(data.phone)) {
      throw new Error("Please enter a valid phone number.");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(data.email)) {
      throw new Error("Please enter a valid email address.");
    }

    if (data.password !== data.confirmPassword) {
      throw new Error("Passwords do not match.");
    }

    // Call the API and send the data
    const apiUrl =
      "https://charity-minds-backend.onrender.com/api/v1/auth/register";

    // Handle the response from the API
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to register. Please try again later.");
    }

    const resData = await response.json();
    if (!resData.success) {
      throw new Error(
        resData.message || "An error occurred. Please try again later.",
      );
    }

    // Registration successful, redirect to login page
    console.log(resData.user);

    window.location.href = "login.html";
  } catch (error) {
    console.error("Error:", error);
    errorMessage.textContent =
      error.message || "An error occurred. Please try again later.";
  } finally {
    submitButton.disabled = false; // Re-enable the submit button
    submitButton.textContent = "Create account"; // Change button text back to original
  }
}

registerForm.addEventListener("submit", register);
