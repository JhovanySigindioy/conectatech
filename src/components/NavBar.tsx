import React from "react";
import { Link } from "react-router";
import { IoIosMenu } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { SideBar } from "./SideBar";
import { NavBarProps } from "@/interface";
import { clearStores, } from "@/indexedDB/clearStores";

export const NavBar: React.FC<NavBarProps> = React.memo(({ toggleMenu, isOpen }) => {

    return (
        <div className="z-50 sticky top-0 right-0 px-5 md:px-36 bg-gray-50 shadow-md w-full">
            <div className="flex justify-between items-center py-2 md:py-1">
                <div className="hover:scale-110 transition duration-150">
                    <a href="https://sigi-developer.netlify.app/" title="Click aqui">
                        <img src="/logoE.svg" alt="Logo" className="w-24 md:w-auto" />
                    </a>
                </div>

                {/* Menú hamburguesa para dispositivos pequeños */}
                <div className={`md:hidden ${isOpen ? "z-20" : ""}`}>
                    <button
                        onClick={toggleMenu}
                        className="text-gray-600"
                    >
                        {isOpen ? <IoMdClose size={26} className="font-bold" /> : <IoIosMenu size={26} />}
                    </button>
                </div>

                {/* Menú para dispositivos grandes */}
                <ul className={`hidden md:gap-4 md:flex text-sm items-center `}>
                    <li className="border-b-2 border-b-transparent hover:border-sky-500 text-gray-500 hover:text-sky-500   hover:scale-105 transition-all duration-200">
                        <Link to="contacts" >Contactos</Link>
                    </li>
                    <li className="border-b-2 border-b-transparent hover:border-sky-500 text-gray-500 hover:text-sky-500   hover:scale-105 transition-all duration-200">
                        <Link to="resources">Soporte Técnico</Link>
                    </li>
                    <button
                        onClick={() => clearStores(["contacts", "resources"])}
                        className="block p-2 text-white bg-sky-400 hover:bg-sky-600 rounded transition">
                        Actualizar DB
                    </button>
                </ul>
            </div>

            {/* Menú hamburguesa para dispositivos pequeños */}
            <div
                className={`z-50 md:hidden fixed top-0 left-0 transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
            >
                <SideBar onClick={toggleMenu} />
            </div>
        </div>
    );
});
