import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/reducers/productSlice";

function Admin() {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    image: null,
    name: "",
    description: "",
    rating: "",
    price: "",
    category: "",
  });
  const [errors, setErrors] = useState({});

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setErrors({});
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.image) tempErrors.image = "Image is required.";
    if (!formData.name) tempErrors.name = "Name is required.";
    if (!formData.description)
      tempErrors.description = "Description is required.";
    if (!formData.rating) tempErrors.rating = "Rating is required.";
    if (!formData.price) tempErrors.price = "Price is required.";
    if (!formData.category) tempErrors.category = "Category is required.";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("image", formData.image);
      formDataToSend.append("name", formData.name);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("rating", formData.rating);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("category", formData.category);

      const response = await fetch("http://localhost:5000/add-product", {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error("Failed to add product");
      }

      const responseData = await response.json();
      console.log("Product added successfully:", responseData);
      dispatch(addProduct(responseData.product));
      closeModal();
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <>
      <button
        onClick={openModal}
        className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
      >
        Toggle modal
      </button>

      {isModalOpen && (
        <div
          id="crud-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-gray-800 bg-opacity-50"
        >
          <div className="relative p-4 w-full max-w-md max-h-full bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Create New Product
              </h3>
              <button
                type="button"
                onClick={closeModal}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <form className="p-4 md:p-5" onSubmit={handleSubmit}>
              <div className="col-span-2">
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  htmlFor="image"
                >
                  Upload image
                </label>
                <input
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  id="image"
                  type="file"
                  name="image"
                  onChange={handleChange}
                />
              </div>
              <label
                htmlFor="name"
                className=" mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="Product Name"
                required
                value={formData.name}
                onChange={handleChange}
              />
              <div className="grid gap-4 mb-4 grid-cols-2 pt-2">
                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="price"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Price
                  </label>
                  <input
                    type="number"
                    name="price"
                    id="price"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="₹1999"
                    required
                    value={formData.price}
                    onChange={handleChange}
                  />
                  <label
                    htmlFor="rating"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Rating
                  </label>
                  <input
                    type="number"
                    name="rating"
                    id="rating"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="3.5"
                    required
                    value={formData.rating}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="category"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    value={formData.category}
                    onChange={handleChange}
                  >
                    <option value="">Select category</option>
                    <option value="Fashion">Fashion</option>
                    <option value="Jewelery">Jewelery</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Grocery">Grocery</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="description"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Product Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows="2"
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Write product description here"
                    value={formData.description}
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>
              <button
                type="submit"
                className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <svg
                  className="me-1 -ms-1 w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                Add new product
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Admin;
