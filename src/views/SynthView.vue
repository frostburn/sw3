<script setup lang="ts">
import { ref } from 'vue'

const waveform = ref('loopy')
const waveforms = ['loopy', 'droopy', 'swoopy']
const mainVolume = ref(0.2)
const attackTime = ref(0.2)
const decayTime = ref(0.2)
const sustainLevel = ref(0.2)
const releaseTime = ref(0.2)
const maxPolyphony = ref(2)
const audioDelay = ref(0.2)
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
            <select id="waveform" class="control" v-model="waveform">
              <option v-for="waveform of waveforms" :value="waveform" :key="waveform">
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
            <input id="polyphony" type="number" min="1" max="32" v-model="maxPolyphony" />
          </div>
          <label for="release">Audio delay (reduce pops)</label>
          <input
            id="audio-delay"
            class="control"
            type="range"
            min="0.0"
            max="0.1"
            step="any"
            v-model="audioDelay"
          />
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
