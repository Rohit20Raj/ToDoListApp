import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const Navbar = () => {
  let navigate = useNavigate();
  const handleLogout = ()=>{
    localStorage.removeItem('token');
    navigate('/login');
  }

  let location = useLocation();
  return (
    <div>
      <nav className="navbar navbar-expand-sm bg-info">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Done'n'Dusted</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-0 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === '/' ? 'active text-light' : ''}`} aria-current="page" to="/">Home</Link>
              </li>

              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === '/about' ? 'active text-light' : ''}`} aria-current="page" to="/about">About</Link>
              </li>

            </ul>
            {!localStorage.getItem('token') ? <form className="d-flex">
              <Link to="/login" className="btn btn-primary mx-1" tabIndex="-1" role="button" aria-disabled="true">Login</Link>
              <Link to="/signup" className="btn btn-primary mx-1" tabIndex="-1" role="button" aria-disabled="true">SignUp</Link>
            </form> : <button onClick={handleLogout} className='btn btn-primary'>Logout</button>}

          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar