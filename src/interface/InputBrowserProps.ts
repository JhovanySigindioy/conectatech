import { ChangeEvent } from "react";

export interface InputBrowserProps {
    id: string;
    placeholder: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}