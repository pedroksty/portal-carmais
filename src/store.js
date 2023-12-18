import { create } from 'zustand';

export const useStore = create((set) => ({
    name: '',
    aboutUsTitle: '',
    privacyPolicy: '',
    indexBanners: [],
    globalStateIds: [],
    aboutUsTextHTML: '',
    whatsappInfo: [],
    phoneInfo: [],
    globalUnitIds: []
}))