import { create } from "zustand";

export const useUserStore = create(() => ({
  name: "Katerina",
  position: "Engineering",
}));
