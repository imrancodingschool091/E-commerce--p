import React, { useEffect, useState } from "react";
import { getProducts } from "../../features/product/productAPI";
import ProductCard from "../../components/layout/ProductCard";


const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const limit = 8;

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  const fetchProducts = async (page) => {
    try {
      setLoading(true);
      const data = await getProducts(page, limit);

      setProducts(data.products);
      setCurrentPage(data.currentPage);
      setTotalPages(data.totalPages);
    } catch (err) {
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 font-semibold">
        Loading products...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Products</h1>

      {products.length === 0 ? (
        <p className="text-gray-500">No products found</p>
      ) : (
        <>
          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-3 mt-10">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className={`px-4 py-2 rounded border ${
                currentPage === 1
                  ? "cursor-not-allowed opacity-50"
                  : "hover:bg-gray-100"
              }`}
            >
              Prev
            </button>

            <span className="font-medium">
              Page {currentPage} of {totalPages}
            </span>

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className={`px-4 py-2 rounded border ${
                currentPage === totalPages
                  ? "cursor-not-allowed opacity-50"
                  : "hover:bg-gray-100"
              }`}
            >
              Next
            </button>
          </div>
        </>
      )}

      {error && (
        <p className="text-center text-red-500 mt-4">
          {error}
        </p>
      )}
    </div>
  );
};

export default ProductList;
