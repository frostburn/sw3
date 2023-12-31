import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { initializeCustomWaveforms, Synth } from '@/synth'

const audioDelay = navigator.userAgent.includes('Chrome') ? 0.001 : 0.03

export const useAudioContextStore = defineStore('audio-context', () => {
  const context = ref<AudioContext | null>(null)
  const mainVolume = ref(0.19)
  const mainGain = ref<GainNode | null>(null)
  const mainLowpass = ref<BiquadFilterNode | null>(null)
  const mainHighpass = ref<BiquadFilterNode | null>(null)
  const synth = ref<Synth | null>(null)

  // Synth params
  const maxPolyphony = ref(6)
  const waveform = ref('semisine')
  const attackTime = ref(0.01)
  const decayTime = ref(0.3)
  const sustainLevel = ref(0.8)
  const releaseTime = ref(0.01)

  // Fetch synth max polyphony
  if ('maxPolyphony' in window.localStorage) {
    maxPolyphony.value = parseInt(window.localStorage.getItem('maxPolyphony')!)
  }

  function initialize() {
    if (context.value) {
      context.value.resume()
      return
    }
    context.value = new AudioContext({ latencyHint: 'interactive' })

    const gain = context.value.createGain()
    gain.gain.setValueAtTime(mainVolume.value, context.value.currentTime)
    gain.connect(context.value.destination)
    mainGain.value = gain

    const lowpass = context.value.createBiquadFilter()
    lowpass.frequency.setValueAtTime(5000, context.value.currentTime)
    lowpass.Q.setValueAtTime(Math.sqrt(0.5), context.value.currentTime)
    lowpass.type = 'lowpass'
    lowpass.connect(gain)
    mainLowpass.value = lowpass

    const highpass = context.value.createBiquadFilter()
    highpass.frequency.setValueAtTime(30, context.value.currentTime)
    highpass.Q.setValueAtTime(Math.sqrt(0.5), context.value.currentTime)
    highpass.type = 'highpass'
    highpass.connect(lowpass)
    mainHighpass.value = highpass

    // Intended point of audio connection
    const audioDestination = highpass

    initializeCustomWaveforms(context.value)

    synth.value = new Synth(
      context.value,
      audioDestination,
      audioDelay,
      waveform.value,
      attackTime.value,
      decayTime.value,
      sustainLevel.value,
      releaseTime.value,
      maxPolyphony.value
    )
  }

  async function unintialize() {
    if (!context.value) {
      return
    }
    if (mainGain.value) {
      mainGain.value.disconnect()
    }
    if (mainLowpass.value) {
      mainLowpass.value.disconnect()
    }
    if (mainHighpass.value) {
      mainHighpass.value.disconnect()
    }
    if (synth.value) {
      synth.value.setPolyphony(0)
    }
    await context.value.close()
    context.value = null
  }

  watch(mainVolume, (newValue) => {
    if (!context.value || !mainGain.value) {
      return
    }
    mainGain.value.gain.setValueAtTime(newValue, context.value.currentTime)
  })

  watch(maxPolyphony, (newValue) => {
    localStorage.setItem('maxPolyphony', newValue.toString())
    if (!synth.value) {
      return
    }
    synth.value.setPolyphony(newValue)
  })

  watch(waveform, (newValue) => {
    if (!synth.value) {
      return
    }
    synth.value.waveform = newValue
  })

  watch(attackTime, (newValue) => {
    if (!synth.value) {
      return
    }
    synth.value.attackTime = newValue
  })

  watch(decayTime, (newValue) => {
    if (!synth.value) {
      return
    }
    synth.value.decayTime = newValue
  })

  watch(sustainLevel, (newValue) => {
    if (!synth.value) {
      return
    }
    synth.value.sustainLevel = newValue
  })

  watch(releaseTime, (newValue) => {
    if (!synth.value) {
      return
    }
    synth.value.releaseTime = newValue
  })

  return {
    initialize,
    unintialize,
    context,
    mainVolume,
    maxPolyphony,
    waveform,
    attackTime,
    decayTime,
    sustainLevel,
    releaseTime,
    synth,

    // Add to state but not intended for mutation
    mainGain,
    mainLowpass,
    mainHighpass
  }
})
