import { create } from "zustand";
import { Car } from "@/type/car";

interface VehiclesState {
  vehicles: Car[] | null;
  setVehicles: (vehicles: Car[] | null) => void;
  clearVehicles: () => void;
}

export const useVehiclesStore = create<VehiclesState>()((set) => ({
  vehicles: null,
  setVehicles: (vehicles) =>
    set({
      vehicles,
    }),
  clearVehicles: () =>
    set({
      vehicles: null,
    }),
}));
