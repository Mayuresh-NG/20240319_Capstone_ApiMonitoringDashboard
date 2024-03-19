const validateInputs = (userData) => {
  const { email, password } = userData;

  // Validate email
  if (email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Please provide a valid email address.";
    }
  }

  // Validate password
  if (!password || typeof password !== "string" || password.length < 6) {
    return "Password must be a string with at least 6 characters.";
  }

  const passwordComplexityRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;
  if (!passwordComplexityRegex.test(password)) {
    return "Password must include at least one uppercase letter, one lowercase letter, and one digit.";
  }
  // No validation errors
  return null;
};

module.exports = { validateInputs };
