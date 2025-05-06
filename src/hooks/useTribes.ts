import { useState, useEffect, useCallback } from 'react';
import { tribeService } from '@/services/tribeService';
import { Tribe, TribeMessage, TribeEvent, TribeResource } from '@/types/tribe';
import { useSocket } from './useSocket';
import { useAuth } from "@/hooks/useAuth.tsx";

interface FetchTribesParams {
    search?: string;
    tag?: string;
    limit?: number;
}

export const useTribes = () => {
    const [tribes, setTribes] = useState<Tribe[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { isAuthenticated } = useAuth();

    const fetchTribes = useCallback(async (params: FetchTribesParams = {}) => {
        if (!isAuthenticated) {
            setError('Authentication required');
            return;
        }

        setLoading(true);
        setError(null);
        try {
            const data = await tribeService.getAllTribes(params);
            setTribes(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch tribes');
        } finally {
            setLoading(false);
        }
    }, [isAuthenticated]);

    const createTribe = async (tribeData: FormData): Promise<Tribe> => {
        if (!isAuthenticated) {
            throw new Error('You must be logged in to create a tribe');
        }

        setLoading(true);
        try {
            const data = await tribeService.createTribe(tribeData);
            setTribes(prev => [data, ...prev]);
            return data;
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Failed to create tribe';
            setError(message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            fetchTribes();
        }
    }, [fetchTribes, isAuthenticated]);

    return { tribes, loading, error, fetchTribes, createTribe };
};

interface UseTribeReturn {
    tribe: Tribe | null;
    messages: TribeMessage[];
    events: TribeEvent[];
    resources: TribeResource[];
    loading: boolean;
    error: string | null;
    fetchTribe: () => Promise<void>;
    fetchMessages: () => Promise<void>;
    fetchEvents: () => Promise<void>;
    fetchResources: () => Promise<void>;
    sendMessage: (message: string) => Promise<void>;
    createEvent: (eventData: Omit<TribeEvent, '_id' | 'createdBy' | 'attendees'>) => Promise<TribeEvent>;
    addResource: (resourceData: FormData) => Promise<TribeResource>;
    joinTribe: () => Promise<void>;
    leaveTribe: () => Promise<void>;
}

export const useTribe = (tribeId: string): UseTribeReturn => {
    const [tribe, setTribe] = useState<Tribe | null>(null);
    const [messages, setMessages] = useState<TribeMessage[]>([]);
    const [events, setEvents] = useState<TribeEvent[]>([]);
    const [resources, setResources] = useState<TribeResource[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const socket = useSocket();

    const fetchTribe = useCallback(async () => {
        if (!tribeId) return;

        setLoading(true);
        setError(null);
        try {
            const data = await tribeService.getTribe(tribeId);
            setTribe(data);
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Failed to fetch tribe';
            setError(message);
        } finally {
            setLoading(false);
        }
    }, [tribeId]);

    const fetchMessages = useCallback(async () => {
        if (!tribeId) return;

        setLoading(true);
        try {
            const data = await tribeService.getMessages(tribeId);
            setMessages(data);
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Failed to fetch messages';
            setError(message);
        } finally {
            setLoading(false);
        }
    }, [tribeId]);

    const fetchEvents = useCallback(async () => {
        if (!tribeId) return;

        setLoading(true);
        try {
            const data = await tribeService.getEvents(tribeId);
            setEvents(data);
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Failed to fetch events';
            setError(message);
        } finally {
            setLoading(false);
        }
    }, [tribeId]);

    const fetchResources = useCallback(async () => {
        if (!tribeId) return;

        setLoading(true);
        try {
            const data = await tribeService.getResources(tribeId);
            setResources(data);
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Failed to fetch resources';
            setError(message);
        } finally {
            setLoading(false);
        }
    }, [tribeId]);

    const sendMessage = async (message: string): Promise<void> => {
        if (!tribeId) return;

        try {
            const newMessage = await tribeService.sendMessage(tribeId, message);
            setMessages(prev => [...prev, newMessage]);
            socket?.emit('newMessage', { tribeId, message: newMessage });
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Failed to send message';
            setError(message);
            throw err;
        }
    };

    const createEvent = async (
        eventData: Omit<TribeEvent, '_id' | 'createdBy' | 'attendees'>
    ): Promise<TribeEvent> => {
        if (!tribeId) throw new Error('Tribe ID is required');

        try {
            const newEvent = await tribeService.createEvent(tribeId, eventData);
            setEvents(prev => [...prev, newEvent]);
            return newEvent;
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Failed to create event';
            setError(message);
            throw err;
        }
    };

    const addResource = async (resourceData: FormData): Promise<TribeResource> => {
        if (!tribeId) throw new Error('Tribe ID is required');

        try {
            const newResource = await tribeService.addResource(tribeId, resourceData);
            setResources(prev => [...prev, newResource]);
            return newResource;
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Failed to add resource';
            setError(message);
            throw err;
        }
    };

    const joinTribe = async (): Promise<void> => {
        if (!tribeId) return;

        try {
            await tribeService.joinTribe(tribeId);
            await fetchTribe();
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Failed to join tribe';
            setError(message);
            throw err;
        }
    };

    const leaveTribe = async (): Promise<void> => {
        if (!tribeId) return;

        try {
            await tribeService.leaveTribe(tribeId);
            await fetchTribe();
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Failed to leave tribe';
            setError(message);
            throw err;
        }
    };

    useEffect(() => {
        if (!tribeId) return;

        const loadData = async () => {
            await Promise.all([
                fetchTribe(),
                fetchMessages(),
                fetchEvents(),
                fetchResources()
            ]);
        };

        loadData();

        const handleNewMessage = (message: TribeMessage) => {
            setMessages(prev => [...prev, message]);
        };

        socket?.on('newMessage', handleNewMessage);
        return () => {
            socket?.off('newMessage', handleNewMessage);
        };
    }, [tribeId, fetchTribe, fetchMessages, fetchEvents, fetchResources, socket]);

    return {
        tribe,
        messages,
        events,
        resources,
        loading,
        error,
        fetchTribe,
        fetchMessages,
        fetchEvents,
        fetchResources,
        sendMessage,
        createEvent,
        addResource,
        joinTribe,
        leaveTribe,
    };
};