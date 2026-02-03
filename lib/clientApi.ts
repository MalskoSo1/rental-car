import { Brands, Car, Cars } from "@/type/car";
import api from "./api";

export async function fetchCars(): Promise<Cars> {
  try {
    const res = await api.get<Cars>("/cars");
    return res.data;
  } catch (error) {
    console.error("Error fetching cars:", error);
    throw error;
  }
}

export async function fetchCarById(id: string): Promise<Car | null> {
  try {
    const res = await api.get<Car | null>(`/cars/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching car:", error);
    throw error;
  }
}

export async function fetchBrands(): Promise<Brands> {
  try {
    const res = await api.get<Brands>(`/brands`);
    return res.data;
  } catch (error) {
    console.error("Error fetching brands:", error);
    throw error;
  }
}
