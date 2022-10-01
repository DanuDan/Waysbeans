import React from "react";
import { Container, Navbar} from "react-bootstrap";
import logo from "../assets/Logo.svg";
import AuthModal from "../component/modal/auth";
import { Link } from "react-router-dom";

export default function NavbarLogin() {
  return ( 
    <div>
      <Container>
        <Navbar fixed="top d-flex bg-white justify-content-between">
          <Navbar.Brand className="ms-3 ps-4">
          <Link to="">
            <img src={logo} style={{ maxWidth: "100px" }} alt="logobrand" />
            </Link>
          </Navbar.Brand>
          <AuthModal/>
        </Navbar>
      </Container>
    </div>
  );
}

