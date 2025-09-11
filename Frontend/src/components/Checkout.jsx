import React from "react";

const Checkout = () => {
  const handlePayment = async () => {
    // 1️⃣ Create Order from backend
    const res = await fetch("http://localhost:3000/api/payment/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: 500,
        userId: "64d8a2f12345abc67890xyz", // Replace with logged-in user _id
        products: ["64d8b3f12345abc67890aaa"], // Replace with cart products
        address: "123, Delhi, India"
      })
    });

    const order = await res.json();

    // 2️⃣ Razorpay Options
    const options = {
      key: "rzp_test_R8ii8fDuBn4fEH", // frontend should use only key_id
      amount: order.amount,
      currency: order.currency,
      name: "Ecommerce Store",
      description: "Test Transaction",
      order_id: order.id, // ✅ Razorpay order id from backend
      handler: async function (response) {
        // 3️⃣ Verify payment on backend
        const verifyRes = await fetch("http://localhost:3000/api/payment/verify-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
            userId: "64d8a2f12345abc67890xyz" // Same logged-in user
          })
        });

        const result = await verifyRes.json();
        alert(result.message || "Payment processed");
      },
      prefill: {
        name: "Devanshu",
        email: "dev@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <button 
      onClick={handlePayment} 
      style={{
        backgroundColor: '#3399cc',
        color: 'white',
        padding: '12px 24px',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: '600'
      }}
    >
      Pay Now
    </button>
  );
};

export default Checkout;
