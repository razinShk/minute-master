import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineUser,
  AiOutlineClose,
  AiOutlineMenu,
} from "react-icons/ai";
import { MdOutlineLogin } from "react-icons/md";
import { BiSearch } from "react-icons/bi";
import { CiSearch } from "react-icons/ci";
import { UserButton } from "@clerk/react";
import minuteLogo from "../../Assets/minuteLogoLightMode.png";
import { ProductContext } from "../../Contexts/ProductContext";
import { AuthContext } from "../../Contexts/AuthContext";
import "./Navbar.css";

const Navbar = () => {
  const { filtersDispatch, filtersState, productState } =
    useContext(ProductContext);
  const { authState, isClerkSignedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const token = authState?.token;
  const [isSearchBarVisible, setSearchBarVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSearch = (e) => {
    filtersDispatch({ type: "setClear", payload: "" });
    filtersDispatch({ type: "setSearch", payload: e.target.value });
    if (filtersState?.search.length !== "") {
      navigate("/products");
    }
  };

  const handleCategoryNav = (catName) => {
    filtersDispatch({ type: "setClear", payload: "" });
    if (catName) {
      filtersDispatch({ type: "setCategoryFilter", payload: catName });
    }
    setIsMobileMenuOpen(false);
    navigate("/products");
  };

  const cartItemQty = productState?.cart?.reduce(
    (acc, { qty }) => acc + qty,
    0
  );
  const wishlistItemQty = productState?.wishlist?.length;

  const toggleSearchBar = () => {
    setSearchBarVisible(!isSearchBarVisible);
  };

  return (
    <header className="navbar-wrapper">
      <div className="announcement-bar">
        <div className="announcement-inner">
          <span>✦ FREE EXPRESS INSURED SHIPPING ON ORDERS OVER ₹2,000</span>
          <span className="announcement-bullet">•</span>
          <span>100% AUTHENTICITY GUARANTEE</span>
          <span className="announcement-bullet">•</span>
          <span>2-YEAR EXTENDED WARRANTY</span>
        </div>
      </div>

      <nav className="navbar-main">
        <div className="logo-container">
          <NavLink
            to="/"
            className="nav-link"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div className="logo">
              <img src={minuteLogo} alt="Minute Logo" className="logo-icon" />
              <div className="logo-text-group">
                <span className="logo-name">MINUTE</span>
                <span className="logo-tagline">HOROLOGY</span>
              </div>
            </div>
          </NavLink>
        </div>

        <div className="nav-links-desktop">
          <button
            className="nav-collection-btn"
            onClick={() => handleCategoryNav()}
          >
            ALL WATCHES
          </button>
          <button
            className="nav-collection-btn"
            onClick={() => handleCategoryNav("Luxury Watch")}
          >
            LUXURY
          </button>
          <button
            className="nav-collection-btn"
            onClick={() => handleCategoryNav("Sports Watch")}
          >
            SPORTS & DIVERS
          </button>
          <button
            className="nav-collection-btn"
            onClick={() => handleCategoryNav("Smart Watch")}
          >
            SMARTWATCHES
          </button>
          <button
            className="nav-collection-btn highlight"
            onClick={() => {
              filtersDispatch({ type: "setClear", payload: "" });
              navigate("/products");
            }}
          >
            NEW ARRIVALS
          </button>
        </div>

        <div
          className={`search-container ${
            isSearchBarVisible ? " search-visible" : ""
          }`}
        >
          <CiSearch className="search-icon" />
          <input
            type="text"
            value={filtersState.search}
            placeholder="Search luxury, sports, smart watches..."
            onChange={handleSearch}
          />
          <button
            className="nav-btn"
            onClick={toggleSearchBar}
            aria-label="Close search"
          >
            <AiOutlineClose className="close-icon" />
          </button>
        </div>

        <div className="nav-btn-container">
          <button
            className="nav-link nav-btn"
            onClick={toggleSearchBar}
            aria-label="Search"
          >
            <BiSearch className="nav-btn-icon" />
          </button>

          <NavLink to="/wishlist" className="nav-link nav-btn" title="Wishlist">
            <AiOutlineHeart className="nav-btn-icon" />
            {wishlistItemQty !== 0 && (
              <span className="nav-btn-qty">{wishlistItemQty}</span>
            )}
          </NavLink>

          <NavLink to="/cart" className="nav-link nav-btn" title="Shopping Cart">
            <AiOutlineShoppingCart className="nav-btn-icon" />
            {cartItemQty !== 0 && (
              <span className="nav-btn-qty">{cartItemQty}</span>
            )}
          </NavLink>

          {isClerkSignedIn ? (
            <div className="nav-clerk-wrapper">
              <NavLink
                to="/userDetails"
                className="nav-link nav-btn"
                title="My Account"
              >
                <AiOutlineUser className="nav-btn-icon" />
              </NavLink>
              <div className="nav-clerk-userbutton">
                <UserButton afterSignOutUrl="/" />
              </div>
            </div>
          ) : (
            <NavLink
              to={token ? "/userDetails" : "/login"}
              className="nav-link nav-btn"
              title={token ? "My Account" : "Login"}
            >
              {token ? (
                <AiOutlineUser className="nav-btn-icon" />
              ) : (
                <MdOutlineLogin className="nav-btn-icon" />
              )}
            </NavLink>
          )}

          <button
            className="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <AiOutlineClose className="nav-btn-icon" />
            ) : (
              <AiOutlineMenu className="nav-btn-icon" />
            )}
          </button>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className="mobile-drawer">
          <div className="mobile-drawer-links">
            <button
              className="mobile-drawer-btn"
              onClick={() => handleCategoryNav()}
            >
              All Timepieces
            </button>
            <button
              className="mobile-drawer-btn"
              onClick={() => handleCategoryNav("Luxury Watch")}
            >
              Luxury Horology
            </button>
            <button
              className="mobile-drawer-btn"
              onClick={() => handleCategoryNav("Sports Watch")}
            >
              Sports & Dive Watches
            </button>
            <button
              className="mobile-drawer-btn"
              onClick={() => handleCategoryNav("Smart Watch")}
            >
              Smart Wearables
            </button>
            <button
              className="mobile-drawer-btn highlight"
              onClick={() => {
                filtersDispatch({ type: "setClear", payload: "" });
                setIsMobileMenuOpen(false);
                navigate("/products");
              }}
            >
              New Arrivals & Best Sellers
            </button>
          </div>
          <div className="mobile-drawer-footer">
            <div className="mobile-guarantee-note">
              ✦ 100% Certified Authentic &bull; 2-Year Movement Warranty
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export { Navbar };
