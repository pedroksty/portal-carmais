import { create } from 'zustand';

export const useStore = create((set) => {
    let selectedPriceRange = 0
    if(typeof window !== 'undefined'){
        const urlParams = new URLSearchParams(window.location.search);
        return ({
            sort: '-ordination',
            brands: urlParams.get('brands')?.split(',') || [],
            units: urlParams.get('units')?.split(',') || [],
            models: urlParams.get('models')?.split(',') || [],
            textSearch: urlParams.get('textSearch') ?? '',
            states: urlParams.get('states')?.split(',') || [],
            cities: urlParams.get('cities')?.split(',') || [],
            stateStrings: urlParams.get('stateStrings')?.split(',') || [],
            shifts: urlParams.get('shifts')?.split(',') || [],
            minYear: urlParams.get('minYear') ?? '',
            maxYear: urlParams.get('maxYear') ?? '',
            minPrice: urlParams.get('minPrice') ?? '',
            maxPrice: urlParams.get('maxPrice') ?? '',
            colors: urlParams.get('colors')?.split(',') || [],
            selectedPriceRange: urlParams.get('selectedPriceRange') ? parseInt(urlParams.get('selectedPriceRange')) : 0,
        })
    }else{
        return ({
            sort: '-ordination',
            brands: [],
            units: [],
            models: [],
            textSearch: '',
            states: [],
            cities: [],
            stateStrings: [],
            shifts: [],
            minYear: '',
            maxYear: '',
            minPrice: '',
            maxPrice: '',
            colors: [],
            selectedPriceRange: selectedPriceRange,
        })
    }
})