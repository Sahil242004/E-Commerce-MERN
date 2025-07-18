import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import { currency } from "../App";
import Swal from "sweetalert2";
// import { resolveEnvPrefix } from "vite";

const List = ({ token }) => {
  let [list, setList] = useState([]);

  // call the backend api to fetch all available produts data and then stores in in List
  let fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/all");
      if (response.data.success === true) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  // this function fires a alert and asks for confirmation before deleting the product and then delets the product and recall the fetchList function to update the available products data.
  const deleteProduct = async (id) => {
    // console.log(token);
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This product will be deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      const response = await axios.delete(backendUrl + "/api/product/delete", {
        headers: { token },
        data: { id },
      });

      // console.log(response);
      if (response.data.success === true) {
        toast.success("Product removed successfully");
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error);
      console.log(error);
    }
  };
  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <p className="mb-2">All Products</p>
      <div className="flex flex-col gap-2">
        {/* list table title */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center px-2 py-1 border bg-gray-100 text-sm">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {/* ------------product list------------------ */}
        {list.map((item, index) => (
          // /
          <div
            className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm]"
            key={index}
          >
            <img className="w-12" src={item.image[0]} />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>
              {currency}
              {item.price}
            </p>
            <p
              onClick={() => deleteProduct(item._id)}
              className="text-right md:text-center cursor-pointer text-lg"
            >
              {"x"}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default List;
