import { useState, useEffect, useRef, useCallback } from 'react';
import { UseEditableProps } from '../types';


export function useEditable({ initialValue, onSave }: UseEditableProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(initialValue);
    const ref = useRef<HTMLDivElement>(null);

    // Revert to initial value if editing is cancelled
    useEffect(() => {
        if (!isEditing) {
            setValue(initialValue);
        }
    }, [isEditing, initialValue]);

    // Handle clicks outside the component to cancel editing
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setIsEditing(false);
            }
        };

        if (isEditing) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isEditing]);

    const handleDoubleClick = useCallback(() => {
        setIsEditing(true);
    }, []);

    const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            if (value.trim() !== initialValue.trim()) {
                onSave(value);
            }
            setIsEditing(false);
        } else if (event.key === 'Escape') {
            setIsEditing(false);
        }
    }, [value, initialValue, onSave]);

    return {
        isEditing,
        value,
        setValue,
        ref,
        handleDoubleClick,
        handleKeyDown,
    };
}