import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  AiFillStar,
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineSafetyCertificate,
  AiOutlineCheckCircle,
} from "react-icons/ai";
import {
  BiCartAdd,
  BiCartDownload,
  BiCrown,
  BiAward,
  BiPackage,
  BiShieldQuarter,
} from "react-icons/bi";
import { MdOutlineDiamond, MdVerified } from "react-icons/md";
import { FiClock, FiTruck, FiShield, FiShare2 } from "react-icons/fi";
import { toast } from "react-toastify";
import "./LuxuryProductView.css";

const LuxuryProductView = ({
  product,
  relatedProducts = [],
  addToCartHandler,
  addToWishlistHandler,
  isProductInCart,
  isProductInWishlist,
  cartBtnDisabled,
  wishlistBtnDisabled,
}) => {
  const [activeTab, setActiveTab] = useState("atelier-specs");
  const [strapChoice, setStrapChoice] = useState("Bespoke Handcrafted Leather");

  const mrpPrice = Math.round(product.price * 1.4);

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `${product.brand} - ${product.name}`,
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Timepiece link copied to clipboard!");
    }
  };

  return (
    <div className="luxury-product-page">
      {/* Top Banner & Breadcrumb */}
      <div className="luxury-top-nav">
        <div className="luxury-breadcrumb">
          <Link to="/" className="luxury-crumb-link">
            Maison
          </Link>
          <span className="luxury-crumb-sep">✦</span>
          <Link to="/products" className="luxury-crumb-link">
            Haute Horlogerie
          </Link>
          <span className="luxury-crumb-sep">✦</span>
          <span className="luxury-crumb-category">Masterpieces</span>
          <span className="luxury-crumb-sep">✦</span>
          <span className="luxury-crumb-current">{product.brand}</span>
        </div>
        <div className="luxury-top-actions">
          <span className="luxury-atelier-tag">
            <BiCrown /> HAUTE HORLOGERIE ATELIER
          </span>
          <button
            className="luxury-share-btn"
            onClick={handleShare}
            title="Share Prestige Timepiece"
          >
            <FiShare2 />
          </button>
        </div>
      </div>

      {/* Main Luxury Showcase Grid */}
      <div className="luxury-main-grid">
        {/* Left Column: Visual Salon */}
        <div className="luxury-visual-column">
          <div className="luxury-image-stage">
            <div className="luxury-halo-glow"></div>
            <div className="luxury-seal-badge">
              <MdOutlineDiamond />
              <span>CERTIFIED AUTHENTIC</span>
            </div>

            <div className="luxury-hallmark">
              <span>SWISS HERITAGE • MANUFACTURE ROYALE</span>
            </div>

            <div className="luxury-img-wrapper">
              <img
                src={product.image}
                alt={product.name}
                className="luxury-primary-img"
              />
            </div>

            <div className="luxury-materials-row">
              <div className="luxury-material-chip">
                <MdVerified className="mat-icon" />
                <span>Sapphire Crystal</span>
              </div>
              <div className="luxury-material-chip">
                <BiAward className="mat-icon" />
                <span>316L Surgical Steel</span>
              </div>
              <div className="luxury-material-chip">
                <FiClock className="mat-icon" />
                <span>Precision Calibre</span>
              </div>
            </div>
          </div>

          {/* Maison Privileges */}
          <div className="luxury-privileges-card">
            <h4 className="luxury-privileges-heading">
              WHITE-GLOVE CONCIERGE PRIVILEGES
            </h4>
            <div className="luxury-privileges-list">
              <div className="privilege-item">
                <div className="privilege-icon">
                  <AiOutlineSafetyCertificate />
                </div>
                <div>
                  <strong>Individual Serialized Certificate</strong>
                  <p>Registered under global horology registry with tamper-evident seal.</p>
                </div>
              </div>
              <div className="privilege-item">
                <div className="privilege-icon">
                  <BiPackage />
                </div>
                <div>
                  <strong>Bespoke Hardwood Presentation Chest</strong>
                  <p>Hand-lacquered piano finish with Italian micro-velvet interior cushion.</p>
                </div>
              </div>
              <div className="privilege-item">
                <div className="privilege-icon">
                  <FiTruck />
                </div>
                <div>
                  <strong>Complimentary Armored Courier</strong>
                  <p>Fully insured transit direct to your residence with discreet handover.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Horological Story & Acquisition */}
        <div className="luxury-details-column">
          <div className="luxury-brand-header">
            <span className="luxury-brand-label">MAISON DE HAUTE HORLOGERIE</span>
            <span className="luxury-brand-name">{product.brand}</span>
          </div>

          <h1 className="luxury-product-title">{product.name}</h1>

          {/* Rating & Heritage Status */}
          <div className="luxury-ratings-bar">
            <div className="luxury-stars">
              {[...Array(5)].map((_, i) => (
                <AiFillStar key={i} className="star-gold" />
              ))}
            </div>
            <span className="luxury-rating-score">
              {product.customerReviews?.avgValue} / 5.0
            </span>
            <span className="luxury-collector-count">
              Masterpiece Review by {product.customerReviews?.count} Collectors
            </span>
          </div>

          {/* Price Atelier */}
          <div className="luxury-pricing-box">
            <div className="luxury-price-row">
              <span className="luxury-price-val">₹{product.price}</span>
              <span className="luxury-mrp-val">Estimated Valuation: ₹{mrpPrice}</span>
            </div>
            <p className="luxury-tax-note">
              Inclusive of all international customs duties, horological provenance certificate &
              insured delivery.
            </p>
          </div>

          {/* The Horological Description */}
          <div className="luxury-story-card">
            <h4 className="luxury-story-heading">THE ATELIER'S VISION</h4>
            <p className="luxury-story-text">{product.description}</p>
          </div>

          {/* Bespoke Strap Selection */}
          <div className="luxury-strap-selection">
            <label className="luxury-option-label">TAILORED STRAP FINISHING</label>
            <div className="luxury-strap-buttons">
              {["Bespoke Handcrafted Leather", "Solid Jubilee Stainless Link"].map((strap) => (
                <button
                  key={strap}
                  type="button"
                  className={`strap-btn ${strapChoice === strap ? "active" : ""}`}
                  onClick={() => setStrapChoice(strap)}
                >
                  <AiOutlineCheckCircle className="check-icon" /> {strap}
                </button>
              ))}
            </div>
          </div>

          {/* Acquisition Action Bar */}
          <div className="luxury-actions-bar">
            <button
              className={`luxury-acquire-btn ${cartBtnDisabled ? "btn-disabled" : ""}`}
              onClick={() => addToCartHandler(product)}
              disabled={cartBtnDisabled}
            >
              {isProductInCart ? (
                <>
                  <BiCartDownload className="btn-icon" /> PROCEED TO PRIVATE CART
                </>
              ) : (
                <>
                  <BiCartAdd className="btn-icon" /> ACQUIRE TIMEPIECE • ADD TO CART
                </>
              )}
            </button>

            <button
              className={`luxury-vault-btn ${
                isProductInWishlist ? "vaulted" : ""
              } ${wishlistBtnDisabled ? "btn-disabled" : ""}`}
              onClick={() => addToWishlistHandler(product)}
              disabled={wishlistBtnDisabled}
            >
              {isProductInWishlist ? (
                <>
                  <AiFillHeart className="btn-icon gold" /> IN PRIVATE VAULT
                </>
              ) : (
                <>
                  <AiOutlineHeart className="btn-icon" /> SAVE TO PRIVATE VAULT
                </>
              )}
            </button>
          </div>

          {/* Horological Confidence Badges */}
          <div className="luxury-guarantee-grid">
            <div className="luxury-guarantee-cell">
              <FiShield className="l-icon" />
              <div>
                <strong>5-Year International Warranty</strong>
                <span>Full movement & calibre guarantee</span>
              </div>
            </div>
            <div className="luxury-guarantee-cell">
              <BiShieldQuarter className="l-icon" />
              <div>
                <strong>Tamper-Proof Serial</strong>
                <span>Laser-engraved provenance</span>
              </div>
            </div>
            <div className="luxury-guarantee-cell">
              <MdOutlineDiamond className="l-icon" />
              <div>
                <strong>Diamond-Tested Crystal</strong>
                <span>Scratch-impervious sapphire</span>
              </div>
            </div>
          </div>

          {/* Atelier Technical Tabs */}
          <div className="luxury-tabs-wrapper">
            <div className="luxury-tab-headers">
              <button
                className={`tab-btn ${activeTab === "atelier-specs" ? "active" : ""}`}
                onClick={() => setActiveTab("atelier-specs")}
              >
                Atelier Specifications
              </button>
              <button
                className={`tab-btn ${activeTab === "craftsmanship" ? "active" : ""}`}
                onClick={() => setActiveTab("craftsmanship")}
              >
                Craftsmanship & Artistry
              </button>
              <button
                className={`tab-btn ${activeTab === "concierge" ? "active" : ""}`}
                onClick={() => setActiveTab("concierge")}
              >
                White-Glove Service
              </button>
            </div>

            <div className="luxury-tab-body">
              {activeTab === "atelier-specs" && (
                <div className="luxury-specs-table">
                  <div className="spec-row">
                    <span className="spec-key">Calibre</span>
                    <span className="spec-val">Jeweled Master Horology Movement</span>
                  </div>
                  <div className="spec-row">
                    <span className="spec-key">Crystal</span>
                    <span className="spec-val">Anti-Reflective Scratchproof Sapphire</span>
                  </div>
                  <div className="spec-row">
                    <span className="spec-key">Case Finishing</span>
                    <span className="spec-val">316L Surgical Stainless Steel & Mirror Polish</span>
                  </div>
                  <div className="spec-row">
                    <span className="spec-key">Water Resistance</span>
                    <span className="spec-val">Splash & Rain Proof (3ATM - 5ATM)</span>
                  </div>
                  <div className="spec-row">
                    <span className="spec-key">Dial Embellishment</span>
                    <span className="spec-val">Sunburst Guilloché & Hand-Applied Indices</span>
                  </div>
                  <div className="spec-row">
                    <span className="spec-key">Strap Tailoring</span>
                    <span className="spec-val">{strapChoice}</span>
                  </div>
                </div>
              )}

              {activeTab === "craftsmanship" && (
                <div className="craftsmanship-content">
                  <p>
                    Every timepiece from {product.brand} passes through over 180 individual artisan
                    inspections. The bevelled edges are diamond-polished, while the hands undergo
                    thermal bluing to preserve their eternal luster.
                  </p>
                  <p>
                    Designed to transcend fleeting trends, embodying the dignity, patience, and
                    artistry of classic European watchmaking.
                  </p>
                </div>
              )}

              {activeTab === "concierge" && (
                <div className="concierge-content">
                  <p>
                    <strong>Personal Horology Advisor:</strong> Each order is assigned a private
                    client liaison available 24/7 for sizing, maintenance guidance, and tracking.
                  </p>
                  <p>
                    <strong>Complimentary Annual Polishing:</strong> Enjoy complimentary aesthetic
                    servicing within the first 3 years of purchase.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Curated Luxury Vault Section */}
      {relatedProducts.length > 0 && (
        <div className="luxury-related-section">
          <div className="luxury-related-header">
            <div>
              <span className="sub-title">CURATED ATELIER SELECTION</span>
              <h3 className="luxury-related-title">COMPANION PIECES IN HAUTE HORLOGERIE</h3>
            </div>
            <Link to="/products" className="luxury-view-all">
              Explore All Masterpieces ➔
            </Link>
          </div>

          <div className="luxury-related-grid">
            {relatedProducts.slice(0, 4).map((item) => (
              <Link
                key={item._id}
                to={`/products/${item._id}`}
                className="luxury-related-card"
              >
                <div className="luxury-card-img-wrap">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="luxury-card-info">
                  <span className="card-brand">{item.brand}</span>
                  <h4 className="card-name">{item.name}</h4>
                  <div className="card-bottom">
                    <span className="card-price">₹{item.price}</span>
                    <span className="card-rating">
                      <AiFillStar /> {item.customerReviews?.avgValue}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export { LuxuryProductView };
