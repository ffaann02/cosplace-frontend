import { message } from "antd";
import { apiClient, apiClientWithAuth } from ".";

export const login = async (username: string, password: string) => {
  try {
    const response = await apiClient.post("/auth/login", {
      username,
      password,
    });

    if (response.status !== 200) {
      throw new Error("Login failed");
    }

    const { token, user } = response.data;
    return { token, user };
  } catch (error: unknown) {
    console.log("login error", error);
    throw error;
  }
};

export const register = async (username: string, password: string) => {
  try {
    const response = await apiClient.post("/auth/register", {
      username,
      password,
    });

    if (response.status !== 200) {
      throw new Error("Register failed");
    }

    const { token, user } = response.data;
    return { token, user };
  } catch (error: unknown) {
    console.log("register error", error);
    throw error;
  }
};

export const logout = async () => {
  try {
    const response = await apiClientWithAuth.post("/auth/logout");
    if (response.status !== 200) {
      throw new Error("Logout failed");
    }
    window.location.reload();
  } catch (error: unknown) {
    console.log("logout error", error);
    throw error;
  }
};

export const check = async () => {
  try {
    const response = await apiClient.get("/auth/check");
    return response;
  } catch (error: unknown) {
    console.log("check error", error);
    throw error;
  }
};
