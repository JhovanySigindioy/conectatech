import React, { useCallback, useState } from "react";
import { Routes, Route, Navigate } from "react-router";
import { NavBar } from "@/components";
import { ExcelUploadFirestorePage, ContactsPage, ResourceTechPage } from "@/pages";

export const MainRouter: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const toggleMenu = useCallback(() => {
        setIsOpen((prevIsOpen) => !prevIsOpen);
    }, []);

    return (
        <>
            <NavBar isOpen={isOpen} toggleMenu={toggleMenu} />
            <Routes>
                <Route path="converter" element={<ExcelUploadFirestorePage />} />
                <Route path="resources" element={<ResourceTechPage />} />
                <Route path="contacts" element={<ContactsPage />} />
                <Route path="/*" element={<Navigate to={"/contacts"} />} />
            </Routes>
        </>
    );
};
