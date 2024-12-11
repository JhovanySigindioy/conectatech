import React from "react";
import { FaWhatsapp } from "react-icons/fa6";
import { CardContactProps } from "@/interface";

export const CardContact: React.FC<CardContactProps> = React.memo(({ dataContact }) => {
    return (
        <article className="w-full text-sm flex flex-col gap-4 md:w-[45%] shadow-lg rounded-xl border bg-white border-gray-300 p-6 hover:shadow-xl transition-shadow fadeIn mb-4">
            <section>
                <header className="mb-1">
                    <p className=" font-medium text-gray-500 uppercase tracking-wide">{dataContact.fullName}</p>
                    <h2 className="font-semibold text-gray-800 capitalize">{dataContact.position}</h2>
                </header>
                {dataContact.contactsNumber.map((contact, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-0">
                        <div className="flex gap-2">
                            <span className="font-semibold">Tel:</span>
                            <p className="text-gray-600" > {contact}</p>
                        </div>
                        <div className="flex gap-6 items-center">
                            <a
                                href={`https://api.whatsapp.com/send?phone=57${contact}`}
                                aria-label="Abrir en WhatsApp"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-green-500 hover:text-green-600">
                                <FaWhatsapp size={38} />
                            </a>
                            <a href={`tel: ${contact}`} className="px-3 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition">
                                Llamar
                            </a>
                        </div>
                    </div>
                ))}
            </section>
            <section>
                <header className="mb-1">
                    <h2 className="font-semibold text-gray-800">Datos Vehículo</h2>
                </header>
                <div className="grid grid-cols-2">
                    <div className="flex gap-2">
                        <strong className="text-gray-700 font-semibold">Vehículo:</strong>
                        <p className="text-gray-600">{dataContact.vehicle.type}</p>
                    </div>
                    <div className="flex gap-2">
                        <strong className="text-gray-700 font-semibold">Placa:</strong>
                        <p className="text-gray-600 uppercase">{dataContact.vehicle.plate}</p>
                    </div>
                </div>
            </section>
            <section>
                <header className="mb-1">
                    <h2 className=" font-semibold text-gray-800">Jefe Directo</h2>
                </header>
                <p className="text-gray-600 capitalize">{dataContact.bossName}</p>
            </section>
        </article>

    );
});
