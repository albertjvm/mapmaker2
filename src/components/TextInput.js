import { useEffect, useState } from "react";

export const TextInput = ({ value, onChange, ...props }) => {
    const [internalValue, setInternalValue] = useState(value);

    useEffect(() => {
        setInternalValue(value);
    }, [value]);

    return (
        <input 
            {...props}
            value={internalValue}
            onChange={e => setInternalValue(e.target.value)}
            onBlur={() => onChange(internalValue)}
        />
    );
};