import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../../features/product/productAPI";

const HomePage = () => {
  const navigate = useNavigate();

  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const data = await getProducts(1, 4); // page 1, limit 4
        setFeaturedProducts(data.products || []);
      } catch (error) {
        console.error("Error fetching products", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  return (
    <div className="w-full">

      {/* ================= HERO SECTION ================= */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Shop Smart, Shop Fast 🚀
          </h1>
          <p className="text-lg mb-8 opacity-90">
            Discover the best products at unbeatable prices
          </p>
          <button
            onClick={() => navigate("/products")}
            className="bg-white text-blue-600 px-6 py-3 rounded font-semibold hover:bg-gray-100 transition"
          >
            Explore Products
          </button>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6 border rounded">
            <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
            <p className="text-gray-500">
              Get your products delivered quickly and safely
            </p>
          </div>

          <div className="p-6 border rounded">
            <h3 className="text-xl font-semibold mb-2">Secure Payments</h3>
            <p className="text-gray-500">
              100% secure payments with trusted gateways
            </p>
          </div>

          <div className="p-6 border rounded">
            <h3 className="text-xl font-semibold mb-2">Best Quality</h3>
            <p className="text-gray-500">
              Premium products from verified sellers
            </p>
          </div>
        </div>
      </section>

      {/* ================= FEATURED PRODUCTS ================= */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold">
              Featured Products
            </h2>
            <button
              onClick={() => navigate("/products")}
              className="text-blue-600 font-medium hover:underline"
            >
              View All →
            </button>
          </div>

          {loading ? (
            <p className="text-center text-gray-500">
              Loading products...
            </p>
          ) : featuredProducts.length === 0 ? (
            <p className="text-center text-gray-500">
              No products available
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <div
                  key={product._id}
                  onClick={() => navigate(`/products/${product._id}`)}
                  className="bg-white border rounded p-4 hover:shadow-md transition cursor-pointer"
                >
                  <div className="h-40 bg-gray-100 mb-4 rounded flex items-center justify-center">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full object-cover"
                      />
                    ) : (
                      <span className="text-gray-400 text-sm">
                        No Image
                      </span>
                    )}
                  </div>

                  <h3 className="font-semibold truncate">
                    {product.name}
                  </h3>

                  <p className="text-sm text-gray-500 line-clamp-2">
                    {product.description}
                  </p>

                  <p className="font-bold text-blue-600 mt-2">
                    ₹{product.price}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-20 bg-blue-600 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">
          Ready to start shopping?
        </h2>
        <p className="mb-8 opacity-90">
          Browse our collection and find what you love
        </p>
        <button
          onClick={() => navigate("/products")}
          className="bg-white text-blue-600 px-6 py-3 rounded font-semibold hover:bg-gray-100 transition"
        >
          Shop Now
        </button>
      </section>

    </div>
  );
};

export default HomePage;
