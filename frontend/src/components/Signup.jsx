import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

// const host = "http://localhost:5000";
const host = "http://localhost:5000";

const Signup = (props) => {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", confpassword: "" });
  // let history = unstable_HistoryRouter();
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = credentials;
    const response = await fetch(`${host}/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      // Save the auth-token and redirect
      localStorage.setItem('token', json.authToken);
      props.showAlert("Account created successfully", "success");
      navigate('/');
    }
    else {
      // alert("Invalid username/password");
      props.showAlert("Invalids credentials", "danger");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div className='container my-4'>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Your Name</label>
          <input type="text" className="form-control" id="name" name='name' aria-describedby="emailHelp" onChange={onChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" onChange={onChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name='password' onChange={onChange} minLength={5} required />
        </div>
        <div className="mb-3">
          <label htmlFor="confpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="confpassword" name='confpassword' onChange={onChange} minLength={5} required />
        </div>

        <button type="submit" className="btn btn-primary">SignUp</button>
      </form>
    </div>
  )
}

export default Signup