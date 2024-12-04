"use client";
import React, { useState } from "react";
import { Badge, Drawer } from "antd";
import { BsCart2 } from "react-icons/bs";
import CartList from "./cart-list";
import useCart from "@/hooks/use-cart";

const CartButton = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const {itemCount} = useCart();

  const handleDrawerOpen = () => {
    console.log("HELLO")
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  return (
    <>
      <button onClick={handleDrawerOpen} className="cursor-pointer">
        <Badge count={itemCount}>
          <BsCart2 className="text-3xl text-primary-800" />
        </Badge>
      </button>

      <Drawer
        title="ตะกร้าสินค้าของคุณ"
        placement="right"
        onClose={handleDrawerClose}
        open={isDrawerOpen}
        width={600} // Adjust the width as needed
      >
        <CartList onClose={handleDrawerClose} />
      </Drawer>
    </>
  );
};

export default CartButton;
