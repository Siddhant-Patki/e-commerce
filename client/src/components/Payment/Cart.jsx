import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateCartItemQuantity } from "../../redux/reducers/cartSlice";
import Stepper from "./Stepper";
import CheckoutForm from "../Payment/CheckOutForm";

function Cart() {
  const allItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  
  const [couponCode, setCouponCode] = useState('');
  const [discountValue, setDiscountValue] = useState('');
  const [showModal, setShowModal] = useState(false); // State to control modal visibility

  const handleDelete = (id) => {
    dispatch(removeFromCart({ id }));
  };

  const handleQuantityChange = (id, quantity) => {
    dispatch(updateCartItemQuantity({ id, quantity }));
  };

  const handleDiscount = () => {
    setDiscountValue(couponCode);
  };

  const handleClearDiscount = () => {
    setDiscountValue('');
    setCouponCode('');
  };

  const handleCheckout = () => {
    setShowModal(true); // Show modal on checkout
  };

  const totalAmount = allItems.reduce((total, item) => total + item.productPrice, 0) - (discountValue ? discountValue : 0);

  return (
    <>
      <Stepper />

      <div className="flex p-4">
        <div className="w-3/5 p-6 border rounded mr-1">
          {allItems.map((product) => (
            <div key={product.id} className="flex justify-between items-center mb-4">
              <div>
                <img src={product.image} alt="image" className="w-[200px] h-[150px] object-cover" />
              </div>
              <div>
                <b>{product.name}</b>
                <p>Price: ₹{product.unitPrice}</p>
                <p>Quantity: {product.productQuantity}</p>
                <p>Total Price: <b>₹{product.productPrice}</b></p>
              </div>
              <div className="flex flex-col pr-10">
                <button onClick={() => handleDelete(product.id)} className="flex bg-red-500 text-white px-2 py-1 rounded">
                  Delete
                  <span className="pl-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                  </span>
                </button>
                <div className="mt-3 flex flex-row items-center">
                  <p className="mb-1 mr-1">Quantity</p>
                  <select value={product.productQuantity} onChange={(e) => handleQuantityChange(product.id, Number(e.target.value))} className="block appearance-none max-w-xs bg-white border border-gray-300 py-1 px-2 rounded-md shadow-sm focus:outline-none focus:border-blue-500 sm:text-sm mx-auto">
                    {[...Array(8).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>{x + 1}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          ))}
          <div className="border-t"></div>
        </div>

        <div className="w-2/5 p-4 border rounded shadow">
          <h2 className="text-lg font-bold mb-4">Checkout</h2>
          <div className="mb-4">
            <h3 className="font-medium">Apply Coupons</h3>
            <div className="flex items-center mt-2">
              <input type="number" placeholder="Enter coupon code" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} className="flex-grow p-2 border border-gray-300 rounded mr-2" />
              <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleDiscount}>
                Apply
              </button>
            </div>
            {discountValue && (
              <span id="badge-dismiss-green" className="mt-2 inline-flex items-center px-2 py-1 me-2 text-sm font-medium text-green-800 bg-green-100 rounded dark:bg-green-900 dark:text-green-300">
                {discountValue}
                <button type="button" className="inline-flex items-center p-1 ms-2 text-sm text-green-400 bg-transparent rounded-sm hover:bg-green-200 hover:text-green-900 dark:hover:bg-green-800 dark:hover:text-green-300" data-dismiss-target="#badge-dismiss-green" aria-label="Remove" onClick={handleClearDiscount}>
                  <svg className="w-2 h-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                  </svg>
                  <span className="sr-only">Remove badge</span>
                </button>
              </span>
            )}
          </div>
          <div className="mb-4">
            <img src="/payment.jpg" alt="Promotional" className="w-full rounded" style={{ height: '150px', objectFit: 'cover' }} />
          </div>

          <div className="border-t pt-4">
            <h3 className="font-medium mb-2">Price Details</h3>
            <div className="flex justify-between mb-1">
              <span>Total MRP</span>
              <span>₹{allItems.reduce((total, item) => total + item.productPrice, 0)}</span>
            </div>
            <div className="flex justify-between mb-1">
              <span>Total Discount</span>
              <span className="text-green-500">-₹{discountValue ? discountValue : 0}</span>
            </div>
            <div className="flex justify-between mb-1 font-bold border-t pt-2">
              <span>Total Amount</span>
              <span>₹{totalAmount}</span>
            </div>
          </div>
          {!showModal ? (
            <button className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-700 float-right" onClick={handleCheckout}>
              Checkout
            </button>
          ) : (
            <div className="fixed inset-0 overflow-y-auto z-50 flex items-center justify-center bg-gray-500 bg-opacity-50">
              <div className="relative p-4 w-full max-w-2xl max-h-full">
                <div className="relative bg-white rounded-lg shadow">
                  {/* Modal header */}
                  <div className="flex items-center justify-between p-4  border-b rounded-t">
                    <h3 className="text-xl font-semibold text-gray-900">
                      Checkout
                    </h3>
                    <button
                      onClick={() => setShowModal(false)}
                      className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
                    >
                      <svg
                        className="w-3 h-3"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
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
                  {/* Modal body */}
                  <div className="p-4 md:p-5">
                    <CheckoutForm totalAmount={totalAmount} />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Cart;
