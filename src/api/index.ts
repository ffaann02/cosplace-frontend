import axios from "axios";
import { API_BASE_URL } from "@/config/api";

const apiClient = axios.create({
    baseURL: API_BASE_URL + "/api",
    headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
    },
    timeout: 10000,
    withCredentials: true,
});

const apiClientWithAuth = axios.create({
    baseURL: API_BASE_URL + "/api/protected",
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 10000,
    withCredentials: true,
});

apiClientWithAuth.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        // Check for 401 (Unauthorized) response
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true; // Prevent looping

            try {
                // Attempt to refresh the token using POST
                await apiClient.post("/auth/refresh");
                
                // Retry the original request with the new token
                return apiClientWithAuth(originalRequest);
            } catch (refreshError) {
                console.error("Token refresh failed:", refreshError);
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export { apiClient, apiClientWithAuth };