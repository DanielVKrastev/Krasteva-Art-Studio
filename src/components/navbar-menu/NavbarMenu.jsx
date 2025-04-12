import { Link } from 'react-router-dom';
import { Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from "flowbite-react";

export default function NavbarMenu() {
  return (
    <Navbar fluid rounded>
      <NavbarBrand as={Link} to="https://flowbite-react.com">
        <img src="./vite.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Flowbite React</span>
      </NavbarBrand>
      <NavbarToggle />
      <NavbarCollapse>
        <NavbarLink to="#" active>
          Home
        </NavbarLink>
        <NavbarLink as={Link} to="#">
          About
        </NavbarLink>
        <NavbarLink to="#">Services</NavbarLink>
        <NavbarLink to="#">Pricing</NavbarLink>
        <NavbarLink to="#">Contact</NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
}
