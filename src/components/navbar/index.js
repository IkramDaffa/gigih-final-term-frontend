import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
  Container,
} from "reactstrap";

function MyNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  return (
    <div className="navbar-container">
      <Container>
        <Navbar color="dark" dark="true" expand="md" fixed="top">
          <NavbarBrand href="/">TokoPlay</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="me-auto" navbar>
              <NavItem>
                <NavLink href="/">Home</NavLink>
              </NavItem>
            </Nav>
            <NavbarText>Welcome</NavbarText>
          </Collapse>
        </Navbar>
      </Container>
    </div>
  );
}

export default MyNavbar;
