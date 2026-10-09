import SportsWatch from "../Assets/Category/Sports Watch.png";
import LuxuryWatch from "../Assets/Category/Luxury Watch.png";
import SmartWatch from "../Assets/Category/Smart Watch.png";

const categoryImages = {
  "Sports Watch": SportsWatch,
  "Luxury Watch": LuxuryWatch,
  "Smart Watch": SmartWatch,
};

export function toProduct(row) {
  if (!row) return null;
  return {
    _id: row.id,
    name: row.name,
    image: row.image,
    brand: row.brand,
    price: Number(row.price),
    categoryName: row.category_name,
    description: row.description,
    customerReviews: {
      avgValue: Number(row.review_avg),
      count: row.review_count,
    },
    isBestSeller: row.is_best_seller,
  };
}

export function toCategory(row) {
  return {
    _id: row.id,
    categoryName: row.category_name,
    description: row.description,
    image: categoryImages[row.category_name] || row.image,
  };
}

export function toAddress(row) {
  return {
    _id: row.id,
    name: row.name,
    street: row.street,
    city: row.city,
    state: row.state,
    country: row.country,
    zipCode: row.zip_code,
    mobile: row.mobile,
  };
}

export function toCartItem(row) {
  return {
    ...toProduct(row.products),
    qty: row.qty,
  };
}

export function toWishlistItem(row) {
  return toProduct(row.products);
}
