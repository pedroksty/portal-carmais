import { create } from 'zustand';

export const useStore = create((set) => ({
    minPriceLabel: '',
    maxPriceLabel: '',
}))