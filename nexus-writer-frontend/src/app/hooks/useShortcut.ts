import { useEffect, useCallback } from 'react';
import { Shortcut } from '../types';

export function useShortcut(shortcuts: Shortcut[]) {
    const handleKeyDown = useCallback((event: KeyboardEvent) => {
        const shortcut = shortcuts.find(s => {
            return s.key.toLowerCase() === event.key.toLowerCase() &&
                   (s.ctrlKey === undefined || s.ctrlKey === event.ctrlKey) &&
                   (s.metaKey === undefined || s.metaKey === event.metaKey) &&
                   (s.shiftKey === undefined || s.shiftKey === event.shiftKey) &&
                   (s.altKey === undefined || s.altKey === event.altKey);
        });

        if (shortcut) {
            event.preventDefault();
            shortcut.callback(event);
        }
    }, [shortcuts]);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);
}