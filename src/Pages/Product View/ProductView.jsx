import { useContext, useEffect, useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProductContext } from "../../Contexts/ProductContext";
import { AuthContext } from "../../Contexts/AuthContext";
import { addProductToCart, isProductInCart } from "../../utils/cartUtils.jsx";
import {
  addProductToWishlist,
  isProductInWishlist,
} from "../../utils/wishlistUtils";
import { SportsProductView } from "./SportsProductView";
import { LuxuryProductView } from "./LuxuryProductView";
import { SmartProductView } from "./SmartProductView";
import { Loader } from "../../Component/Loader/Loader";
import "./ProductViewStyle.css";

const ProductView = () => {
  const { productID } = useParams();
  const { productState, productDispatch, getSingleProductDetails } =
    useContext(ProductContext);
  const { authState } = useContext(AuthContext);

  const [cartBtnDisabled, setCartBtnDisabled] = useState(false);
  const [wishlistBtnDisabled, setWishlistBtnDisabled] = useState(false);

  // Check if product is already in memory from catalog
  const cachedProduct = useMemo(
    () => productState?.products?.find((p) => p._id === productID) || null,
    [productState?.products, productID]
  );

  const [singleProduct, setSingleProduct] = useState(cachedProduct);
  const [isSingleProductLoading, setSingleProductLoading] = useState(!cachedProduct);

  const navigate = useNavigate();
  const isLogged = authState?.token?.length > 0;
  const encodedToken = authState?.token;

  useEffect(() => {
    window.scrollTo(0, 0);
    let isMounted = true;

    // If already in memory, sync immediately
    if (cachedProduct) {
      setSingleProduct(cachedProduct);
      setSingleProductLoading(false);
      return;
    }

    const fetchProduct = async () => {
      try {
        setSingleProductLoading(true);
        const res = await getSingleProductDetails(productID);
        if (isMounted && res?.product) {
          setSingleProduct(res.product);
        }
      } catch (err) {
        console.error("Error fetching product details:", err);
      } finally {
        if (isMounted) {
          setSingleProductLoading(false);
        }
      }
    };

    fetchProduct();

    return () => {
      isMounted = false;
    };
  }, [productID, cachedProduct, getSingleProductDetails]);

  const addToCartHandler = (product) => {
    if (isLogged) {
      if (isProductInCart(productState?.cart, product?._id)) {
        navigate("/cart");
      } else {
        addProductToCart(
          product,
          productDispatch,
          encodedToken,
          setCartBtnDisabled
        );
      }
    } else {
      navigate("/login");
    }
  };

  const addToWishlistHandler = (product) => {
    if (isLogged) {
      if (isProductInWishlist(productState?.wishlist, product?._id)) {
        navigate("/wishlist");
      } else {
        addProductToWishlist(
          product,
          productDispatch,
          encodedToken,
          setWishlistBtnDisabled
        );
      }
    } else {
      navigate("/login");
    }
  };

  if (isSingleProductLoading && !singleProduct) {
    return <Loader />;
  }

  if (!singleProduct) {
    return (
      <div className="product-not-found-container">
        <h2>Timepiece Not Found</h2>
        <p>The watch you are looking for is currently unavailable.</p>
        <button onClick={() => navigate("/products")} className="return-store-btn">
          Explore Timepiece Catalog
        </button>
      </div>
    );
  }

  // Get related watches from the same category
  const relatedProducts = (productState?.products || []).filter(
    (item) =>
      item.categoryName === singleProduct.categoryName &&
      item._id !== singleProduct._id
  );

  const commonProps = {
    product: singleProduct,
    relatedProducts,
    addToCartHandler,
    addToWishlistHandler,
    isProductInCart: isProductInCart(productState?.cart, singleProduct?._id),
    isProductInWishlist: isProductInWishlist(
      productState?.wishlist,
      singleProduct?._id
    ),
    cartBtnDisabled,
    wishlistBtnDisabled,
  };

  // Route to the tailored design based on watch category
  switch (singleProduct?.categoryName) {
    case "Sports Watch":
      return <SportsProductView {...commonProps} />;
    case "Luxury Watch":
      return <LuxuryProductView {...commonProps} />;
    case "Smart Watch":
      return <SmartProductView {...commonProps} />;
    default:
      return <SportsProductView {...commonProps} />;
  }
};

export { ProductView };
