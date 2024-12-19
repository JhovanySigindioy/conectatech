
import debounce from "lodash.debounce";
import { ChangeEvent, useCallback, useEffect, useState } from "react"

export const useInputBrowser = () => {
    const [inputBrowserValue, setInputBrowserValue] = useState<string>("");
    const [debouncedValue, setDebouncedValue] = useState<string>("");

    const handleOnChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setInputBrowserValue(e.target.value);
    }, []);

    const debounced = useCallback(
        debounce((value: string) => {
            setDebouncedValue(value);
        }, 300), []);

    useEffect(() => {
        debounced(inputBrowserValue);
        return () => debounced.cancel();
    }, [inputBrowserValue]);

    return {
        inputBrowserValue,
        handleOnChange,
        debouncedValue,
    }
}   