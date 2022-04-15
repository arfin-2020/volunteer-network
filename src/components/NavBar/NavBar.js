import { Popover, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { useAuth } from "../Context/AuthProvider";

const NavBar = () => {
  const [changeHeader, setChangeHeader] = useState(false);
  const { currentUser, logOut } = useAuth();
//   console.log(currentUser);
  const onChangeHandler = () => {
    if (window.scrollY >= 50) {
      setChangeHeader(true);
    } else {
      setChangeHeader(false);
    }
  };
  window.addEventListener("scroll", onChangeHandler);
  return (
    <section
      className={
        changeHeader
          ? "bg-white fixed z-50 top-0 left-0 w-full shadow-md transition duration-500"
          : "bg-transparent  z-50 top-0 left-0 w-full transition duration-500"
      }
    >
      <Popover className="bg-white relative top-0 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
            <div className="justify-start lg:w-0 lg:flex-1">
              <Link to="/">
                <img className="h-8 w-auto sm:h-10" src={logo} alt="" />
              </Link>
            </div>
            <div className="lg-mr-2 -my-2 md:hidden">
              <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                <span className="sr-only">Open menu</span>
                <MenuIcon className="h-6 w-6" aria-hidden="true" />
              </Popover.Button>
            </div>
            <Popover.Group
              as="nav"
              className="hidden md:flex space-x-10"
            ></Popover.Group>
            <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
              <Link
                to="/"
                className="text-base font-medium text-gray-500 hover:text-gray-900 mr-10"
              >
                Home
              </Link>
              <Link
                to="#"
                className="text-base font-medium text-gray-500 hover:text-gray-900 mr-10"
              >
                Blogs
              </Link>
              <Link
                to="/add-Event"
                className="text-base font-medium text-gray-500 hover:text-gray-900 mr-10"
              >
                Events
              </Link>
              {!currentUser?.name  ? (
                <Link
                  to="/login"
                  className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-amber-600 hover:bg-amber-700 "
                >
                  Sign in
                </Link>
              ) : (
                <button
                  className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                  onClick={logOut}
                >
                  LogOut
                </button>
              )}

              {currentUser?.name  ? (
                <div>
                <span
                  className="poppins text-primary text-1xl"
                  style={{ color: "black", marginLeft: "5px" }}
                >
                  Hello, {currentUser?.name}  
                </span>
                <span className="poppins text-primary text-1xl"
                  style={{ color: "black", marginLeft: "5px" }}> {currentUser?.email}</span>
                </div>
              ) : (
                <Link
                  to="/signUp"
                  className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Sign up
                </Link>
              )}
            </div>
          </div>
        </div>

        <Transition
          as={Fragment}
          enter="duration-200 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel
            focus
            className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
          >
            <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
              <div className="pt-5 pb-6 px-5">
                <div className="flex items-center justify-between">
                  <div>
                    <img
                      className="h-8 w-auto"
                      src={logo} 
                      alt="Workflow"
                    />
                  </div>
                  <div className="mr-2">
                    <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                      <span className="sr-only">Close menu</span>
                      <XIcon className="h-6 w-6" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                </div>
              </div>
              <div className="py-6 px-5 space-y-6 ">
                <div>
                  {!currentUser?.name ? (
                    <Link
                      to="/login"
                      className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-amber-600 hover:bg-amber-700 "
                    >
                      Sign in
                    </Link>
                  ) : (
                    <button
                      className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                      onClick={logOut}
                    >
                      LogOut
                    </button>
                  )}

                  {currentUser?.name ? (
                    <span
                      className="poppins text-primary text-1xl"
                      style={{ color: "black", marginLeft: "5px" }}
                    >
                      Hello, {currentUser?.name}
                    </span>
                  ) : (
                    <Link
                      to="/signUp"
                      className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                    >
                      Sign up
                    </Link>
                  )}
                </div>
              </div>
             <div className="py-2">
             <Link
                to="/"
                className="text-base font-medium text-gray-500 hover:text-gray-900 mr-10"
              >
                Home
              </Link>

              <Link
                to="/add-Event"
                className="text-base font-medium text-gray-500 hover:text-gray-900 mr-10"
              >
                Events
              </Link>
              <Link
                to="#"
                className="text-base font-medium text-gray-500 hover:text-gray-900 mr-10"
              >
                Donation
              </Link>
             </div>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    </section>
  );
};

export default NavBar;
