function validateUserInput({ name, email, password }) {
    const errors = [];
  
    if (!name) {
      errors.push("Name is required.");
    }
  
    if (!email) {
      errors.push("Email is required.");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      // Simple regex for email validation
      errors.push("Email is invalid.");
    }
  
    if (!password) {
      errors.push("Password is required.");
    } else if (password.length < 6) {
      errors.push("Password must be at least 6 characters long.");
    }
  
    return errors;
  }
  
  
  
  
  export { validateUserInput};