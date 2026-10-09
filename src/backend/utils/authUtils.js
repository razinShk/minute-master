import { Response } from "miragejs";
import dayjs from "dayjs";
import jwt_decode from "jwt-decode";

export const requiresAuth = function (request) {
  const encodedToken = request.requestHeaders.authorization;
  if (!encodedToken) {
    return new Response(
      401,
      {},
      { errors: ["The token is invalid. Unauthorized access error."] }
    );
  }
  try {
    const decodedToken = jwt_decode(
      encodedToken,
      process.env.REACT_APP_JWT_SECRET
    );
    if (decodedToken) {
      let user =
        (decodedToken.email && this.db.users.findBy({ email: decodedToken.email })) ||
        (decodedToken._id && this.db.users.findBy({ _id: decodedToken._id }));

      if (!user && (decodedToken.email || decodedToken._id)) {
        user = this.db.users.insert({
          _id: decodedToken._id || "clerk-user-" + Date.now(),
          email: decodedToken.email || "user@clerk.dev",
          firstName: decodedToken.firstName || "Clerk",
          lastName: decodedToken.lastName || "User",
          password: "",
          cart: [],
          wishlist: [],
          address: [],
          createdAt: formatDate(),
          updatedAt: formatDate(),
        });
      }

      if (user) {
        return user._id;
      }
    }
  } catch (error) {
    console.error("Token verification error:", error);
  }
  return new Response(
    401,
    {},
    { errors: ["The token is invalid. Unauthorized access error."] }
  );
};

export const formatDate = () => dayjs().format("YYYY-MM-DDTHH:mm:ssZ");
