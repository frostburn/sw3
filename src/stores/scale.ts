import { midiNoteNumberToEnharmonics } from '@/utils'
import { defineStore } from 'pinia'
import { Scale, parseScale } from 'scale-workshop-core'
import { computed, reactive, ref, watch } from 'vue'

export const useScaleStore = defineStore('scale', () => {
  const name = ref('')
  const baseMidiNote = ref(60)
  const enharmonics = ref(midiNoteNumberToEnharmonics(baseMidiNote.value))
  const enharmonic = ref(enharmonics.value[0])
  const autoFrequency = ref(true)
  const lines = reactive(['261.63Hz', 'P8'])
  const scale = ref(new Scale([0], 1200, 261.63, 60))
  const error = ref('')

  const autoLine = computed(() => `${enharmonic.value} = mtof(${baseMidiNote.value})`)

  watch(baseMidiNote, (newValue) => {
    enharmonics.value = midiNoteNumberToEnharmonics(newValue)
    enharmonic.value = enharmonics.value[0]
  })

  // Scale parsing may fail so `scale` can't just be a computed property.
  watch([baseMidiNote, enharmonic, autoFrequency, lines], () => {
    const inputs = [...lines]
    if (autoFrequency.value) {
      inputs[0] = autoLine.value
    }
    error.value = ''
    try {
      const newScale = parseScale(
        inputs.filter((i) => i.length),
        baseMidiNote.value
      )
      scale.value = newScale
    } catch (e) {
      if (typeof e === 'string') {
        error.value = e
      } else if (e instanceof Error) {
        error.value = e.message
      } else {
        console.error(e)
      }
    }
  })

  return {
    name,
    baseMidiNote,
    enharmonics,
    enharmonic,
    autoFrequency,
    autoLine,
    lines,
    scale,
    error
  }
})
