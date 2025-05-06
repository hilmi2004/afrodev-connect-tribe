// src/hooks/useSocket.ts
import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuth } from './useAuth';

export const useSocket = () => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const { user } = useAuth();

    useEffect(() => {
        if (!user) return;

        const socketInstance = io(process.env.REACT_APP_SOCKET_URL || 'http://localhost:5000', {
            withCredentials: true,
            auth: {
                token: localStorage.getItem('token')
            }
        });

        setSocket(socketInstance);

        return () => {
            socketInstance.disconnect();
        };
    }, [user]);

    return socket;
};