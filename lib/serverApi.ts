import { Brands, Car, Cars } from "@/type/car";
import api from "./api";

export async function getCarsServer(): Promise<Cars> {
  const res = await api.get<Cars>(`/cars`);
  return res.data;
}

export async function getCarByIdServer(id: string): Promise<Car | null> {
  try {
    const res = await api.get<Car | null>(`/cars/${id}`);
    return res.data;
  } catch {
    return null;
  }
}

export async function getBrandsServer(): Promise<Brands> {
  const res = await api.get<Brands>(`/brands`);
  return res.data;
}
