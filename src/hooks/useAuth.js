import { useState } from "react";

export function useAuth() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("registeredUser"))
  );

  const login = (email, password) => {
    const savedUser = JSON.parse(localStorage.getItem("registeredUser"));

    if (!savedUser) {
      return { success: false, message: "No user found." };
    }

    if (
      email.trim().toLowerCase() !== savedUser.email ||
      password !== savedUser.password
    ) {
      return { success: false, message: "Invalid email or password." };
    }

    localStorage.setItem("isLoggedIn", "true");
    setUser(savedUser);

    return { success: true };
  };

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    setUser(null);
  };

  const updatePassword = (currentPassword, newPassword) => {
    if (!user) {
      return { success: false, message: "Not logged in." };
    }

    if (currentPassword !== user.password) {
      return { success: false, message: "Current password incorrect." };
    }

    const updatedUser = { ...user, password: newPassword };

    localStorage.setItem("registeredUser", JSON.stringify(updatedUser));
    setUser(updatedUser);

    return { success: true, message: "Password updated successfully." };
  };

  const resetPassword = (email, newPassword) => {
    const savedUser = JSON.parse(localStorage.getItem("registeredUser"));

    if (!savedUser) {
      return { success: false, message: "No user found." };
    }

    if (email.trim().toLowerCase() !== savedUser.email) {
      return { success: false, message: "Email not registered." };
    }

    const updatedUser = { ...savedUser, password: newPassword };

    localStorage.setItem("registeredUser", JSON.stringify(updatedUser));
    setUser(updatedUser);

    return { success: true, message: "Password reset successful." };
  };

  return {
    user,
    login,
    logout,
    updatePassword,
    resetPassword
  };
}
