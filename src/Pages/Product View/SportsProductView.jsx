import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  AiFillStar,
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineThunderbolt,
  AiOutlineClockCircle,
  AiOutlineCheck,
} from "react-icons/ai";
import {
  BiCartAdd,
  BiCartDownload,
  BiShieldQuarter,
  BiWater,
  BiStopwatch,
  BiTrophy,
} from "react-icons/bi";
import {
  MdOutlineDirectionsRun,
  MdPool,
  MdTerrain,
  MdFitnessCenter,
} from "react-icons/md";
import { FiTruck, FiShield, FiShare2 } from "react-icons/fi";
import { toast } from "react-toastify";
import "./SportsProductView.css";

const SportsProductView = ({
  product,
  relatedProducts = [],
  addToCartHandler,
  addToWishlistHandler,
  isProductInCart,
  isProductInWishlist,
  cartBtnDisabled,
  wishlistBtnDisabled,
}) => {
  const [activeTab, setActiveTab] = useState("field-specs");
  const [selectedWristSize, setSelectedWristSize] = useState("Standard (16-21cm)");

  const mrpPrice = Math.round(product.price * 1.65);
  const discountPercent = Math.round(((mrpPrice - product.price) / mrpPrice) * 100);

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: product.name,
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Product link copied to clipboard!");
    }
  };

  return (
    <div className="sports-product-page">
      {/* Top Banner & Breadcrumb */}
      <div className="sports-top-nav">
        <div className="sports-breadcrumb">
          <Link to="/" className="sports-crumb-link">
            Home
          </Link>
          <span className="sports-crumb-sep">/</span>
          <Link to="/products" className="sports-crumb-link">
            Watches
          </Link>
          <span className="sports-crumb-sep">/</span>
          <span className="sports-crumb-category">Sports Performance</span>
          <span className="sports-crumb-sep">/</span>
          <span className="sports-crumb-current">{product.brand}</span>
        </div>
        <div className="sports-top-actions">
          <span className="sports-edition-tag">
            <AiOutlineThunderbolt /> TACTICAL ENDURANCE EDITION
          </span>
          <button className="sports-share-btn" onClick={handleShare} title="Share Timepiece">
            <FiShare2 />
          </button>
        </div>
      </div>

      {/* Main Two-Column Athletic Layout */}
      <div className="sports-main-grid">
        {/* Left Column: Visual Showcase */}
        <div className="sports-visual-column">
          <div className="sports-image-stage">
            <div className="sports-watermark">TACTICAL 5ATM</div>
            <div className="sports-corner-brackets">
              <span className="corner tl"></span>
              <span className="corner tr"></span>
              <span className="corner bl"></span>
              <span className="corner br"></span>
            </div>

            <div className="sports-badge-row">
              {product.isBestSeller && (
                <span className="sports-badge-bestseller">
                  <BiTrophy /> BESTSELLER
                </span>
              )}
              <span className="sports-badge-waterproof">
                <BiWater /> 50M WATER RESISTANT
              </span>
            </div>

            <div className="sports-img-wrapper">
              <img
                src={product.image}
                alt={product.name}
                className="sports-primary-img"
              />
            </div>

            <div className="sports-specs-chips">
              <div className="sports-chip">
                <BiShieldQuarter className="chip-icon" />
                <span>Shock Armor</span>
              </div>
              <div className="sports-chip">
                <BiStopwatch className="chip-icon" />
                <span>1/100s Chrono</span>
              </div>
              <div className="sports-chip">
                <AiOutlineClockCircle className="chip-icon" />
                <span>Dual Time LED</span>
              </div>
            </div>
          </div>

          {/* Activity Readiness Matrix */}
          <div className="sports-activity-card">
            <h4 className="sports-activity-heading">FIELD READINESS SCORE</h4>
            <div className="sports-activity-grid">
              <div className="activity-item">
                <div className="activity-icon-wrap swimming">
                  <MdPool />
                </div>
                <div className="activity-details">
                  <span className="activity-name">Swimming & Water</span>
                  <span className="activity-status">5ATM Sealed (Depth 50m)</span>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-icon-wrap running">
                  <MdOutlineDirectionsRun />
                </div>
                <div className="activity-details">
                  <span className="activity-name">Marathon & Sprint</span>
                  <span className="activity-status">Lap Split Chronometer</span>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-icon-wrap trekking">
                  <MdTerrain />
                </div>
                <div className="activity-details">
                  <span className="activity-name">Trail & Outdoor</span>
                  <span className="activity-status">Dust & Shock Protective</span>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-icon-wrap gym">
                  <MdFitnessCenter />
                </div>
                <div className="activity-details">
                  <span className="activity-name">CrossFit & Gym</span>
                  <span className="activity-status">Interval Alarms & Timer</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Tactical Information & CTAs */}
        <div className="sports-details-column">
          <div className="sports-brand-meta">
            <span className="sports-brand-pill">{product.brand}</span>
            <span className="sports-model-tag">SERIES 300 PRO</span>
          </div>

          <h1 className="sports-product-title">{product.name}</h1>

          {/* Rating Block */}
          <div className="sports-ratings-bar">
            <div className="sports-stars">
              {[...Array(5)].map((_, i) => (
                <AiFillStar
                  key={i}
                  className={
                    i < Math.floor(product.customerReviews?.avgValue || 4)
                      ? "star-active"
                      : "star-inactive"
                  }
                />
              ))}
            </div>
            <span className="sports-rating-score">
              {product.customerReviews?.avgValue} / 5.0
            </span>
            <span className="sports-rating-count">
              ({product.customerReviews?.count} verified athletes)
            </span>
          </div>

          {/* Price Block */}
          <div className="sports-pricing-box">
            <div className="sports-price-row">
              <span className="sports-current-price">₹{product.price}</span>
              <span className="sports-mrp-price">₹{mrpPrice}</span>
              <span className="sports-discount-pill">{discountPercent}% OFF</span>
            </div>
            <p className="sports-tax-note">
              Inclusive of all taxes • Free express athletic priority shipping
            </p>
          </div>

          {/* Description */}
          <div className="sports-description-card">
            <p className="sports-description-text">{product.description}</p>
          </div>

          {/* Wrist Fit Selection */}
          <div className="sports-wrist-selection">
            <label className="sports-option-label">STRAP ADJUSTMENT</label>
            <div className="sports-wrist-buttons">
              {["Standard (16-21cm)", "Extended XL (19-24cm)"].map((size) => (
                <button
                  key={size}
                  type="button"
                  className={`wrist-btn ${selectedWristSize === size ? "selected" : ""}`}
                  onClick={() => setSelectedWristSize(size)}
                >
                  <AiOutlineCheck className="check-icon" /> {size}
                </button>
              ))}
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="sports-actions-bar">
            <button
              className={`sports-cart-btn ${cartBtnDisabled ? "btn-disabled" : ""}`}
              onClick={() => addToCartHandler(product)}
              disabled={cartBtnDisabled}
            >
              {isProductInCart ? (
                <>
                  <BiCartDownload className="btn-icon" /> GO TO CART
                </>
              ) : (
                <>
                  <BiCartAdd className="btn-icon" /> EQUIP WATCH • ADD TO CART
                </>
              )}
            </button>

            <button
              className={`sports-wishlist-btn ${
                isProductInWishlist ? "wishlisted" : ""
              } ${wishlistBtnDisabled ? "btn-disabled" : ""}`}
              onClick={() => addToWishlistHandler(product)}
              disabled={wishlistBtnDisabled}
            >
              {isProductInWishlist ? (
                <>
                  <AiFillHeart className="btn-icon red" /> IN WISHLIST
                </>
              ) : (
                <>
                  <AiOutlineHeart className="btn-icon" /> SAVE TO WISHLIST
                </>
              )}
            </button>
          </div>

          {/* Tactical Guarantee Badges */}
          <div className="sports-guarantee-grid">
            <div className="guarantee-cell">
              <FiTruck className="g-icon" />
              <div>
                <strong>Express Delivery</strong>
                <span>Dispatches within 24h</span>
              </div>
            </div>
            <div className="guarantee-cell">
              <FiShield className="g-icon" />
              <div>
                <strong>1-Year Sport Warranty</strong>
                <span>Official brand coverage</span>
              </div>
            </div>
            <div className="guarantee-cell">
              <BiWater className="g-icon" />
              <div>
                <strong>Pressure Tested</strong>
                <span>Calibrated 50M seal</span>
              </div>
            </div>
          </div>

          {/* Spec & Features Tabs */}
          <div className="sports-tabs-wrapper">
            <div className="sports-tab-headers">
              <button
                className={`tab-btn ${activeTab === "field-specs" ? "active" : ""}`}
                onClick={() => setActiveTab("field-specs")}
              >
                Tactical Specs
              </button>
              <button
                className={`tab-btn ${activeTab === "package" ? "active" : ""}`}
                onClick={() => setActiveTab("package")}
              >
                In The Box
              </button>
              <button
                className={`tab-btn ${activeTab === "delivery" ? "active" : ""}`}
                onClick={() => setActiveTab("delivery")}
              >
                Protection & Warranty
              </button>
            </div>

            <div className="sports-tab-body">
              {activeTab === "field-specs" && (
                <div className="specs-table">
                  <div className="spec-row">
                    <span className="spec-key">Water Resistance</span>
                    <span className="spec-val">5ATM / 50 Meters</span>
                  </div>
                  <div className="spec-row">
                    <span className="spec-key">Case Material</span>
                    <span className="spec-val">Impact-Resistant Polymer Resin</span>
                  </div>
                  <div className="spec-row">
                    <span className="spec-key">Band Type</span>
                    <span className="spec-val">Hydrophobic TPU Sport Strap</span>
                  </div>
                  <div className="spec-row">
                    <span className="spec-key">Dial Window</span>
                    <span className="spec-val">High-Hardness Mineral Glass</span>
                  </div>
                  <div className="spec-row">
                    <span className="spec-key">Functions</span>
                    <span className="spec-val">Stopwatch, Alarm, LED Light, Auto Calendar</span>
                  </div>
                  <div className="spec-row">
                    <span className="spec-key">Movement</span>
                    <span className="spec-val">Precision Quartz Core</span>
                  </div>
                </div>
              )}

              {activeTab === "package" && (
                <ul className="package-list">
                  <li>✓ 1x {product.name}</li>
                  <li>✓ Military-Grade Hard Case Box</li>
                  <li>✓ Official International Warranty Card</li>
                  <li>✓ Quick Start Stopwatch & Timer Field Manual</li>
                </ul>
              )}

              {activeTab === "delivery" && (
                <div className="delivery-info">
                  <p>
                    <strong>12 Months Comprehensive Coverage:</strong> Covers mechanical and
                    movement faults. Free doorstep replacement in case of water ingress within
                    certified limits.
                  </p>
                  <p>
                    <strong>Easy 7-Day Hassle-Free Returns:</strong> Unopened and untouched item
                    can be returned with full refund guarantee.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Related Sports Watches Section */}
      {relatedProducts.length > 0 && (
        <div className="sports-related-section">
          <div className="sports-related-header">
            <h3 className="sports-related-title">MORE HIGH-PERFORMANCE SPORT WATCHES</h3>
            <Link to="/products" className="sports-view-all">
              View All Sports Gear →
            </Link>
          </div>

          <div className="sports-related-grid">
            {relatedProducts.slice(0, 4).map((item) => (
              <Link
                key={item._id}
                to={`/products/${item._id}`}
                className="sports-related-card"
              >
                <div className="related-img-wrap">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="related-info">
                  <span className="related-brand">{item.brand}</span>
                  <h4 className="related-title">{item.name}</h4>
                  <div className="related-price-row">
                    <span className="related-price">₹{item.price}</span>
                    <span className="related-rating">
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

export { SportsProductView };
