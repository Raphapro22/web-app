const signInForm = document.getElementById('signInForm');
const userInfoTable = document.getElementById('userInfoTable');
const successMessage = document.getElementById('successMessage');
let userInfos = [];

signInForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const name = document.getElementById('nameInput').value.trim();
  const email = document.getElementById('emailInput').value.trim();
  const phone = document.getElementById('phoneInput').value.trim();

  // Input Validation 
  if (!name || !email || !phone) {
    alert("Please fill in all fields.");
    return;
  }

  if (!email.includes('.') || !email.includes('@')) {
    alert("Please enter a valid email address.");
    return;
  }

  if (name.length > 30) {
    alert("Name cannot exceed 30 characters.");
    return; 
  }
  if (email.length > 35) { 
    alert("Email cannot exceed 35 characters.");
    return; 
  }

  if (phone.length > 9) {
    alert("Phone number cannot exceed 9 digits.");
    return; 
  }

  // Check for duplicates (email and phone)
  if (userInfos.some(user => user.email === email || user.phone === phone)) {
    alert("Email or Phone number already exists in the list.");
    return;
  }

  // If all validations pass, add the user information to the array
  userInfos.push({ name: name, email: email, phone: phone });

  // Update the table with the new user information
  createUserInfoTable(); // You'll need to define this function

  // Clear the input fields
  document.getElementById('nameInput').value = "";
  document.getElementById('emailInput').value = "";
  document.getElementById('phoneInput').value = "";

  // Hide the form
  signInForm.style.display = 'none';

  // Show the success message
  successMessage.style.display = 'block';
});

// Function to create the user info table (you'll need to implement this)
function createUserInfoTable() {
  // ... (Implementation to create the table with user data)
}
