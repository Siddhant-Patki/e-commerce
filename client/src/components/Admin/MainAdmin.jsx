import Admin from "./Admin";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  // BsFillBellFill,
} from "react-icons/bs";

function MainAdmin() {
  const [productCount, setProductCount] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  useEffect(() => {
    async function fetchProductCount() {
      try {
        const response = await fetch("http://localhost:5000/products/count");
        if (!response.ok) {
          throw new Error("Failed to fetch product count");
        }
        const data = await response.json();
        setProductCount(data.totalProducts);
      } catch (error) {
        console.error("Error fetching product count:", error);
      }
    }

    fetchProductCount();
  }, []);
  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch("http://localhost:5000/total/users");
        if (!response.ok) {
          throw new Error("Failed to fetch user count");
        }
        const data = await response.json();
        setTotalUsers(data.totalUsers);
      } catch (error) {
        console.error("Error fetching user count:", error);
      }
    }

    fetchUsers();
  }, []);
  return (
    <>
      <main className="main-container">
        <div className="main-title">
          <h3>DASHBOARD</h3>
        </div>

        <div className="main-cards">
          <div className="card">
            <div className="card-inner">
              <h3>PRODUCTS</h3>
              <Link to="/admin/products">
                <BsFillArchiveFill className="card_icon" />
              </Link>
            </div>
            <h1>{productCount}</h1>
          </div>
          <div className="card">
            <div className="card-inner">
              <h3>MANAGE PRODUCTS</h3>
              <Link to="/admin/products">
                {/* <BsFillGrid3X3GapFill className="card_icon" /> */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-bag-plus-fill"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0M8.5 8a.5.5 0 0 0-1 0v1.5H6a.5.5 0 0 0 0 1h1.5V12a.5.5 0 0 0 1 0v-1.5H10a.5.5 0 0 0 0-1H8.5z"
                  />
                </svg>
              </Link>
            </div>
            <h1>12</h1>
          </div>
          <div className="card">
            <div className="card-inner">
              <h3>CUSTOMERS</h3>
              <Link to="/admin/users">
                <BsPeopleFill className="card_icon" />
              </Link>
            </div>
            <h1>{totalUsers}</h1>
          </div>
          <div className="card">
            <div className="card-inner">
              <h3>ALERTS</h3>
              <Link to="/admin/products">
                {/* <BsFillBellFill className="card_icon" /> */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-journal-bookmark-fill"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M6 1h6v7a.5.5 0 0 1-.757.429L9 7.083 6.757 8.43A.5.5 0 0 1 6 8z"
                  />
                  <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2" />
                  <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1z" />
                </svg>
                {/* <i class="bi bi-journal-bookmark-fill"></i> */}
              </Link>
            </div>
            <h1>42</h1>
          </div>
        </div>
      </main>
      <Admin />
      {/* <div className="pt-10">
        <Admin />
      </div> */}
    </>
  );
}
export default MainAdmin;
