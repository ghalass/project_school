import { create } from 'zustand'
import i18next from 'i18next'

const useUIStore = create((set) => ({
  isModalOpen: false,
  op: 'create',

  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
  setOp: (o) => set({ op: o }),

  lang: 'ar',
  changeLang: (l) =>
    set(() => {
      i18next.changeLanguage(l)
      return { lang: l }
    }),
}))

export default useUIStore
