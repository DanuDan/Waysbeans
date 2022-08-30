import React from "react";
import { Container, Navbar} from "react-bootstrap";
import logo from "../assets/Logo.svg";
import { FaBeer } from 'react-icons/fa'

export default function NavbarAdmin(){
    return(
        <div>  
            
              <Navbar fixed="top d-flex bg-white justify-content-between">
          <Navbar.Brand className="ms-3 ps-5">
            <Link to="/admin">
              <img src={logo} style={{ maxWidth: "70px" }} alt="logobrand" />
            </Link>
          </Navbar.Brand>
          <Nav>
            <Nav.Link className="align-item-center justify-content-center me-5 pe-5 fw-bolder text-danger">
              <NavDropdown title={profilToggle}>
                <Dropdown.Item className="text-danger">
                  <Link
                    to="/add-product"
                    className="text-decoration-none text-danger"
                  >
                    <FaBeer/>
                    <span> Add Product</span>
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item className="text-danger">
                  <Link
                    to="/add-toping"
                    className="text-decoration-none text-danger"
                  >
                    {toppingIcon}
                    <span> Add Topping</span>
                  </Link>
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item className="text-danger">
                  {logoutIcon}
                  <span onClick={logout}> Logout</span>
                </Dropdown.Item>
              </NavDropdown>
            </Nav.Link>
          </Nav>
        </Navbar>
        </div>
    );
}