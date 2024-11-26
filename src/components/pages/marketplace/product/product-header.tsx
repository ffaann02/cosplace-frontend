// import Image from "next/image";
import { Seller } from "@/types/seller";
import { EyeOutlined, ShopOutlined } from "@ant-design/icons";
import { Button, Image } from "antd";
import React from "react";
import { IoChatboxOutline } from "react-icons/io5";

const ProductHeader = ({
  seller,
  showButton = true,
}: {
  seller: Seller;
  showButton?: boolean;
}) => {
  return (
    <div className="w-full mb-4 bg-neutral-50 px-4 pt-2 pb-3 rounded-lg border border-primary-100 text-primary-600">
      <h4 className="text-primary-700 text-sm">
        <ShopOutlined className="text-sm  mr-2" />
        ร้านค้า
      </h4>
      {seller && (
        <div className="flex space-y-3 flex-col md:flex-row mt-3 justify-between">
          <div className="flex">
            <Image
              src={seller?.profile_image_url}
              alt={seller?.shop_name}
              width={50}
              height={50}
              className="rounded-lg my-auto"
            />
            <div className="ml-3 -mt-1">
              <h4 className="text-primary-700">{seller?.shop_name}</h4>
              <h5 className="text-sm">{seller?.shop_desc}</h5>
            </div>
          </div>
          {showButton && <div className="my-auto flex space-x-2">
            {/* <p>{seller.seller_username}</p> */}
            <Button
              href={`/profile/${seller.seller_username}?tab=shop`}
              type="primary"
              icon={<EyeOutlined />}
            >
              ดูโปรไฟล์ร้านค้า
            </Button>
            <Button icon={<IoChatboxOutline />}>แชท</Button>
          </div>}
        </div>
      )}
    </div>
  );
};

export default ProductHeader;
