import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// const host = "http://localhost:5000";
const host = "https://todolistapp-np4v.onrender.com";

const Login = (props) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  // let history = unstable_HistoryRouter();
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${host}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    // console.log(json);
    if (json.success) {
      // Save the auth-token and redirect
      localStorage.setItem('token', json.authToken);
      props.showAlert("LoggedIn successfully", "success");
      navigate('/');
    }
    else {
      // alert("Invalid username/password");
      props.showAlert("Invalid username or password", "danger");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container my-3">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            value={credentials.email}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={credentials.password}
            onChange={onChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
