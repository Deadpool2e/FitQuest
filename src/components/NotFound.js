import React from 'react'
import { NavLink } from 'react-router-dom'

const NotFound = () => {
    console.log("hello");
  return (
    <div>
      {/* <NavLink to="/" className="navbar-brand ml-2">
        <img src={logo} alt="CampusStreet" />
      </NavLink> */}
      <div>
        <h1>404 ! Page Not Found</h1>
        <p>This Page Doesn't Exist! Go Back To</p>
        <br></br>

        <NavLink to="/">
          {" "}
          <button className=" btn btn-secondary">Home Page</button>
        </NavLink>
      </div>
    </div>
  )
}

export default NotFound