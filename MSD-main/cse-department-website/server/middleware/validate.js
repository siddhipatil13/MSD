// Server-side validation helpers.
// Written without extra libraries so the logic is easy to explain in a viva.

const validators = {
  isRequired(value, label) {
    if (value === undefined || value === null || String(value).trim() === "") {
      return `${label} is required`;
    }
    return null;
  },
  isEmail(value, label = "Email") {
    if (!/^\S+@\S+\.\S+$/.test(value || "")) {
      return `Please enter a valid ${label.toLowerCase()}`;
    }
    return null;
  },
  maxLength(value, max, label) {
    if (value && String(value).length > max) {
      return `${label} must be at most ${max} characters`;
    }
    return null;
  },
  isIn(value, allowed, label) {
    if (!allowed.includes(value)) {
      return `${label} must be one of: ${allowed.join(", ")}`;
    }
    return null;
  },
};

// Builds an Express middleware that checks the listed fields of req.body.
// Example: validateBody({ title: "Title", email: "Email" })
function validateBody(rules) {
  return (req, res, next) => {
    const errors = [];
    for (const [field, label] of Object.entries(rules)) {
      const value = req.body ? req.body[field] : undefined;
      const error = validators.isRequired(value, label);
      if (error) {
        errors.push(error);
        continue;
      }
      if (field === "email") {
        const emailError = validators.isEmail(value, label);
        if (emailError) errors.push(emailError);
      }
      const longError = validators.maxLength(value, 2000, label);
      if (longError) errors.push(longError);
    }

    if (errors.length > 0) {
      return res.status(400).json({ success: false, errors });
    }
    next();
  };
}

module.exports = { validators, validateBody };
