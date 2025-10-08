import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Car, Users, Calendar, Home } from "lucide-react";
import "./Layout.css";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Dashboard", icon: Home },
    { path: "/customers", label: "Clientes", icon: Users },
    { path: "/vehicles", label: "Veículos", icon: Car },
    { path: "/rentals", label: "Locações", icon: Calendar },
    { path: "/customer-area", label: "Área do Cliente", icon: Users },
  ];

  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>Locadora</h2>
        </div>
        <nav className="sidebar-nav">
          {navItems.map(({ path, label, icon: Icon }) => (
            <Link
              key={path}
              to={path}
              className={`nav-item ${
                location.pathname === path ? "active" : ""
              }`}
            >
              <Icon size={20} />
              <span>{label}</span>
            </Link>
          ))}
        </nav>
      </aside>
      <main className="main-content">{children}</main>
    </div>
  );
};

export default Layout;
