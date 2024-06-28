import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./css/styles.css";
import { ApiUrl } from "./API/Api";

function Header() {
  const [menuData, setMenuData] = useState([]);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const response = await fetch(`${ApiUrl}/get/menus`);
        const data = await response.json();
        setMenuData(data);
      } catch (error) {
        console.error("Error fetching menu data:", error);
      }
    };

    fetchMenus();
  }, []);

  const toggleMobileMenu = (isOpen) => {
    setMobileMenuOpen(isOpen);
  };
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const [openmultiSubMenu, setopenmultiSubMenu] = useState(null);

  const handleSubMenuToggle = (id) => {
    setOpenSubMenu((prevOpenSubMenu) => (prevOpenSubMenu === id ? null : id));
  };

  const handlemultiSubMenuToggle = (id) => {
    setopenmultiSubMenu((pre) => (pre === id ? null : id));
  };

  const renderSubMenu = (subMenuData) => {
    return (
      <ul className="dropdown-menu">
        {subMenuData.map((subItem) => (
          <li key={subItem.id}>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a
              className="dropdown-item"
              onClick={() => {
                handlemultiSubMenuToggle(subItem.id);
                !subItem.subchildren && handleNavigate(subItem.url);
              }}
            >
              {subItem.label}
            </a>
            {subItem.subchildren &&
              openmultiSubMenu === subItem.id &&
              renderSubMenu(subItem.subchildren)}
          </li>
        ))}
      </ul>
    );
  };

  const handleNavigate = (link) => {
    navigate(link);
    toggleMobileMenu(false);
  };

  return (
    <>
      {/* Desktop View */}
      <header className="site-header">
        <div className="top-header-bar">
          <div className="container">
            <div className="row flex-wrap justify-content-center justify-content-lg-between align-items-lg-center">
              <div className="col-12 col-lg-8 d-none d-md-flex flex-wrap justify-content-center justify-content-lg-start mb-3 mb-lg-0">
                <div className="header-bar-email" style={{ fontSize: "13px" }}>
                  <i
                    className="fa fa-envelope"
                    style={{ color: "#f6c93f" }}
                  ></i>
                  <a href="mailto:bpjohannesocd@gmail.com">
                    <span
                      className="__cf_email__"
                      style={{ marginLeft: "0.5rem" }}
                    >
                      bpjohannesocd@gmail.com
                    </span>
                  </a>
                </div>
                <div
                  className="header-bar-text align-items-center justify-content-center"
                  style={{ fontSize: "13px" }}
                >
                  <i className="fa fa-phone" style={{ color: "#f6c93f" }}></i>
                  <a href="tel:+9109645279101" style={{ marginLeft: "0.3rem" }}>
                    09645279101
                  </a>
                </div>
              </div>
              <div className="col-12 col-lg-4 d-flex flex-wrap justify-content-center justify-content-lg-end align-items-center">
                <div className="social-icons">
                  <div className="social-icon">
                    <a
                      href="/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <i className="fab fa-facebook" />
                    </a>
                  </div>
                  <div className="social-icon">
                    <a
                      href="/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <i className="fab fa-youtube" />
                    </a>
                  </div>
                  <div className="social-icon">
                    <a
                      href="/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <i className="fab fa-instagram" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <section id="sp-section-3">
          <div className="container-fluid col-xs-12 col-sm-12 col-md-12 p-0">
            <img
              src="images/all-img/logobanner.jpg"
              alt="Banner"
              className="w-100"
            />
          </div>
        </section>
        <div className="main-navigation-container d-none d-lg-block">
          <nav
            className="navbar navbar-expand-lg navbar-light custom-menu"
            style={{ height: "51px", zIndex: "9" }}
          >
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse header-align-center"
              id="navbarNav"
            >
              <ul className="main-navigation">
                {menuData.map((item) => (
                  <li key={item.id}>
                    <NavLink to={item.url}>{item.label}</NavLink>
                    {item.children && (
                      <ul>
                        {item.children.map((child) => (
                          <li key={child.id}>
                            <NavLink to={child.url}>{child.label}</NavLink>
                            {child.subchildren && (
                              <ul>
                                {child.subchildren.map((subchild) => (
                                  <li key={subchild.id}>
                                    <NavLink to={`${subchild.url}`}>
                                      {subchild.label}
                                    </NavLink>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile View */}
      <div
        className="d-block d-lg-none "
        style={{ backgroundColor: "rgb(13 69 113)" }}
      >
        <button
          className="btn btn-success"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasExample"
          aria-controls="offcanvasExample"
          onClick={() => toggleMobileMenu(true)}
          style={{ background: "#f6c93f" }}
        >
          <i className="fa fa-bars"></i>
        </button>
        <div
          className={`offcanvas offcanvas-start ${isMobileMenuOpen ? "show" : " "
            }`}
          tabIndex="-1"
          data-bs-backdrop={false}
          id="offcanvasExample"
          aria-labelledby="offcanvasExampleLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasExampleLabel">
              Diocese of Kurnool
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
              onClick={() => toggleMobileMenu(false)}
            ></button>
          </div>
          <div className="offcanvas-body mobileview">
            <ul className="nav">
              {menuData.map((item) => (
                <li
                  key={item.id}
                  className={`nav-item dropdown ${openSubMenu === item.id ? "active" : ""
                    }`}
                >
                  {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                  <a
                    className={`nav-link`}
                    onClick={() => {
                      handleSubMenuToggle(item.id);
                      !item?.children?.length > 0 && handleNavigate(item?.url);
                    }}
                  >
                    {item.label}
                  </a>
                  {item.children &&
                    openSubMenu === item.id &&
                    renderSubMenu(item.children)}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
