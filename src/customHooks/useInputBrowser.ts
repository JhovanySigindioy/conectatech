
import debounce from "lodash.debounce";
import { ChangeEvent, useCallback, useEffect, useState } from "react"

export const useInputBrowser = () => {
    const [inputBrowserValue, setInputBrowserValue] = useState<string>("");
    const [debouncedValue, setDebouncedValue] = useState<string>("");

    const handleOnChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setInputBrowserValue(e.target.value);
    }, []);

    const debouncedLog = useCallback(
        debounce((value: string) => {
            setDebouncedValue(value);
        }, 300), 
        []
    );

    
    useEffect(() => {
        debouncedLog(inputBrowserValue);
    
        return () => {
            debouncedLog.cancel();
        };
    }, [inputBrowserValue, debouncedLog]);

    return {
        inputBrowserValue,
        handleOnChange,
        debouncedValue,
    }
}   