import React, { useState } from "react";
import { Button, message, Rate, Tag, Tooltip } from "antd";
import {
  ShoppingCartOutlined,
  HeartOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import { Product } from "@/types/product";
import Image from "antd/lib/image";
import { useRouter } from "next/navigation";
import { MdPayment } from "react-icons/md";
import useCart from "@/hooks/use-cart";

const ProductDetails = ({ productData }: { productData: Product }) => {
  const router = useRouter();
  const { itemCount, updateCart } = useCart();
  const [currentImage, setCurrentImage] = useState<string>(
    productData.product_images[0].image_url
  );
  const [quantity, setQuantity] = useState<number>(1);

  const handleIncrease = () => {
    if (quantity < productData.quantity) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleBuyNow = () => {
    const productIds = [productData.product_id];

    // Generate the URLSearchParams with multiple list parameters
    const params = new URLSearchParams();
    productIds.forEach((id) => {
      params.append("list", id);
    });
    params.append("quantity", quantity.toString());
    console.log(params.toString()); // For debugging, to see the query string
    router.push(`/marketplace/checkout?${params.toString()}`);
  };

  const handleAddToCart = () => {
    const sellerId = productData.seller_id;
    const productId = productData.product_id;

    // Get the existing cart from localStorage
    const cart = JSON.parse(localStorage.getItem("cart") || "{}");

    // Initialize the seller's cart if it doesn't exist
    if (!cart[sellerId]) {
      cart[sellerId] = {};
    }

    // Add or update the product in the seller's cart
    if (cart[sellerId][productId]) {
      cart[sellerId][productId].quantity += quantity;
    } else {
      cart[sellerId][productId] = {
        product_id: productId,
        quantity: quantity,
      };
    }

    // Update the cart and itemCount
    updateCart(cart);

    message.success("เพิ่มสินค้าลงในตะกร้าแล้ว");
  };

  return (
    <div className="gap-x-6 grid grid-cols-1 sm:grid-cols-2 text-primary-800">
      <div className="justify-center flex flex-col">
        <Image
          id="product-image"
          src={currentImage}
          alt="product-image"
          className="w-full object-cover rounded-lg"
          // width={500}
          // height={400}
          style={{ width: "100%", height: "400px", objectFit: "cover" }}
        />
        <div className="flex gap-2 mt-2 mx-auto">
          {productData.product_images.map((image, index) => (
            <Image
              key={index}
              src={image.image_url}
              alt="product-image"
              className={`w-[100px] h-[80px] object-cover rounded-lg ${
                currentImage === image.image_url
                  ? "border-2 border-primary-600"
                  : "opacity-40"
              }`}
              width={100}
              height={80}
              onClick={() => setCurrentImage(image.image_url)}
            />
          ))}
        </div>
      </div>
      <div className="space-y-6 p-4 mt-2 md:-mt-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">{productData.name}</h1>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl font-semibold text-primary">
                ฿{productData.price.toFixed(2)}
              </span>
              {productData.rent && <Tag color="blue">ให้เช่า</Tag>}
            </div>

            <div className="flex items-center gap-2">
              <Tooltip title="เพิ่มในรายการโปรด">
                <Button
                  type="text"
                  icon={<HeartOutlined />}
                  className="text-gray-500 hover:text-red-500"
                />
              </Tooltip>
              <Tooltip title="แชร์">
                <Button
                  type="text"
                  icon={<ShareAltOutlined />}
                  className="text-gray-500 hover:text-primary"
                />
              </Tooltip>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-4 bg-gray-50 p-3 rounded-lg">
            <div>
              <span className="font-medium">หมวดหมู่:</span>{" "}
              {productData.category}
            </div>
            <div>
              <span className="font-medium">สภาพ:</span> {productData.condition}
            </div>
            <div>
              <span className="font-medium">ขนาด:</span> {productData.size}
            </div>
            <div>
              <span className="font-medium">ภูมิภาค:</span> {productData.region}
            </div>
          </div>

          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">คำอธิบาย</h3>
            <p className="text-gray-700 leading-relaxed">
              {productData.description}
            </p>
          </div>
          <div className="flex justify-between">
            <h4 className="text-lg font-semibold mb-2">คงเหลือ</h4>
            <p className="text-gray-700">{productData.quantity} ชิ้น</p>
          </div>

          {productData.rent && (
            <div className="bg-blue-50 border-l-4 border-blue-500 p-3 mb-4">
              <h3 className="font-semibold text-blue-700 mb-2">
                รายละเอียดการเช่า
              </h3>
              <div className="text-sm text-gray-600">
                <p>เงินมัดจำ: ฿{productData.rent_deposit.toFixed(2)}</p>
                <p>
                  วันที่คืน:{" "}
                  {new Date(productData.rent_return_date).toLocaleDateString(
                    "th-TH"
                  )}
                </p>
              </div>
            </div>
          )}

          <div className="flex justify-between">
            {/* Quantity control buttons */}
            <p className="my-auto">จำนวน</p>
            <div className="flex items-center gap-3">
              <Button
                disabled={quantity <= 1}
                onClick={handleDecrease}
                size="large"
                className="px-4"
              >
                -
              </Button>
              <span className="text-lg font-semibold">{quantity}</span>
              <Button
                disabled={quantity >= productData.quantity}
                onClick={handleIncrease}
                size="large"
                className="px-4"
              >
                +
              </Button>
            </div>
          </div>
          <div className="space-y-2 mt-4">
            <Button
              type="primary"
              icon={<ShoppingCartOutlined />}
              size="large"
              block
              disabled={productData.quantity === 0}
              className="flex items-center justify-center"
              onClick={handleAddToCart}
            >
              {productData.quantity > 0 ? "เพิ่มในตะกร้า" : "สินค้าหมด"}
            </Button>

            {/* Buy Now button */}
            <Button
              type="default"
              size="large"
              icon={<MdPayment />}
              block
              onClick={handleBuyNow}
              disabled={productData.quantity === 0}
            >
              สั่งซื้อสินค้า
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
