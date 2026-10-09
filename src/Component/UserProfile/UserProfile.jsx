import { useContext } from "react";
import { AuthContext } from "../../Contexts/AuthContext";
import { UserButton, useUser } from "@clerk/react";
import "./UserProfileStyle.css";

const UserProfile = () => {
  const { userLogout, authState } = useContext(AuthContext);
  const { user: clerkUser, isSignedIn } = useUser();

  let storedUser = {};
  try {
    storedUser = JSON.parse(localStorage.getItem("user") || "{}") || {};
  } catch (err) {
    storedUser = {};
  }

  const currentUser = authState?.user || storedUser;

  const displayName = isSignedIn
    ? `${clerkUser?.firstName || ""} ${clerkUser?.lastName || ""}`.trim() ||
      clerkUser?.username ||
      "Clerk User"
    : `${currentUser?.firstName || ""} ${currentUser?.lastName || ""}`.trim() ||
      "Guest User";

  const email = isSignedIn
    ? clerkUser?.primaryEmailAddress?.emailAddress || ""
    : currentUser?.email || "";

  const avatar = isSignedIn ? clerkUser?.imageUrl : currentUser?.imageUrl;

  return (
    <div className="user-profile-container">
      <div className="user-profile-body">
        {isSignedIn && (
          <div className="user-profile-badge">
            <span className="clerk-pill">✓ Verified by Clerk</span>
          </div>
        )}
        <div className="user-profile-avatar-row">
          {avatar ? (
            <img src={avatar} alt={displayName} className="user-avatar-img" />
          ) : (
            <div className="user-avatar-placeholder">
              {displayName.charAt(0).toUpperCase()}
            </div>
          )}
          {isSignedIn && (
            <div className="user-clerk-button-inline">
              <UserButton />
            </div>
          )}
        </div>
        <p>
          <span>Name: </span> {displayName}
        </p>
        <p>
          <span>Email: </span> {email}
        </p>
        <div className="user-profile-actions">
          <button className="logout-btn" onClick={userLogout}>
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export { UserProfile };
