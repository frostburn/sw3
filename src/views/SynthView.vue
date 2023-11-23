<script setup lang="ts">
import { useAudioContextStore } from '@/stores/audio-context'
import { WAVEFORMS } from '@/synth'
import { computed } from 'vue'

const audioContext = useAudioContextStore()

const mainVolume = computed({
  get: () => audioContext.mainVolume,
  set(newValue: number) {
    // There's something wrong with how input ranges are handled.
    if (typeof newValue !== 'number') {
      newValue = parseFloat(newValue)
    }
    if (!isNaN(newValue)) {
      audioContext.mainVolume = newValue
    }
  }
})

const attackTime = computed({
  get: () => audioContext.attackTime,
  set(newValue: number) {
    if (typeof newValue !== 'number') {
      newValue = parseFloat(newValue)
    }
    if (!isNaN(newValue)) {
      audioContext.attackTime = newValue
    }
  }
})

const decayTime = computed({
  get: () => audioContext.decayTime,
  set(newValue: number) {
    if (typeof newValue !== 'number') {
      newValue = parseFloat(newValue)
    }
    if (!isNaN(newValue)) {
      audioContext.decayTime = newValue
    }
  }
})

const sustainLevel = computed({
  get: () => audioContext.sustainLevel,
  set(newValue: number) {
    if (typeof newValue !== 'number') {
      newValue = parseFloat(newValue)
    }
    if (!isNaN(newValue)) {
      audioContext.sustainLevel = newValue
    }
  }
})

const releaseTime = computed({
  get: () => audioContext.releaseTime,
  set(newValue: number) {
    if (typeof newValue !== 'number') {
      newValue = parseFloat(newValue)
    }
    if (!isNaN(newValue)) {
      audioContext.releaseTime = newValue
    }
  }
})
</script>

<template>
  <main>
    <div class="columns-container">
      <div class="column synth-controls">
        <h2>Synth</h2>
        <div class="control-group">
          <label for="volume">Main volume</label>
          <input class="control" type="range" min="0" max="0.4" step="any" v-model="mainVolume" />
          <div class="control">
            <label for="waveform">Waveform</label>
            <select id="waveform" class="control" v-model="audioContext.waveform">
              <option v-for="waveform of WAVEFORMS" :value="waveform" :key="waveform">
                {{ waveform }}
              </option>
            </select>
          </div>
          <label for="attack">Attack time</label>
          <input
            id="attack"
            class="control"
            type="range"
            min="0.01"
            max="1.0"
            step="any"
            v-model="attackTime"
          />
          <label for="decay">Decay time</label>
          <input
            id="decay"
            class="control"
            type="range"
            min="0.01"
            max="4.0"
            step="any"
            v-model="decayTime"
          />
          <label for="sustain">Sustain level</label>
          <input
            id="sustain"
            class="control"
            type="range"
            min="0.0"
            max="1.0"
            step="any"
            v-model="sustainLevel"
          />
          <label for="release">Release time</label>
          <input
            id="release"
            class="control"
            type="range"
            min="0.01"
            max="1.0"
            step="any"
            v-model="releaseTime"
          />
          <div class="control">
            <label for="polyphony">Max polyphony</label>
            <input
              id="polyphony"
              type="number"
              min="1"
              max="32"
              v-model="audioContext.maxPolyphony"
            />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
/* Content layout */
div.columns-container {
  height: 100%;
  overflow-y: auto;
}
div.column {
  overflow-x: hidden;
}

@media screen and (min-width: 600px) {
  div.columns-container {
    background-color: var(--color-border);
    column-count: 2;
    column-gap: 1px;
    height: 100%;
  }
  div.column {
    height: 100%;
    overflow-y: auto;
    background-color: var(--color-background);
  }
}

div.synth-controls {
  padding: 1rem;
}
div.keyboard-controls {
  padding: 1rem;
}

.waveform {
  width: 100%;
  height: auto;
  border: 1px solid var(--color-border);
  border-radius: 5px;
}
</style>
