import React, { useContext, useEffect } from "react";
import ShopContext from "../context/ShopContext";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const Verify = () => {
  const { navigate, token, setCartItem, backendUrl } = useContext(ShopContext);
  const [searchParams, setSearchParams] = useSearchParams();

  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const verifyPayment = async () => {
    try {
      if (!token) return null;

      const response = await axios.post(
        backendUrl + "/api/order/verifyStipe",
        { success, orderId },
        { headers: { token } }
      );

      if (response.data.success) {
        setCartItem({});
        navigate("/orders");
      } else {
        navigate("/cart");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    verifyPayment();
  }, [token]);
  return <div>Verify</div>;
};

export default Verify;
