import React from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

function CheckoutForm({ totalAmount }) {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.log("[error]", error);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      //payment ideas
    }
  };

  const handlePay = () =>{
    console.log("hi");
  }

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button
        type="submit"
        disabled={!stripe}
        className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-700 mt-6"
        onClick={handlePay}
      >
        Pay ₹{totalAmount}
      </button>
    </form>
  );
}

export default CheckoutForm;
