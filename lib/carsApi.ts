import { Brands, Car, Cars, SearchFormValues } from "@/type/car";
import api from "./api";

interface CarsParams {
  brand?: string;
  price?: string;
  from?: string;
  to?: string;
  page?: string;
  limit?: string;
}

export async function fetchCars(
  filter: SearchFormValues | null,
  page?: string,
  limit?: string,
): Promise<Cars> {
  try {
    if (filter === null) {
      const params = {
        page: page,
        limit: limit,
      };
      const res = await api.get<Cars>("/cars", { params });
      return res.data;
    }
    const params = { ...filter, page, limit };
    const res = await api.get<Cars>("/cars", { params });
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
