import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001";

const apiClient = axios.create({
    baseURL: API_BASE_URL + "/api",
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 10000,
});

export default apiClient;