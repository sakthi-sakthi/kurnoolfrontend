import React, { useState } from 'react';
import { Collapse } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import './css/styles.css';

const Header = ({ menudata }) => {
  const location = useLocation();
  const url = location.pathname;

  const [activeMenu, setActiveMenu] = useState(null);
  const [activeSubMenu, setActiveSubMenu] = useState(null);

  const handleMenuClick = (index) => {
    setActiveMenu(activeMenu === index ? null : index);
  };

  const handleSubMenuClick = (index) => {
    setActiveSubMenu(activeSubMenu === index ? null : index);
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
                <button className="btn btn-success btn-sm donate-btn ml-3" id='btnmore'>
                  <i className="fas fa-donate"></i> Donation
                </button>
              </div>
            </div>
          </div>
        </div>
        <section id="sp-section-3">
          <div className="container-fluid col-xs-12 col-sm-12 col-md-12 p-0 d-none d-lg-block">
            <img
              src="images/all-img/updatebanner.jpg"
              alt="Banner"
              className="w-100"
            />
          </div>
          <div className="container-fluid col-xs-12 col-sm-12 col-md-12 p-0 d-lg-none">
            <img
              src="images/all-img/mainmobile.jpg"
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
                {menudata?.map((menuItem, index) => (
                  <li key={index} className={menuItem.children ? 'menu-item-has-children' : 'menu-item'}>
                    {menuItem.children ? (
                      <Link to={menuItem.url} className={`${menuItem.children.some(child => url.includes(child.url)) ? "activemain" : ""}`}>
                        {menuItem.label}
                      </Link>
                    ) : (
                      <Link to={menuItem.url} className={`${url === menuItem.url ? "activemain" : ""}`} style={{ whiteSpace: 'nowrap' }} >
                        {menuItem.label}
                      </Link>
                    )}
                    {menuItem.children && (
                      <ul className="sub-menu">
                        {menuItem.children?.map((subItem, subIndex) => (
                          <li key={subIndex} className={subItem.subchildren ? 'menu-item-has-children' : 'menu-item'}>
                            <Link to={subItem.url}>
                              {subItem.label}
                            </Link>
                            {subItem.subchildren && (
                              <ul className="sub-menu">
                                {subItem.subchildren.map((childSubItem, childSubIndex) => (
                                  <li key={childSubIndex} className="menu-item">
                                    <Link to={childSubItem.url}>
                                      {childSubItem.label}
                                    </Link>
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
          data-bs-target="#offcanvasScrolling"
          aria-controls="offcanvasScrolling"
          style={{ background: "#f6c93f" }}
        >
          <i className="fa fa-bars"></i>
        </button>
        <div className="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" tabIndex={-1} id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
          <div className="offcanvas-header">
            <h5 className="text-center">Diocese of Kurnool - Andhra Pradesh</h5>
            <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div className="offcanvas-body">
            <div className="nav-bar">
              <ul style={{ listStyleType: 'none', padding: 0 }}>
                {menudata?.map((menuItem, index) => (
                  <li key={index} className={menuItem.children ? 'menu-item-has-children' : 'menu-item'} style={{ display: 'block', position: 'relative' }}>
                    {menuItem.children ? (
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img src='images/all-img/tick.png' style={{ width: '13px', height: '13px', marginRight: '5px' }} alt='tick'/>
                        <a href={() => false} onClick={() => handleMenuClick(index)} style={{ display: 'block', padding: '10px', textDecoration: 'none', color: 'black' }}>{menuItem.label}</a>
                      </div>
                    ) : (
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img src='images/all-img/tick.png' style={{ width: '13px', height: '13px', marginRight: '5px' }} alt='tick'/>
                        <a href={menuItem.url} style={{ display: 'block', padding: '10px', textDecoration: 'none', color: 'black' }}>{menuItem.label}</a>
                      </div>
                    )}
                    {menuItem.children && (
                      <Collapse in={activeMenu === index}>
                        <ul className="sub-menu" style={{ listStyleType: 'none', padding: 0, position: 'absolute', top: '100%', left: '0', zIndex: 1, backgroundColor: 'lightgray', borderRadius: '5px', boxShadow: '0 2px 5px rgba(0,0,0,0.2)' }}>
                          {menuItem.children.map((subItem, subIndex) => (
                            <li key={subIndex} className={subItem.subchildren ? 'menu-item-has-children' : 'menu-item'} style={{ display: 'block', position: 'relative' }}>
                              {subItem.subchildren ? (
                                <a href={() => false} onClick={(e) => { e.preventDefault(); handleSubMenuClick(subIndex); }} style={{ display: 'block', padding: '10px', textDecoration: 'none', color: 'black' }}>{subItem.label}</a>
                              ) : (
                                <a href={subItem.url} style={{ display: 'block', padding: '10px', textDecoration: 'none', color: 'black' }}>{subItem.label}</a>
                              )}
                              {subItem.subchildren && (
                                <Collapse in={activeSubMenu === subIndex}>
                                  <ul className="sub-menu" style={{ listStyleType: 'none', padding: 0, position: 'absolute', top: '0', left: '100%', zIndex: 1, backgroundColor: 'lightgray', borderRadius: '5px', boxShadow: '0 2px 5px rgba(0,0,0,0.2)' }}>
                                    {subItem.subchildren.map((childSubItem, childSubIndex) => (
                                      <li key={childSubIndex} className="menu-item" style={{ display: 'block' }}>
                                        <a href={childSubItem.url} style={{ display: 'block', padding: '10px', textDecoration: 'none', color: 'black' }}>{childSubItem.label}</a>
                                      </li>
                                    ))}
                                  </ul>
                                </Collapse>
                              )}
                            </li>
                          ))}
                        </ul>
                      </Collapse>
                    )}
                  </li>
                ))}
              </ul>
              <div className="copyright" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginTop: '1rem', marginBottom: '1rem' }}>
                <p className="text-center" style={{ fontSize: '13px', color: '#999' }}> &copy; {new Date().getFullYear()} Diocese of Kurnool</p>
                <p className="text-center" style={{ fontSize: '13px', color: '#999' }}>Powered by <a href='https://boscosofttech.com/' target='_blank' rel="noopener noreferrer" style={{ color: '#666' }}>BoscoSoft Technologies</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
