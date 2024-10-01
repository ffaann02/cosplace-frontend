import { Flex } from "antd";
import Link from "next/link";

const Navbar = () => {
  return (
    <Flex className="h-12 bg-primary-100 flex items-center justify-between z-50 fixed top-0 w-full px-12 border-b  drop-shadow-sm">
      <h1 className="text-xl font-semibold text-primary-600 tracking-wider">
        CosBaanDeawGun
      </h1>
      <Flex>
        <Link href="/" passHref>
          <span className="text-primary-600 hover:text-primary-800 ml-6">
            Home
          </span>
        </Link>
        <Link href="/about" passHref>
          <span className="text-primary-600 hover:text-primary-800 ml-6">
            About
          </span>
        </Link>
        <Link href="/contact" passHref>
          <span className="text-primary-600 hover:text-primary-800 ml-6">
            Contact
          </span>
        </Link>
        <Link href="/login" passHref>
          <span className="text-primary-600 hover:text-primary-800 ml-6">
            Login
          </span>
        </Link>
      </Flex>
    </Flex>
  );
};
export default Navbar;
