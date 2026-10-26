import { useState } from "react";
import "./RegistrationForm.css";

function RegistrationForm() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Password:", password);

    alert("Registration Successful");
  };

  return (
    <div className="container">

      <form onSubmit={handleSubmit}>

        <h2>Registration Form</h2>

        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">
          Register
        </button>

      </form>

    </div>
  );
}

export default RegistrationForm;