import { midiNoteNumberToEnharmonics } from '@/utils'
import { defineStore } from 'pinia'
import { Scale, parseLines, parseScale } from 'scale-workshop-core'
// TODO: Fix exports, check that scientific notation is supported, HardDecimal, power, modmul -> reduce = operator, 10ms
import { Quantity, pitch } from 'scale-workshop-core/dist/quantity'
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

  function getInputs() {
    const inputs = [...lines]
    if (autoFrequency.value) {
      inputs[0] = autoLine.value
    }
    return inputs
  }

  // Scale parsing may fail so `scale` can't just be a computed property.
  watch([baseMidiNote, enharmonic, autoFrequency, lines], () => {
    const inputs = getInputs()
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

  function getQuantities() {
    const inputs = getInputs()
    const context = parseLines(inputs, baseMidiNote.value)
    const baseFrequency = context.get('0')!
    const numQuantities = Math.round(context.get('#')!.value.valueOf())
    const quantities = []
    for (let i = 1; i < numQuantities; ++i) {
      quantities.push(pitch(context.get(i.toString())!, baseFrequency))
    }
    return quantities
  }

  function pushQuantities(quantities: Quantity[]) {
    lines.length = 1
    for (const quantity of quantities) {
      if (quantity.value.isFractional()) {
        lines.push(quantity.value.toFraction().toFraction())
      } else if (quantity.value.isEqualTemperament()) {
        const { fractionOfEquave, equave } = quantity.value.toEqualTemperament()
        lines.push(
          fractionOfEquave.toFraction().replace('/', '\\') + '<' + equave.toFraction() + '>'
        )
      } else if (quantity.value.isCents()) {
        lines.push(`${quantity.value.totalCents()}c!`)
      } else if (!quantity.value.isComposite()) {
        lines.push('[' + quantity.value.vector.map((f) => f.toFraction()).join(' ') + '>')
      } else {
        const monzo = '[' + quantity.value.vector.map((f) => f.toFraction()).join(' ') + '>'
        const residual = quantity.value.residual.toFraction()
        const cents = quantity.value.cents.toString()
        lines.push(`${monzo} + pitch(${residual}) + ${cents}c!`)
      }
    }
  }

  function sort() {
    const quantities = getQuantities()
    quantities.sort((a, b) => a.value.totalCents() - b.value.totalCents())
    pushQuantities(quantities)
  }

  function reduce() {
    const quantities = getQuantities()
    const equave = quantities[quantities.length - 1]
    for (let i = 0; i < quantities.length - 1; ++i) {
      quantities[i] = quantities[i].mod(equave)
    }
    pushQuantities(quantities)
  }

  return {
    name,
    baseMidiNote,
    enharmonics,
    enharmonic,
    autoFrequency,
    autoLine,
    lines,
    scale,
    error,
    // Methods
    sort,
    reduce
  }
})
