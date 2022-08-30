import React from "react";
import { Container, Navbar} from "react-bootstrap";
import logo from "../assets/Logo.svg";
import AuthModal from "../component/modal/auth";

export default function NavbarLogin() {
  return ( 
    <div>
      <Container>
        <Navbar fixed="top d-flex bg-white justify-content-between">
          <Navbar.Brand className="ms-3 ps-5">
            <img src={logo} style={{ maxWidth: "100px" }} alt="logobrand" />
          </Navbar.Brand>
          <AuthModal/>
        </Navbar>
      </Container>
    </div>
  );
}

