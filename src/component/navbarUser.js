import React, { useContext, useState } from "react";
import { Container, Dropdown, Image, Nav, Navbar, NavDropdown } from "react-bootstrap";
import logo from "../assets/Logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";

export default function NavbarUser({show}){

    // const [state, dispatch] = useContext(UserContext);

    // let navigate = useNavigate();
  
    // const logout = () => {
    //   dispatch({
    //     type: "LOGOUT",
    //   });
    //   navigate("/");
    // };
    return (
        <div>
            <Container>
        <Navbar fixed="top d-flex bg-white justify-content-between">
          <Navbar.Brand className="ms-3 ps-5">
            <Link to="/">
              <img src={logo} style={{ maxWidth: "70px" }} alt="logobrand" />
            </Link>
          </Navbar.Brand>
          <Nav>
            <Nav.Link className="me-3 mt-2 text-danger">
              <Link to="/cart" className="text-decoration-none">
                <img src='' alt="" style={{ maxWidth: "40px" }} /> <span className="notif text-danger fw-bold py-1 px-2" style={{backgroundColor:"red"}}>{show}</span>
              </Link>
            </Nav.Link>
            <Nav.Link className="align-item-center justify-content-center me-5 pe-5 fw-bolder text-danger">
              <NavDropdown title=''>
                <Dropdown.Item className="text-danger">
                  <Link
                    to="/profile"
                    className="text-danger text-decoration-none"
                  >
                    <span> Profile</span>
                  </Link>
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item className="text-danger">
                  ''
                  <span  onClick=""> Logout</span>
                </Dropdown.Item>
              </NavDropdown>
            </Nav.Link>
          </Nav>
        </Navbar>
        </Container>
     </div>
    )
}