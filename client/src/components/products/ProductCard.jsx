import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/reducers/cartSlice';

function ProductCard({ product }) {
  const dispatch = useDispatch();

  const handleAdd = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <div className="container">
      <div className="w-full max-w-64 height-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href="#">
          <img
            className="p-4 rounded-t-lg w-80 h-60 object-cover"
            src={product.image}
            alt="product image"
          />
        </a>
        <div className="px-4 pb-4">
          <a href="#">
            <h6 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
              {product.name}
            </h6>
          </a>
          <a href="#">
            <h5 className="text-lg font-semibold tracking-tight text-gray-600 dark:text-white">
              {product.description}
            </h5>
          </a>
          <div className="flex items-center mt-2.5 mb-4">
            <div className="flex items-center space-x-1 rtl:space-x-reverse">
              {/* Add stars here */}
              <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
                {product.rating}
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              ₹{product.price}
            </span>
            <button
              onClick={() => handleAdd(product)}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
