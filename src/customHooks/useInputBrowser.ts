
import { ChangeEvent, useCallback, useState } from "react"

export const useInputBrowser = () => {
    const [inputBrowserValue, setInputBrowserValue] = useState<string>("");

    const handleOnChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setInputBrowserValue(e.target.value);
    }, []);

    return {
        inputBrowserValue,
        handleOnChange,
    }
}   