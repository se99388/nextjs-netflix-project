import { create } from "zustand";
import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import { type Movie } from "@prisma/client";

export type ModalStore = {
  movieId?: string;
  isOpen: boolean;
  openModal: (movieId: string) => void;
  closeModal: () => void;
};
const useInfoModal = create<ModalStore>((set) => ({
  movieId: undefined,
  isOpen: false,
  openModal: (movieId) => set({ isOpen: true, movieId }),
  closeModal: () => set({ isOpen: false, movieId: undefined }),
}));

export default useInfoModal;
