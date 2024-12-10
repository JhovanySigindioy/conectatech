import React from "react";
import { Link } from "react-router";
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
                <section className="flex justify-center items-center py-8">
                    <img src="/logoE.svg" alt="Logo Sigi.dev" />
                </section>
                <hr />
                <section className="pt-6">
                    <ul>
                        <li className="px-1">
                            <Link to="contacts" onClick={onClick} className="block p-2 text-gray-900 hover:bg-blue-100 hover:text-black rounded transition">
                                Contactos
                            </Link>
                        </li>
                        <li className="px-1">
                            <Link to="resources" onClick={onClick} className="block p-2 text-gray-900 hover:bg-blue-100 hover:text-black rounded transition">
                                Soporte Técnico
                            </Link>
                        </li>
                    </ul>
                </section>
            </div>
        </article>
    );
});
