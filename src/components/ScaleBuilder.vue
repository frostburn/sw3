<script setup lang="ts">
import { ref } from 'vue'
import { midiNoteNumberToName } from '@/utils'

const scaleName = ref('')

const baseMidiNote = ref(60)
</script>

<template>
  <div id="tab-build-scale" class="columns-container">
    <div class="column scale-builder">
      <textarea
        id="scale-name"
        rows="1"
        placeholder="Untitled scale"
        v-model="scaleName"
      ></textarea>

      <ul class="btn-group">
        <li class="btn-dropdown-group">
          <a class="btn" href="#">New scale ▼</a>
          <ul>
            <a href="#"><li>Equal temperament</li></a>
            <a href="#"><li>Harmonic series segment</li></a>
          </ul>
        </li>
        <li class="btn-dropdown-group">
          <a class="btn" href="#">Modify scale ▼</a>
          <ul>
            <a href="#"><li>Sort ascending</li></a>
            <a href="#"><li>Reduce</li></a>
          </ul>
        </li>
      </ul>

      <div class="control-group">
        <div class="control">
          <label>MIDI note for base frequency</label>
          <input
            type="number"
            ref="midiNoteNumber"
            min="0"
            max="127"
            step="1"
            v-model="baseMidiNote"
          />
          <span>{{ midiNoteNumberToName(baseMidiNote) }}</span>
        </div>
      </div>

      <div class="control-group">
        <h2>Scale data</h2>
        <div class="control">
          <textarea ref="scaleDataArea" rows="12"></textarea>
        </div>
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
</style>
