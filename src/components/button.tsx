"use client";

import { FaLongArrowAltRight } from "react-icons/fa";

interface HeroButtonProps {
  text: string;
  onClick: () => void;
  disabled?: boolean;
}

const HeroButton = ({ text, onClick, disabled }: HeroButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="text-lg flex gap-x-2 hover:gap-x-6 text-secondary-700 bg-secondary-400 pl-5 pr-4 py-1.5 border border-primary-500
         rounded-full hover:pr-3 hover:bg-secondary-200 hover:text-primary-700 transition-all
            duration-300 ease-in-out"
    >
      <span>{text}</span>
      <FaLongArrowAltRight className="my-auto text-xl pt-0.5" />
    </button>
  );
};

export default HeroButton;
