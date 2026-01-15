import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axiosInstance from "../../service/api";
import { getAccessToken } from "../../utils/token";
import { logoutUser } from "../../features/auth/authSlice";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const [search, setSearch] = useState("");
  const [cartCount, setCartCount] = useState(0);
  console.log("Cart Count",cartCount)

  const token = getAccessToken();

  /* ✅ FETCH CART COUNT */
  const fetchCartCount = async () => {
    try {
      if (!token) {
        setCartCount(0);
        return;
      }

      const res = await axiosInstance.get("/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // 🔥 Quantity-based count (BEST)
      const count = res.data.items.reduce(
        (total, item) => total + item.quantity,
        0
      );

      setCartCount(count);
    } catch (err) {
      console.error("Failed to fetch cart count");
    }
  };

  useEffect(() => {
    fetchCartCount();
  }, [isAuthenticated]);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?term=${search}`);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    setCartCount(0);
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex items-center justify-between">
      {/* Left */}
      <Link to="/" className="text-xl font-semibold">
        MyStore
      </Link>

      {/* Search */}
      <form onSubmit={handleSearch} className="flex w-1/3">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-3 py-2 rounded-l-md text-black outline-none"
        />
        <button
          type="submit"
          className="bg-blue-800 px-4 py-2 rounded-r-md"
        >
          Search
        </button>
      </form>

      {/* Right */}
      <div className="flex items-center gap-5">
        <Link to="/products">Products</Link>

        {/* 🛒 CART ICON */}
        <Link to="/cart" className="relative text-xl">
          🛒
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {cartCount}
            </span>
          )}
        </Link>

        {isAuthenticated && user ? (
          <>
            <span className="text-sm">Hi, {user.name}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-3 py-1 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="bg-white text-blue-600 px-3 py-1 rounded"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
