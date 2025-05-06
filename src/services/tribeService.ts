import api from '@/lib/api';
import { Tribe, TribeEvent, TribeResource, TribeMessage } from '@/types/tribe';
import mongoose from 'mongoose';

interface ApiResponse<T> {
    success: boolean;
    message?: string;
    data: T;
}

interface ErrorResponse {
    message: string;
    status?: number;
}

const debug = (message: string, data?: unknown) => {
    if (process.env.NODE_ENV !== 'production') {
        console.log(`[TribeService] ${message}`, data || '');
    }
};

const isValidTribeId = (id: string): boolean => {
    if (!id || id === 'create') {
        debug('Invalid tribe ID - empty or "create"', id);
        return false;
    }
    return mongoose.Types.ObjectId.isValid(id);
};

const handleApiError = (error: unknown, context: string): never => {
    let errorMessage = 'Request failed';
    let status = 500;

    if (error instanceof Error) {
        errorMessage = error.message;
    }

    if (typeof error === 'object' && error !== null) {
        const axiosError = error as { response?: { data?: ErrorResponse; status?: number } };
        if (axiosError.response) {
            errorMessage = axiosError.response.data?.message || errorMessage;
            status = axiosError.response.status || status;
        }
    }

    debug(`Error in ${context}:`, { message: errorMessage, status });
    throw new Error(`${context}: ${errorMessage}`);
};

class TribeService {
    async getAllTribes(params: { search?: string; tag?: string; limit?: number } = {}): Promise<Tribe[]> {
        try {
            const response = await api.get<ApiResponse<Tribe[]>>('/tribes', { params });
            return response.data.data || [];
        } catch (error) {
            throw new Error(`Failed to fetch tribes: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }

    async createTribe(tribeData: FormData): Promise<Tribe> {
        try {
            const response = await api.post<ApiResponse<Tribe>>('/tribes', tribeData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data.data;
        } catch (error) {
            throw new Error(`Failed to create tribe: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }

    async getTribe(id: string): Promise<Tribe> {
        if (!isValidTribeId(id)) {
            throw new Error('Invalid tribe ID format');
        }

        try {
            const response = await api.get<ApiResponse<Tribe>>(`/tribes/${id}`);
            return response.data.data;
        } catch (error) {
            return handleApiError(error, 'getTribe');
        }
    }

    async getMessages(tribeId: string): Promise<TribeMessage[]> {
        if (!isValidTribeId(tribeId)) {
            throw new Error('Invalid tribe ID format');
        }

        try {
            const response = await api.get<ApiResponse<TribeMessage[]>>(`/tribes/${tribeId}/chat`);
            return response.data.data || [];
        } catch (error) {
            return handleApiError(error, 'getMessages');
        }
    }

    async sendMessage(tribeId: string, message: string): Promise<TribeMessage> {
        if (!isValidTribeId(tribeId)) {
            throw new Error('Invalid tribe ID format');
        }

        try {
            const response = await api.post<ApiResponse<TribeMessage>>(
                `/tribes/${tribeId}/chat`,
                { message }
            );
            return response.data.data;
        } catch (error) {
            return handleApiError(error, 'sendMessage');
        }
    }

    async getEvents(tribeId: string): Promise<TribeEvent[]> {
        if (!isValidTribeId(tribeId)) {
            throw new Error('Invalid tribe ID format');
        }

        try {
            const response = await api.get<ApiResponse<TribeEvent[]>>(`/tribes/${tribeId}/events`);
            return response.data.data || [];
        } catch (error) {
            return handleApiError(error, 'getEvents');
        }
    }

    async createEvent(
        tribeId: string,
        eventData: Omit<TribeEvent, '_id' | 'createdBy' | 'attendees'>
    ): Promise<TribeEvent> {
        if (!isValidTribeId(tribeId)) {
            throw new Error('Invalid tribe ID format');
        }

        try {
            const response = await api.post<ApiResponse<TribeEvent>>(
                `/tribes/${tribeId}/events`,
                eventData
            );
            return response.data.data;
        } catch (error) {
            return handleApiError(error, 'createEvent');
        }
    }

    async getResources(tribeId: string): Promise<TribeResource[]> {
        if (!isValidTribeId(tribeId)) {
            throw new Error('Invalid tribe ID format');
        }

        try {
            const response = await api.get<ApiResponse<TribeResource[]>>(`/tribes/${tribeId}/resources`);
            return response.data.data || [];
        } catch (error) {
            return handleApiError(error, 'getResources');
        }
    }

    async addResource(tribeId: string, resourceData: FormData): Promise<TribeResource> {
        if (!isValidTribeId(tribeId)) {
            throw new Error('Invalid tribe ID format');
        }

        try {
            const response = await api.post<ApiResponse<TribeResource>>(
                `/tribes/${tribeId}/resources`,
                resourceData,
                { headers: { 'Content-Type': 'multipart/form-data' } }
            );
            return response.data.data;
        } catch (error) {
            return handleApiError(error, 'addResource');
        }
    }

    async joinTribe(tribeId: string): Promise<void> {
        if (!isValidTribeId(tribeId)) {
            throw new Error('Invalid tribe ID format');
        }

        try {
            await api.post(`/tribes/${tribeId}/join`);
        } catch (error) {
            return handleApiError(error, 'joinTribe');
        }
    }

    async leaveTribe(tribeId: string): Promise<void> {
        if (!isValidTribeId(tribeId)) {
            throw new Error('Invalid tribe ID format');
        }

        try {
            await api.post(`/tribes/${tribeId}/leave`);
        } catch (error) {
            return handleApiError(error, 'leaveTribe');
        }
    }
}

export const tribeService = new TribeService();