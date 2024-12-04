import { useState, useEffect } from "react";

const useCart = () => {
  const [itemCount, setItemCount] = useState<number>(0);

  const calculateCartCount = () => {
    const savedCart = localStorage.getItem("cart");
    if (!savedCart) {
      setItemCount(0);
      return;
    }

    const parsedCart = JSON.parse(savedCart);
    let uniqueProductCount = 0;
    const productIds = new Set();

    Object.values(parsedCart).forEach((seller: any) => {
      Object.values(seller).forEach((item: any) => {
        if (!productIds.has(item.product_id)) {
          productIds.add(item.product_id);
          uniqueProductCount += 1;
        }
      });
    });

    setItemCount(uniqueProductCount);
  };

  useEffect(() => {
    // Initial calculation of cart count

    calculateCartCount();

    // Event listener for storage changes
    const handleStorageChange = () => calculateCartCount();
    window.addEventListener("storage", handleStorageChange);

    return () => window.removeEventListener("storage", handleStorageChange);
  }, []); // Remove itemCount from dependency array to avoid unnecessary re-renders

  // Update cart method
  const updateCart = (newCart: object) => {
    localStorage.setItem("cart", JSON.stringify(newCart));
    const productIds = new Set();
    let uniqueProductCount = 0;

    Object.values(newCart).forEach((seller: any) => {
      Object.values(seller).forEach((item: any) => {
        if (!productIds.has(item.product_id)) {
          productIds.add(item.product_id);
          uniqueProductCount += 1;
        }
      });
    });

    setItemCount(uniqueProductCount); // Update itemCount directly
  };

  const removeSellerFromCart = (sellerId: string) => {
    console.log("Removing seller from cart:", sellerId);
    const savedCart = localStorage.getItem("cart");
    if (!savedCart) return;

    const parsedCart = JSON.parse(savedCart);
    // Remove the seller's products from the cart
    delete parsedCart[sellerId];
    localStorage.setItem("cart", JSON.stringify(parsedCart));
    calculateCartCount();
  };

  return { itemCount, updateCart, removeSellerFromCart };
};

export default useCart;
