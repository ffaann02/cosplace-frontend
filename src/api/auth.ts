import { message } from "antd";
import { apiClient, apiClientWithAuth } from ".";
import { API_BASE_URL } from "@/config/api";

export const login = async (username: string, password: string) => {
  console.log(API_BASE_URL);
  try {
    const response = await apiClient.post("/auth/login", {
      username,
      password,
    });
    if (response.status !== 200) {
      throw new Error("Login failed");
    }
    const user = {
      user_id: response.data.user_id,
      username: response.data.username,
      role: response.data.role,
      seller_id: response.data.seller_id,
    }
    return user;
  } catch (error: unknown) {
    console.log("login error", error);
    throw error;
  }
};

export interface User {
  first_name: string;
  last_name: string;
  phone_number: string;
  date_of_birth: string;
  gender: string;
  username: string;
  email: string;
  password: string;
}

export const register = async (registering_user: User) => {
  try {
    // console.log(firstname, lastname, phoneNumber, dateOfBirth, username, email, password);
    const response = await apiClient.post("/auth/register", {
      ...registering_user,
    });
    if (response.status !== 201) {
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
