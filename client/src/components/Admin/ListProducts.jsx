import React, { useState, useEffect } from "react";

function ListProducts() {
  const [allItems, setAllItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("http://localhost:5000/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setAllItems(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    fetchProducts();
  }, []);

  const handleDelete = async () => {
    if (selectedProductId) {
      try {
        const response = await fetch(`http://localhost:5000/products/${selectedProductId}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          throw new Error("Failed to delete product");
        }
        // Delete product
        console.log("Deleting product with ID:", selectedProductId);
        setAllItems((prevItems) => prevItems.filter((item) => item.id !== selectedProductId));
        setIsModalOpen(false); // Close the modal after deletion
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  const openModal = (id) => {
    setSelectedProductId(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProductId(null);
  };

  return (
    <div className="w-full p-4">
      {/* Map through all products */}
      <div className="flex flex-wrap justify-between">
        {allItems.map((product) => (
          <div key={product.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 p-4">
            <div className="border rounded-lg overflow-hidden shadow-md">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <p className="text-lg font-semibold">{product.name}</p>
                <p className="text-gray-600">Price: ₹{product.price}</p>
                <p className="text-gray-600">Category: {product.category}</p>
              </div>
              <div className="p-4 flex justify-end">
                <button
                  onClick={() => openModal(product.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 focus:outline-none"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div id="popup-modal" className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-gray-800 bg-opacity-50">
          <div className="relative p-4 w-full max-w-md">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button
                type="button"
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={closeModal}
              >
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7l-6 6" />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="p-4 md:p-5 text-center">
                <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this product?</h3>
                <button
                  onClick={handleDelete}
                  type="button"
                  className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                >
                  Yes, I'm sure
                </button>
                <button
                  onClick={closeModal}
                  type="button"
                  className="py-2.5 px-5 ml-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  No, cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ListProducts;
