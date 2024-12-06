import { FaFacebookF ,FaGithub } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { PiInstagramLogoFill } from "react-icons/pi";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-br from-primary-100 to-primary-200 pt-8 pb-20 lg:pb-3 border-t border-primary-200 mt-16 px-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap text-left lg:text-left">
          <div className="w-full lg:w-6/12 px-4">
            <h4 className="text-3xl font-semibold text-blueGray-700">ติดต่อสอบถาม</h4>
            <h5 className="text-lg mt-0 mb-2 text-blueGray-600">
            ค้นหาเราได้บนแพลตฟอร์มเหล่านี้ ทางเราจะตอบกลับภายใน 1-2 วันทำการ
            </h5>
            <div className="mt-6 lg:mb-0 mb-6">
              <button className="bg-primary-600 text-lightBlue-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2" type="button">
                <BsTwitterX className="text-white text-xl mx-auto"/>
              </button>
              <button className="bg-primary-600 text-lightBlue-600 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2" type="button">
                <FaFacebookF className="text-white text-xl mx-auto"/>
              </button>
              <button className="bg-primary-600 text-primary-600 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2" type="button">
                <PiInstagramLogoFill className="text-white text-xl mx-auto"/>
              </button>
              <button className="bg-primary-600 text-blueGray-800 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2" type="button">
                <FaGithub className="text-white text-xl mx-auto"/>
              </button>
            </div>
          </div>
          <div className="w-full lg:w-6/12 px-4">
            <div className="flex flex-wrap items-top mb-6">
              <div className="w-full lg:w-4/12 px-4 ml-auto">
                <span className="block uppercase text-blueGray-500 text-sm font-semibold ">Company</span>
                <hr className="border-2 border-primary-600 mb-2 w-1/4"/>
                <ul className="list-unstyled">
                  <li>
                    <a className="text-blueGray-600 hover:text-blueGray-800 font-normal block pb-2 text-sm" href="https://www.creative-tim.com/presentation?ref=njs-profile">
                      About Us
                    </a>
                  </li>
                  <li>
                    <a className="text-blueGray-600 hover:text-blueGray-800 font-normal block pb-2 text-sm" href="https://blog.creative-tim.com?ref=njs-profile">
                      Our Services
                    </a>
                  </li>
                  <li>
                    <a className="text-blueGray-600 hover:text-blueGray-800 font-normal block pb-2 text-sm" href="https://www.github.com/creativetimofficial?ref=njs-profile">
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a className="text-blueGray-600 hover:text-blueGray-800 font-normal block pb-2 text-sm" href="https://www.creative-tim.com/bootstrap-themes/free?ref=njs-profile">
                      Affiliate Program
                    </a>
                  </li>
                </ul>
              </div>
              <div className="w-full lg:w-4/12 px-4 ml-auto">
                <span className="block uppercase text-blueGray-500 text-sm font-semibold">Get Help</span>
                <hr className="border-2 border-primary-600 mb-2 w-1/4"/>
                <ul className="list-unstyled">
                  <li>
                    <a className="text-blueGray-600 hover:text-blueGray-800 font-normal block pb-2 text-sm" href="https://www.creative-tim.com/presentation?ref=njs-profile">
                      FAQ
                    </a>
                  </li>
                  <li>
                    <a className="text-blueGray-600 hover:text-blueGray-800 font-normal block pb-2 text-sm" href="https://blog.creative-tim.com?ref=njs-profile">
                      Shipping
                    </a>
                  </li>
                  <li>
                    <a className="text-blueGray-600 hover:text-blueGray-800 font-normal block pb-2 text-sm" href="https://www.github.com/creativetimofficial?ref=njs-profile">
                      Order Status
                    </a>
                  </li>
                  <li>
                    <a className="text-blueGray-600 hover:text-blueGray-800 font-normal block pb-2 text-sm" href="https://www.creative-tim.com/bootstrap-themes/free?ref=njs-profile">
                      Payment Options
                    </a>
                  </li>
                </ul>
              </div>
              <div className="w-full lg:w-4/12 px-4">
                <span className="block uppercase text-blueGray-500 text-sm font-semibold">Online Shop</span>
                <hr className="border-2 border-primary-600 mb-2 w-1/4"/>
                <ul className="list-unstyled">
                  <li>
                    <a className="text-blueGray-600 hover:text-blueGray-800 font-normal block pb-2 text-sm" href="https://github.com/creativetimofficial/notus-js/blob/main/LICENSE.md?ref=njs-profile">
                      Costume
                    </a>
                  </li>
                  <li>
                    <a className="text-blueGray-600 hover:text-blueGray-800 font-normal block pb-2 text-sm" href="https://creative-tim.com/terms?ref=njs-profile">
                      Armor
                    </a>
                  </li>
                  <li>
                    <a className="text-blueGray-600 hover:text-blueGray-800 font-normal block pb-2 text-sm" href="https://creative-tim.com/privacy?ref=njs-profile">
                      Props
                    </a>
                  </li>
                  <li>
                    <a className="text-blueGray-600 hover:text-blueGray-800 font-normal block pb-2 text-sm" href="https://creative-tim.com/contact-us?ref=njs-profile">
                      Accessories
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <hr className="my-3 border-primary-600 opacity-30" />
        <div className="flex flex-wrap items-center md:justify-between justify-center">
          <div className="w-full md:w-4/12 px-4 mx-auto text-center">
            <div className="text-sm text-blueGray-500 font-normal py-1">
              Copyright © {currentYear}
              <a href="https://www.creative-tim.com/product/notus-js" className="text-blueGray-500 hover:text-gray-800" target="_blank" rel="noopener noreferrer">
                &rsquo;CosBaanDeawGun
              </a>&rsquo;
              by
              <a href="https://www.creative-tim.com?ref=njs-profile" className="text-blueGray-500 hover:text-blueGray-800">
                &rsquo;CosBaanDeawGun Team
              </a>.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;