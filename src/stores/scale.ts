import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useScaleStore = defineStore('scale', () => {
  const scale = reactive({ size: 12, baseMidiNote: 60 })

  return { scale }
})
