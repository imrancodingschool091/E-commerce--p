import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchProduct } from "../../features/product/productAPI";
import ProductCard from "../../components/layout/ProductCard";

const SearchResult = () => {
  const [searchParams] = useSearchParams();
  const term = searchParams.get("term");

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!term) return;

    const fetchSearchResults = async () => {
      try {
        setLoading(true);
        const data = await searchProduct(term);
        setProducts(data);
      } catch (err) {
        setError("Failed to fetch search results");
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [term]);

  if (!term) {
    return (
      <div className="text-center text-gray-500 mt-10">
        Please enter a search term
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 font-semibold">
        Searching products...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">
        Search results for:{" "}
        <span className="text-blue-600">
          "{term}"
        </span>
      </h1>

      {products.length === 0 ? (
        <p className="text-gray-500">
          No products found
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))}
        </div>
      )}

      {error && (
        <p className="text-center text-red-500 mt-4">
          {error}
        </p>
      )}
    </div>
  );
};

export default SearchResult;
