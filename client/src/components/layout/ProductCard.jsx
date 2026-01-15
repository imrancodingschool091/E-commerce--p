import { useNavigate } from "react-router-dom";

 const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white border rounded-lg shadow-sm hover:shadow-md transition p-4">
      {/* image */}
      <div className="h-40 bg-gray-100 rounded mb-4" />

      <h2 className="text-lg font-semibold truncate">
        {product.name}
      </h2>

      <p className="text-sm text-gray-500 line-clamp-2">
        {product.description}
      </p>

      <div className="flex justify-between items-center mt-4">
        <span className="text-lg font-bold text-blue-600">
          ₹{product.price}
        </span>

        <button
          onClick={() => navigate(`/products/${product._id}`)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          View
        </button>
      </div>
    </div>
  );
};

export default ProductCard
