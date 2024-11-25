"use client";
import { Button } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaCheckCircle } from "react-icons/fa";
import { IoCameraOutline } from "react-icons/io5";
import { RiScissorsCutLine } from "react-icons/ri";

const SelectService = () => {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const handleSelectService = (service: string) => {
    setSelectedService(service);
  };

  return (
    <div
      className="w-full lg:max-w-[80rem] 2xl:max-w-[86rem] mx-auto flex mt-8
    flex-col flex-grow"
    >
      <h2 className="text-center  text-primary-800 mt-16">โปรดเลือกบริการ</h2>
      <div className="hidden md:flex lg:flex-row justify-center gap-x-12 lg:gap-x-24 my-auto px-8">
        <div
          className={`w-fit hover:scale-105 transition-all ease-linear duration-100 cursor-pointer
            ${selectedService === "search" ? "opacity-100" : "opacity-70"}`}
          onClick={() => handleSelectService("search")}
        >
          <Image
            priority
            unoptimized={true}
            src={"/images/tanuki-search.png"}
            alt="hero-mascot"
            width={300}
            height={300}
            className="z-50 hover:animate-swing"
          />
          <h4 className="text-center mt-12 text-primary-400">
            ค้นหาจากที่วางขาย
          </h4>
        </div>
        <div
          className={`w-fit hover:scale-105 transition-all ease-linear duration-100 cursor-pointer
            ${selectedService === "custom" ? "opacity-100" : "opacity-70"}`}
          onClick={() => handleSelectService("custom")}
        >
          <Image
            priority
            unoptimized={true}
            src={"/images/tanuki-commission.png"}
            alt="hero-mascot"
            width={320}
            height={320}
            className="z-50 hover:animate-headShake"
          />
          <h4 className="text-center mt-7 text-primary-400">
            ประกาศหาร้าน Custom
          </h4>
        </div>
        <div
          className={`w-fit hover:scale-105 transition-all ease-linear duration-100 cursor-pointer ${
            selectedService === "service" ? "opacity-100" : "opacity-70"
          }`}
          onClick={() => handleSelectService("service")}
        >
          <Image
            priority
            unoptimized={true}
            src={"/images/tanuki-service.png"}
            alt="hero-mascot"
            width={300}
            height={300}
            className="z-50 hover:animate-heartBeat"
          />
          <h4 className="text-center mt-12 text-primary-400">
            ค้นหาบริการเสริม
          </h4>
        </div>
      </div>
      <div className="px-6 md:hidden flex flex-col gap-y-4">
        <div
          onClick={() => handleSelectService("search")}
          className={`flex w-full h-fit p-4 border border-secondary-300 bg-white drop-shadow-sm
          rounded-2xl text-primary-300 font-extralight  cursor-pointer transition-all duration-200 ease-in-out
          ${selectedService === "search" && "border-2"}`}
          style={
            selectedService === "search"
              ? { color: "#ffc220", fontWeight: 400 }
              : {}
          }
        >
          <Image
            priority
            unoptimized={true}
            src={"/images/tanuki-search.png"}
            alt="hero-mascot"
            width={70}
            height={70}
            className="z-50 hover:animate-swing"
          />
          <h3 className="my-auto ml-4">ค้นหาจากที่วางขาย</h3>
        </div>
        <div
          onClick={() => handleSelectService("custom")}
          className={`flex w-full h-fit p-4 border border-secondary-300 bg-white drop-shadow-sm
          rounded-2xl text-primary-300 font-extralight  cursor-pointer transition-all duration-200 ease-in-out
          ${selectedService === "custom" && "border-2"}`}
          style={
            selectedService === "custom"
              ? { color: "#ffc220", fontWeight: 400 }
              : {}
          }
        >
          <Image
            priority
            unoptimized={true}
            src={"/images/tanuki-commission.png"}
            alt="hero-mascot"
            width={70}
            height={70}
            className="z-50 hover:animate-headShake"
          />
          <h3 className="my-auto ml-4">ประกาศหาร้าน Custom</h3>
        </div>
        <div
          onClick={() => handleSelectService("service")}
          className={`flex w-full h-fit p-4 border border-secondary-300 bg-white drop-shadow-sm
          rounded-2xl text-primary-300 font-extralight  cursor-pointer transition-all duration-200 ease-in-out
          ${selectedService === "service" && "border-2"}`}
          style={
            selectedService === "service"
              ? { color: "#ffc220", fontWeight: 400 }
              : {}
          }
        >
          <Image
            priority
            unoptimized={true}
            src={"/images/tanuki-service.png"}
            alt="hero-mascot"
            width={70}
            height={70}
            className="z-50 hover:animate-heartBeat"
          />
          <h3 className="my-auto ml-4">ค้นหาบริการเสริม</h3>
        </div>
      </div>
      <Link
        href={
          selectedService === "search"
            ? "/marketplace"
            : selectedService === "custom"
            ? "/custom"
            : selectedService === "service"
            ? "/service"
            : "/select-service"
        }
      >
        <button
          disabled={!selectedService}
          className="text-xl bg-secondary-100 text-primary-400 px-8 py-3 rounded-3xl mb-24 
      tracking-wide flex justify-self-center mt-16 border-2 border-secondary-200 hover:text-primary-600
      transition-all duration-200 ease-in-out hover:border-primary-300 disabled:opacity-50 disabled:hover:text-primary-400 
        disabled:hover:border-secondary-200 disabled:cursor-not-allowed"
        >
          ถัดไป
        </button>
      </Link>
    </div>
  );
};

export default SelectService;
