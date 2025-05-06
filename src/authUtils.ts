import api from "@/lib/api.ts";

export const validateToken = async () => {
    try {
        const token = localStorage.getItem('token');
        if (!token) return false;

        // Simple token expiration check (if using JWT)
        const payload = JSON.parse(atob(token.split('.')[1]));
        if (payload.exp * 1000 < Date.now()) {
            return false;
        }

        // Optional: Verify with backend
        const response = await api.get('/auth/validate');
        return response.data.valid;
    } catch (error) {
        console.error('Token validation failed:', error);
        return false;
    }
};

export const silentRefresh = async () => {
    try {
        const response = await api.post('/auth/refresh', {}, { withCredentials: true });
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            return true;
        }
        return false;
    } catch (error) {
        console.error('Silent refresh failed:', error);
        return false;
    }
};