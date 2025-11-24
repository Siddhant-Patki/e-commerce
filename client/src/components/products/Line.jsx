import React from "react";
// import image from "./caro_1.jpg";
import { Link } from "react-router-dom";

function Line() {
  return (
    <div className="card-top container-fluid">
      <div className="line-cont d-flex">
        <div className="item">
          <Link href="/home">
            <img src='/products.jpg' alt="" className="item-image" />
            <h6>All Products</h6>
          </Link>
        </div>
        <div className="item">
          <Link>
            <img src="/fashion_1.jpg" alt="" className="item-image" />
            <h6>Fashion</h6>
          </Link>
        </div>
        <div className="item">
          <Link>
            <img src="/jewelery_1.jpg" alt="" className="item-image" />
            <h6>Jewelery</h6>
          </Link>
        </div>
        <div className="item">
          <Link>
            <img src="/electronics.jpg" alt="" className="item-image" />
            <h6>Electronics</h6>
          </Link>
        </div>
        <div className="item">
          <Link>
            <img src="/grocery.jpg" alt="" className="item-image" />
            <h6>Grocery</h6>
          </Link>
        </div>
        {/* <div className="item">
          <Link>
            <img src={image} alt="" className="item-image" />
            <h6>Grocery</h6>
          </Link>
        </div> */}
      </div>
    </div>
  );
}

export default Line;
