import { JSONGridState } from "@/types/canvasTypes";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_BASE_URL; // if local will use .env, if production will use .env.development

export const api = axios.create({  // ✅ Export api as a named export
  baseURL: API_BASE_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Test backend connection
export const testConnection = async () => {
  try {
    const response = await api.get("/api/health"); // Adjust endpoint
    console.log("✅ Backend Connected:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Backend Connection Failed:", error);
    return null;
  }
};

export const postGrid = async (name: string, description: string, grid: JSONGridState) => {
  const page = {
    name,
    description,
    data: grid
  };

  try {
    const response = await api.post("/api/page-data/", page);
    console.log("✅ Page Data Posted", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Backend Connection Failed:", error);
    throw error;
  }
}