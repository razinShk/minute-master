import {
  clerkUserId,
  requireSupabase,
} from "./supabaseClient";
import {
  toAddress,
  toCartItem,
  toCategory,
  toProduct,
  toWishlistItem,
} from "./mappers";

async function assertOk(result) {
  if (result.error) throw result.error;
  return result.data;
}

export async function fetchProducts() {
  const data = await assertOk(
    await requireSupabase().from("products").select("*").order("name")
  );
  return data.map(toProduct);
}

export async function fetchProduct(id) {
  const data = await assertOk(
    await requireSupabase().from("products").select("*").eq("id", id).maybeSingle()
  );
  return toProduct(data);
}

export async function fetchCategories() {
  const data = await assertOk(
    await requireSupabase().from("categories").select("*").order("category_name")
  );
  return data.map(toCategory);
}

export async function upsertProfile(user) {
  const email = user.primaryEmailAddress?.emailAddress || "";
  await assertOk(
    await requireSupabase().from("profiles").upsert(
      {
        id: user.id,
        email,
        first_name: user.firstName || "",
        last_name: user.lastName || "",
      },
      { onConflict: "id" }
    )
  );
}

export async function fetchAddresses() {
  const data = await assertOk(
    await requireSupabase()
      .from("addresses")
      .select("*")
      .order("created_at", { ascending: true })
  );
  return data.map(toAddress);
}

export async function insertAddress(address) {
  await assertOk(
    await requireSupabase().from("addresses").insert({
      user_id: clerkUserId(),
      name: address.name,
      street: address.street,
      city: address.city,
      state: address.state,
      country: address.country,
      zip_code: address.zipCode,
      mobile: address.mobile,
    })
  );
  return fetchAddresses();
}

export async function updateAddress(address) {
  await assertOk(
    await requireSupabase()
      .from("addresses")
      .update({
        name: address.name,
        street: address.street,
        city: address.city,
        state: address.state,
        country: address.country,
        zip_code: address.zipCode,
        mobile: address.mobile,
      })
      .eq("id", address._id)
      .eq("user_id", clerkUserId())
  );
  return fetchAddresses();
}

export async function deleteAddress(addressId) {
  await assertOk(
    await requireSupabase()
      .from("addresses")
      .delete()
      .eq("id", addressId)
      .eq("user_id", clerkUserId())
  );
  return fetchAddresses();
}

export async function fetchCart() {
  const data = await assertOk(
    await requireSupabase()
      .from("cart_items")
      .select("qty, products(*)")
      .order("created_at", { ascending: true })
  );
  return data.map(toCartItem);
}

export async function addCartItem(product) {
  await assertOk(
    await requireSupabase().from("cart_items").upsert(
      {
        user_id: clerkUserId(),
        product_id: product._id,
        qty: 1,
      },
      { onConflict: "user_id,product_id" }
    )
  );
  return fetchCart();
}

export async function changeCartQty(productId, type) {
  const client = requireSupabase();
  const userId = clerkUserId();
  const current = await assertOk(
    await client
      .from("cart_items")
      .select("qty")
      .eq("user_id", userId)
      .eq("product_id", productId)
      .single()
  );
  const nextQty = type === "increment" ? current.qty + 1 : current.qty - 1;
  if (nextQty < 1) {
    return removeCartItem(productId);
  }
  await assertOk(
    await client
      .from("cart_items")
      .update({ qty: nextQty })
      .eq("user_id", userId)
      .eq("product_id", productId)
  );
  return fetchCart();
}

export async function removeCartItem(productId) {
  await assertOk(
    await requireSupabase()
      .from("cart_items")
      .delete()
      .eq("user_id", clerkUserId())
      .eq("product_id", productId)
  );
  return fetchCart();
}

export async function clearCartItems(cart) {
  const ids = (cart || []).map((item) => item._id).filter(Boolean);
  if (ids.length) {
    await assertOk(
      await requireSupabase()
        .from("cart_items")
        .delete()
        .eq("user_id", clerkUserId())
        .in("product_id", ids)
    );
  }
  return [];
}

export async function fetchWishlist() {
  const data = await assertOk(
    await requireSupabase()
      .from("wishlist_items")
      .select("products(*)")
      .order("created_at", { ascending: true })
  );
  return data.map(toWishlistItem);
}

export async function addWishlistItem(product) {
  await assertOk(
    await requireSupabase().from("wishlist_items").upsert(
      {
        user_id: clerkUserId(),
        product_id: product._id,
      },
      { onConflict: "user_id,product_id" }
    )
  );
  return fetchWishlist();
}

export async function removeWishlistItem(productId) {
  await assertOk(
    await requireSupabase()
      .from("wishlist_items")
      .delete()
      .eq("user_id", clerkUserId())
      .eq("product_id", productId)
  );
  return fetchWishlist();
}
