import { create } from 'zustand'

const useUIStore = create((set) => ({
  isModalOpen: false,
  op: 'create',
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
  setOp: (o) => set({ op: o }),
}))

export default useUIStore
