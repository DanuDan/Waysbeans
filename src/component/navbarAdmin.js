import React, { useContext } from "react";
import { UserContext } from "../context/userContext";
import { Image, Nav, Dropdown, NavDropdown, Navbar} from "react-bootstrap";
import logo from "../assets/Logo.svg";
import {GiCoffeeBeans} from 'react-icons/gi'
import {MdLogout} from 'react-icons/md'
import { Link, useNavigate } from "react-router-dom";
import profilePic from '../assets/JasonMomoa.jpg'

export default function NavbarAdmin(){
    const picProfileToggle = <Image src = {profilePic} width="50px" height="50px" className="rounded-circle"/>
   
    const [state, dispatch] = useContext(UserContext);

    let navigate = useNavigate();
  
    const logout = () => {
      dispatch({
        type: "LOGOUT",
      });
      navigate("/");
    }
    return(
        <div>  

              <Navbar fixed="top d-flex bg-white justify-content-between shadow-lg ">
          <Navbar.Brand className="ps-5">
            <Link to="/IncomeTransaction">
              <img src={logo} style={{ maxWidth: "100px" }} alt="logobrand" />
            </Link>
          </Navbar.Brand>
          <Nav>
            <Nav.Link className="me-2 pe-2 fw-bolder brown">
              <NavDropdown title={picProfileToggle} className="me-5">
                <Dropdown.Item className="brown" >
                  <Link 
                    to="/add-product"
                    className="text-decoration-none brown fw-semibold"
                  >
                    <GiCoffeeBeans className="me-2"/>
                    <span> Add Product</span>
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item className="brown">
                  <Link
                    to="/ListProduct"
                    className="text-decoration-none brown fw-semibold"
                  >
                    <GiCoffeeBeans className="me-2"/>
                    <span> List Product</span>
                  </Link>
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item className="brown fw-semibold">
                  <MdLogout className="me-2" color="red"/>
                  <span onClick={logout}> Logout</span>
                </Dropdown.Item>
              </NavDropdown>
            </Nav.Link>
          </Nav>
        </Navbar>
        </div>
    );
}