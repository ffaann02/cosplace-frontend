import { apiClient } from ".";

export const login = async (username: string, password: string) => {
    try{
        const response = await apiClient.post("/auth/login", {
            username,
            password,
        });
    
        if (response.status !== 200) {
            throw new Error("Login failed");
        }
    
        const { token, user } = response.data;
        return { token, user };
    }catch(error: unknown){
        console.log("login error", error);
        throw error;
    }
    
};