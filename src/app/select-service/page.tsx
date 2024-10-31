"use client";
import { Button } from "antd";
import Link from "next/link";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaCheckCircle } from "react-icons/fa";
import { IoCameraOutline } from "react-icons/io5";
import { RiScissorsCutLine } from "react-icons/ri";

const SelectService = () => {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  console.log(selectedService);

  const handleSelectService = (service: string) => {
    setSelectedService(service);
  };

  return (
    <div className="mt-12 lg:mt-16 w-full lg:max-w-[80rem] 2xl:max-w-[86rem] mx-auto">
      <h2 className="text-center text-primary-800 mb-8 md:mb-16">
        โปรดเลือกบริการ
      </h2>
      <div className="hidden md:flex lg:flex-row justify-center gap-x-12 lg:gap-x-24">
        <div className="w-fit">
          <div
            onClick={() => handleSelectService("search")}
            className={`relative flex w-[200px] h-[200px] lg:w-[240px] lg:h-[240px] border border-secondary-200 rounded-full 
            drop-shadow-md bg-white text-primary-300 cursor-pointer transition-all duration-200 ease-in-out
            ${selectedService === "search" ? "border-[4px]" : ""}`}
          >
            <FaCheckCircle
              className={`text-5xl absolute right-2 top-4 bg-white rounded-full transition-all duration-200 ease-in-out
            text-secondary-200 border-secondary-200 opacity-0 ${
              selectedService === "search" && "opacity-100"
            }`}
            />
            <CiSearch
              className="text-8xl m-auto pb-2"
              style={selectedService === "search" ? { color: "#ffd95a" } : {}}
            />
          </div>
          <h4 className="text-center mt-6 text-primary-400">
            ค้นหาจากที่วางขาย
          </h4>
        </div>
        <div className="w-fit">
          <div
            onClick={() => handleSelectService("custom")}
            className={`relative flex w-[200px] h-[200px] lg:w-[240px] lg:h-[240px] border border-secondary-200 rounded-full 
            drop-shadow-md bg-white text-primary-300 cursor-pointer transition-all duration-200 ease-in-out
            ${selectedService === "custom" ? "border-[4px]" : ""}`}
          >
            <FaCheckCircle
              className={`text-5xl absolute right-2 top-4 bg-white rounded-full transition-all duration-200 ease-in-out
            text-secondary-200 border-secondary-200 opacity-0 ${
              selectedService === "custom" && "opacity-100"
            }`}
            />
            <RiScissorsCutLine
              className="text-8xl m-auto pb-2"
              style={selectedService === "custom" ? { color: "#ffd95a" } : {}}
            />
          </div>
          <h4 className="text-center mt-6 text-primary-400">
            ประกาศหาร้าน Custom
          </h4>
        </div>
        <div className="w-fit">
          <div
            onClick={() => handleSelectService("service")}
            className={`relative flex w-[200px] h-[200px] lg:w-[240px] lg:h-[240px] border border-secondary-200 rounded-full 
            drop-shadow-md bg-white text-primary-300 cursor-pointer transition-all duration-200 ease-in-out
            ${selectedService === "service" ? "border-[4px]" : ""}`}
          >
            <FaCheckCircle
              className={`text-5xl absolute right-2 top-4 bg-white rounded-full transition-all duration-200 ease-in-out
            text-secondary-200 border-secondary-200 opacity-0 ${
              selectedService === "service" && "opacity-100"
            }`}
            />
            <IoCameraOutline
              className="text-8xl m-auto pb-2"
              style={selectedService === "service" ? { color: "#ffd95a" } : {}}
            />
          </div>
          <h4 className="text-center mt-6 text-primary-400">
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
          <CiSearch className="text-5xl" />
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
          <RiScissorsCutLine className="text-5xl" />
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
          <IoCameraOutline className="text-5xl" />
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
          className="text-xl bg-secondary-100 text-primary-400 px-8 py-3 rounded-3xl 
      tracking-wide flex justify-self-center mt-16 border-2 border-secondary-200 hover:text-primary-600
      transition-all duration-200 ease-in-out hover:border-primary-300"
        >
          ถัดไป
        </button>
      </Link>
    </div>
  );
};

export default SelectService;
