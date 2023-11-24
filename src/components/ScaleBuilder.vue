<script setup lang="ts">
import { useScaleStore } from '@/stores/scale'

const scale = useScaleStore()

function lol5edo() {
  scale.name = 'Budget split fourths'
  scale.lines.length = 1
  for (let i = 1; i <= 5; ++i) {
    scale.lines.push(`${i}\\5`)
  }
}

function lmao5ten() {
  scale.name = 'Otonal pentatonic'
  scale.lines.length = 1
  for (let i = 6; i <= 10; ++i) {
    scale.lines.push(`${i}/5`)
  }
}
</script>

<template>
  <div id="tab-build-scale" class="columns-container">
    <div class="column scale-builder">
      <textarea
        id="scale-name"
        rows="1"
        placeholder="Untitled scale"
        v-model="scale.name"
      ></textarea>

      <ul class="btn-group">
        <li class="btn-dropdown-group">
          <a class="btn" href="#">New scale ▼</a>
          <ul>
            <a href="#" @click="lol5edo"><li>Equal temperament</li></a>
            <a href="#" @click="lmao5ten"><li>Harmonic series segment</li></a>
          </ul>
        </li>
        <li class="btn-dropdown-group">
          <a class="btn" href="#">Modify scale ▼</a>
          <ul>
            <a href="#" @click="scale.sort"><li>Sort ascending</li></a>
            <a href="#" @click="scale.reduce"><li>Reduce</li></a>
          </ul>
        </li>
      </ul>

      <div class="control-group">
        <div class="control">
          <label for="base-midi-note">MIDI note for base frequency</label>
          <input id="base-midi-note" type="number" step="1" v-model="scale.baseMidiNote" />
        </div>
        <div class="control">
          <label for="enharmonic">Pythagorean enharmonic</label>
          <select id="enharmonic" v-model="scale.enharmonic" :disabled="!scale.autoFrequency">
            <option v-for="e of scale.enharmonics" :key="e" :value="e">{{ e }}</option>
          </select>
        </div>
        <div class="control checkbox-container">
          <input id="auto-frequency" type="checkbox" v-model="scale.autoFrequency" /><label
            for="auto-frequency"
            >Automatic base frequency</label
          >
        </div>
      </div>

      <div class="control-group">
        <h2>Scale data</h2>
        <div class="control">
          <input v-if="scale.autoFrequency" type="text" :value="scale.autoLine" disabled />
          <input v-else type="text" v-model="scale.lines[0]" />
        </div>
        <div class="control" v-for="i of scale.lines.length - 2" :key="i">
          <input type="text" v-model="scale.lines[i]" />
          <span class="delete" @click="scale.lines.splice(i, 1)"></span>
        </div>
        <button @click="scale.lines.splice(-1, 0, '')">+</button>
        <div class="control">
          <input type="text" v-model="scale.lines[scale.lines.length - 1]" />
        </div>
        <p class="error">{{ scale.error }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Content layout (small) */
div.columns-container {
  height: 100%;
  overflow-y: auto;
  background-color: var(--color-border);
}
div.column {
  background-color: var(--color-background);
  overflow-x: hidden;
}
div.scale-builder {
  padding: 1rem;
}
div.tuning-table {
  padding: 0rem;
}
div.exporters {
  padding: 1rem;
}

/* Content layout (medium) */
@media screen and (min-width: 600px) {
  div.columns-container {
    column-count: 2;
    column-gap: 1px;
    overflow: hidden;
  }
  div.column {
    overflow-y: auto;
  }
  div.scale-builder {
    width: 100%;
    height: 100%;
  }
  div.tuning-table {
    width: 100%;
    height: 66%;
  }
  div.exporters {
    width: 100%;
    height: 34%;
    border-top: 1px solid var(--color-border);
  }
}

/* Content layout (large) */
@media screen and (min-width: 1100px) {
  div.columns-container {
    column-count: 3;
  }
  div.column {
    height: 100%;
  }
  div.exporters {
    border: none;
  }
}

/* UI elements */
#scale-name {
  width: 100%;
  font-size: 1.4em;
  margin-bottom: 1rem;
  padding: 0.3rem;
  font-family: sans-serif;
  resize: vertical;
}
div.exporters .btn {
  width: 100%;
  display: block;
  margin-bottom: 1rem;
  margin-left: 0;
}

select optgroup + optgroup {
  margin-top: 1em;
}

.real-valued:invalid {
  background-color: var(--color-background);
}

.delete::after {
  cursor: pointer;
  content: '🗑';
}
</style>
