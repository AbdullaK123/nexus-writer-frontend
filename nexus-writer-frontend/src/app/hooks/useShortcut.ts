import { useEffect, useCallback } from 'react';

type ShortcutCallback = (event: KeyboardEvent) => void;

export interface Shortcut {
    key: string;
    ctrlKey?: boolean;
    metaKey?: boolean;
    shiftKey?: boolean;
    altKey?: boolean;
    callback: ShortcutCallback;
}

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