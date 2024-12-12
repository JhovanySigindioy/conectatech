import React from "react";
import { Link } from "react-router";
import { MdContactPhone } from "react-icons/md";
import { FaTools } from "react-icons/fa";
import { clearStores } from "@/indexedDB/clearStores";
export interface SideBarProps {
    onClick: () => void;
}

export const SideBar: React.FC<SideBarProps> = React.memo(({ onClick }) => {
    return (
        <article className="h-screen w-screen bg-gray-950/30" onClick={onClick}>
            <div
                className="h-screen w-56 bg-gray-50"
                onClick={(e) => e.stopPropagation()}
            >
                <section title="Click aqui" className="flex justify-center items-center py-8 "  >
                    <img src="/logoE.svg" alt="Logo Sigi.dev" />
                </section>
                <hr />
                <section className="pt-6">
                    <ul className="flex flex-col gap-2">

                        <li className="px-1 ">
                            <Link to="contacts" onClick={onClick} className="flex items-center gap-2 p-2 text-gray-900 hover:bg-sky-100 hover:text-black rounded transition">
                                <MdContactPhone size={25} className="text-sky-400" />
                                <span>Contactos</span>
                            </Link>
                        </li>
                        <li className="px-1">
                            <Link to="resources" onClick={onClick} className="flex items-center gap-2 p-2 text-gray-900 hover:bg-sky-100 hover:text-black rounded transition">
                                <FaTools size={25} className="text-sky-400" />
                                <span>Soporte Técnico</span>
                            </Link>
                        </li>

                    </ul>
                    <button
                        onClick={() => clearStores(["contacts", "resources"])}
                        className="block p-2 text-white bg-sky-400 hover:bg-sky-600 rounded transition fixed bottom-4 left-10">
                        Actualizar DB
                    </button>
                </section>
            </div>
        </article>
    );
});
