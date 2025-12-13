'use client'
import { io, Socket } from "socket.io-client";
import React, { createContext, useEffect, useContext, useRef, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_DOMAIN;

type SocketContextType = Socket | null;

export const SocketContext = createContext<SocketContextType>(null);

export function SocketProvider({ children }: { children: React.ReactNode }) {
    const socketRef = useRef<Socket | null>(null);
    const [socket, setSocket] = useState<Socket | null>(null);
    
    useEffect(() => {
        socketRef.current = io(`${API_URL}/analytics`);
        setSocket(socketRef.current);  
        
        return () => {
            socketRef.current?.close();
        };
    }, []);
    
    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
}

export function useWebsocket() {
    const socket = useContext(SocketContext)
    if (!socket) {
        throw new Error('useWebsocket must be used within SocketProvider'); 
    }
    return socket
}