import React from "react";
import { CardResourceTechProps } from "@/interface";

export const CardResourceTech: React.FC<CardResourceTechProps> = React.memo(({ data }) => {
    return (
        <div className="mx-2 my-1 w-full md:w-[80%] h-26 border rounded-lg shadow-md hover:shadow-lg bg-white hover:bg-gray-100">
            <a href={data.urlResource} className="flex justify-center items-center gap-2 px-2 md:p-4" target="_blank">
                <div className="flex items-center justify-center w-14">
                    <img src={`${data.typeResource === "video" ? "/logoE.svg" : "vite.svg"}`} alt="" />
                </div>
                <div className="w-full h-25 py-3 px-1 text-sm" >
                    <h2 className="font-semibold mb-1 text-gray-800">{data.title}</h2>
                    <p className="text-gray-600">{data.detail}</p>
                </div>
                <span className="text-2xl text-gray-900/40">
                    {">"}
                </span>
            </a>
        </div>
    );  
});
