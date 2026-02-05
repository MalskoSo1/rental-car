import { create } from "zustand";
import { Car, SearchFormValues } from "@/type/car";
import { persist } from "zustand/middleware";
interface VehiclesState {
  vehicles: Car[] | null;
  setVehicles: (vehicles: Car[] | null) => void;
  addVehicles: (newVehicles: Car[]) => void;
  clearVehicles: () => void;

  favoriteList: string[] | null;
  setFavoriteList: (favoriteList: string[] | null) => void;

  filter: SearchFormValues | null;
  setFilter: (filter: SearchFormValues) => void;
  clearFilter: () => void;

  page: number;
  nextPage: () => void;
  resetPage: () => void;
}

export const useVehiclesStore = create<VehiclesState>()(
  persist(
    (set) => ({
      vehicles: null,
      setVehicles: (vehicles) =>
        set({
          vehicles,
        }),
      addVehicles: (newVehicles) =>
        set((state) => ({
          vehicles: [...(state.vehicles ?? []), ...newVehicles],
        })),
      clearVehicles: () =>
        set({
          vehicles: null,
        }),
      favoriteList: null,
      setFavoriteList: (favoriteList) => set({ favoriteList }),
      filter: null,
      setFilter: (filter) => set({ filter }),
      clearFilter: () => set({ filter: null }),
      page: 1,
      nextPage: () =>
        set((state) => ({
          page: state.page + 1,
        })),
      resetPage: () =>
        set({
          page: 1,
        }),
    }),

    {
      name: "favorite-list",
      partialize: (state) => ({ favoriteList: state.favoriteList }),
    },
  ),
);
