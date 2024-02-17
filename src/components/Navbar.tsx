import { Link, NavLink } from "react-router-dom";
import { BiShoppingBag } from "react-icons/bi";
import logo from "../assets/logo.png";

export default function Navbar() {
  const links = [
    {
      label: "Home",
      url: "/",
    },
    {
      label: "Products",
      url: "/products",
    },
    {
      label: "About",
      url: "/about",
    },
  ];

  return (
    <nav className="flex items-center justify-between px-8 py-1">
      {/* Site Logo */}
      <div className="font-mono text-3xl font-extrabold uppercase">
        <Link to="/">
          <img className="h-10" src={logo} alt="Medusa" />
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="space-x-4">
        {links.map((link, index) => (
          <NavLink key={index} to={link.url} className="navlink">
            {link.label}
          </NavLink>
        ))}
      </div>

      {/* Shopping Cart Indicator/Checkout Link */}
      <div className="font-semibold text-gray-600 hover:text-emerald-500">
        <NavLink
          to="/checkout"
          className="inline-flex items-center space-x-1 transition-colors duration-300"
        >
          <BiShoppingBag className="text-xl" /> <span>0</span>
        </NavLink>
      </div>
    </nav>
  );
}