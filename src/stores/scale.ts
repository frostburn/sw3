import { defineStore } from 'pinia'

export const useScaleStore = defineStore('scale', () => {
  const scale = { size: 12 }

  return { scale }
})
