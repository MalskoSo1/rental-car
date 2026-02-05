import { create } from "zustand";
import { Car, SearchFormValues } from "@/type/car";
import { persist } from "zustand/middleware";
interface VehiclesState {
  vehicles: Car[] | null;
  setVehicles: (vehicles: Car[] | null) => void;
  clearVehicles: () => void;

  favoriteList: string[] | null;
  setFavoriteList: (favoriteList: string[] | null) => void;

  filter: SearchFormValues | null;
  setFilter: (filter: SearchFormValues) => void;
  clearFilter: () => void;
}

export const useVehiclesStore = create<VehiclesState>()(
  persist(
    (set) => ({
      vehicles: null,
      setVehicles: (vehicles) =>
        set({
          vehicles,
        }),
      clearVehicles: () =>
        set({
          vehicles: null,
        }),
      favoriteList: null,
      setFavoriteList: (favoriteList) => set({ favoriteList }),
      filter: null,
      setFilter: (filter) => set({ filter }),
      clearFilter: () => set({ filter: null }),
    }),

    {
      name: "favorite-list",
      partialize: (state) => ({ favoriteList: state.favoriteList }),
    },
  ),
);
