import { Cosplayer } from "@/types/profile";
import { HeartOutlined } from "@ant-design/icons";
import { Button, Carousel } from "antd";
import Image from "next/image";
import React from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import {
  IoChatbubbleEllipsesOutline,
  IoRemoveCircleOutline,
} from "react-icons/io5";

const MatchedUserCard = ({
  cosplayer,
  onIgnore,
  onInterest,
}: {
  cosplayer: Cosplayer;
  onIgnore: (username:string) => void;
  onInterest: (username:string) => void;
}) => {
  return (
    <div className="w-full grid grid-cols-5 relative">
      <div className="col-span-full md:col-span-2 h-full">
        <div className="w-full p-2 bg-secondary-50 border border-primary-100 rounded-md md:hidden mb-3 flex gap-x-4 justify-center">
          <button
            onClick={() => onIgnore(cosplayer.username)}
            className="bg-white px-4 py-1 border border-primary-100 rounded-md text-red-400"
          >
            <IoRemoveCircleOutline className="inline-block my-auto text-2xl" />
            <p className="text-sm">ไม่สนใจ</p>
          </button>
          <button
            onClick={() => onInterest(cosplayer.username)}
            className="bg-white px-4 py-1 border border-primary-100 rounded-md text-green-600"
          >
            <HeartOutlined className="inline-block my-auto text-2xl" />
            <p className="text-sm">สนใจ</p>
          </button>
          <button className="bg-white px-4 py-1 border border-primary-100 rounded-md">
            <IoChatbubbleEllipsesOutline className="inline-block my-auto text-2xl" />
            <p className="text-sm">แชท</p>
          </button>
        </div>
        <div className="bg-secondary-50 border border-primary-100 rounded-lg">
          <Image
            className="object-cover w-full rounded-lg h-[240px] rounded-b-none"
            src={cosplayer.profile_image_url || "/images/profile.png"}
            alt="placeholder"
            // unoptimized
            width={200}
            height={240}
          />
          <div className="text-center pb-2 mt-2">
            <h4>{cosplayer.display_name}</h4>
            <p>@{cosplayer.username}</p>
          </div>
          <div className="px-2.5 mb-2">
            <p className="mt-2">สิ่งที่สนใจ</p>
            <div className="flex flex-wrap">
              {cosplayer?.interests && cosplayer.interests.length > 0 ? (
              cosplayer.interests.slice(0, 5).map((interest, index) => (
                <div
                key={index}
                className="bg-white px-2 py-1 rounded-lg border border-primary-100 m-1 text-sm"
                >
                {interest}
                </div>
              ))
              ) : (
              <p className="text-sm text-gray-500">No interests listed</p>
              )}
              {cosplayer?.interests && cosplayer.interests.length > 5 && (
              <div className="mt-auto mb-0.5 text-lg ml-2">...</div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-full md:col-span-3 ml-0 mt-3 md:mt-0 md:ml-3">
        <p>โปรไฟล์</p>
        <div className="flex flex-wrap justify-center gap-x-8 bg-secondary-50 px-2 py-2 rounded-lg border border-primary-100">
          <div className="flex text-xl">
            <FaInstagram className="inline-block my-auto" />:
            <span className="ml-2 my-auto">
              {cosplayer?.instagram_url || "-"}
            </span>
          </div>
          <div className="flex text-xl">
            <FaTwitter className="inline-block my-auto" />:
            <span className="ml-2 my-auto">
              {cosplayer?.twitter_url || "-"}
            </span>
          </div>
          <div className="flex text-xl">
            <FaFacebook className="inline-block my-auto" />:
            <span className="ml-2 my-auto">
              {cosplayer?.facebook_url || "-"}
            </span>
          </div>
        </div>
        <p className="mt-2">ผลงานคอสเพลย์</p>
        {cosplayer?.portfolios.length > 0 ? (
          <div className="mt-1 w-full px-3 pt-2 pb-3 bg-secondary-50 border border-primary-100 rounded-lg">
            <Carousel
              autoplaySpeed={2000}
              autoplay
              style={{ width: "100%" }}
              arrows
            >
              {cosplayer.portfolios.map((portfolio, index) => (
                <div key={index} className="flex justify-center w-full">
                  <div className="mx-auto w-full">
                    <h4 className="font-bold">{portfolio.title}</h4>
                    <p>{portfolio.description}</p>
                    {portfolio.portfolio_images.length > 0 && (
                      <Image
                        src={portfolio.portfolio_images[0].image_url}
                        alt={portfolio.title}
                        className="w-full h-[160px] object-cover rounded-lg mt-2"
                        width={300}
                        height={160}
                      />
                    )}
                  </div>
                </div>
              ))}
            </Carousel>
          </div>
        ) : (
          <p>-</p>
        )}
        <div className="w-full p-2 bg-secondary-50 border border-primary-100 rounded-md mt-2 hidden md:flex gap-x-4 justify-center">
          <button
            onClick={() => onIgnore(cosplayer.username)}
            className="bg-white px-4 py-1 border border-primary-100 rounded-md text-red-400"
          >
            <IoRemoveCircleOutline className="inline-block my-auto text-2xl" />
            <p className="text-sm">ไม่สนใจ</p>
          </button>
          <button
            onClick={() => onInterest(cosplayer.username)}
            className="bg-white px-4 py-1 border border-primary-100 rounded-md text-green-600"
          >
            <HeartOutlined className="inline-block my-auto text-2xl" />
            <p className="text-sm">สนใจ</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MatchedUserCard;