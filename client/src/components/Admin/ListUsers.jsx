import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ListUsers() {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const openModal = (id) => {
    setSelectedUserId(id); // Store the selected user ID
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUserId(null); // Reset the selected user ID
  };

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch("http://localhost:5000/users");
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }

    fetchUsers();
  }, []);

  const handleDeleteUser = async () => {
    if (!selectedUserId) return; // Ensure there is a selected user ID
    try {
      const response = await fetch(
        `http://localhost:5000/users/${selectedUserId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete user");
      }
      setUsers(users.filter((user) => user._id !== selectedUserId));
      toast.success("User deleted Successfully!");
      closeModal(); // Close the modal after deletion
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <>
      <div className="user-list flex flex-col m-5">
        {users.map((user) => (
          <div
            key={user._id} // Use _id as the key
            className="user-card bg-white shadow-md rounded-lg p-4 m-2 w-64"
          >
            <p className="font-semibold">Email: {user.email}</p>
            <p>Password: *********</p>
            <button
              onClick={() => openModal(user._id)}
              className="mt-2 bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-md float-right"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      {isModalOpen && (
        <div
          id="popup-modal"
          className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-gray-800 bg-opacity-50"
        >
          <div className="relative p-4 w-full max-w-md">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button
                type="button"
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={closeModal}
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
                    d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="p-4 md:p-5 text-center">
                <svg
                  className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  Are you sure you want to delete this product?
                </h3>
                <button
                  onClick={handleDeleteUser}
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
    </>
  );
}

export default ListUsers;
