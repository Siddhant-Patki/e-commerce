// // src/components/Services.js
// import React, { useEffect } from "react";
// import ProductCard from "./ProductCard";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchProducts } from "../../redux/reducers/productSlice";

// function Services() {
//   const dispatch = useDispatch();
//   const products = useSelector((state) => state.products.products);

//   useEffect(() => {
//     dispatch(fetchProducts());
//   }, [dispatch]);

//   return (
//     <div className="p-10 pt-0">
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 justify-items-center">
//         {products.map((product) => (
//           <ProductCard key={product.id} product={product} />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Services;

