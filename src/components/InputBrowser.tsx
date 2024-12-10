import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { InputBrowserProps } from "@/interface";

export const InputBrowser: React.FC<InputBrowserProps> = ({ placeholder, id, value, onChange }) => {
    return (
        <div className="grid w-full max-w-sm items-center gap-1.5 p-6 mx-auto">
            <Label htmlFor={id} className="sr-only">Search</Label>
            <Input
                className="text-center focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 focus-visible:border-transparent"
                type="text"
                id={id}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
            />
        </div>
    );
};