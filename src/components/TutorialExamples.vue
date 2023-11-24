<script setup lang="ts">
import { useScaleStore } from '@/stores/scale'

const scale = useScaleStore()

function frequency(event: MouseEvent) {
  const target = event.target as unknown as HTMLElement
  scale.autoFrequency = false
  scale.lines.length = 0
  scale.lines.push(target.textContent!)
  scale.lines.push('P8')
}

function ratio(event: MouseEvent) {
  const target = event.target as unknown as HTMLElement
  scale.autoFrequency = true
  scale.lines.length = 0
  scale.lines.push('440 Hz')
  scale.lines.push(target.textContent!)
  scale.lines.push('P8')
}
</script>
<template>
  <h1>Welcome to Scale Workshop 3</h1>
  <p>
    This is the very early alpha of SW3. The purpose of this release is to get early feedback on the
    new syntax I've decided to call <i><b>SonicWeave</b></i
    >.
  </p>
  <p>
    This document will evolve into an interactive tutorial in the production release so feel free to
    critique the quality of exposition as well.
  </p>
  <p>You can find me on Discord as <i>frostburn</i> and on Facebook as <i>Lumi Pakkanen</i>.</p>

  <h3>Changes compared to Scale Workshop 2</h3>
  <p>
    The base MIDI note will take a much more prominent role and default to C4 instead of A4 (which
    SW2 called A5 for French reasons I presume).
  </p>
  <p>By default the base frequency will be automatically calculated based on the MIDI note.</p>
  <p>
    The alpha doesn't have a tuning table or a virtual keyboard so the only way to make sound is to
    hit keys on a physical keyboard (the typing kind, MIDI input is also missing).
  </p>

  <h2>Interval types</h2>
  <h3>Frequencies</h3>
  <p>
    Frequencies are denoted by a number followed by `Hz` with an optional
    <a href="https://en.wikipedia.org/wiki/Metric_prefix">metric prefix</a>.
  </p>
  <p>
    All these are valid frequency expressions (click on the code to load a preset scale)
    <code @click="frequency">440 Hz</code>, <code @click="frequency">293.66Hz</code>,
    <code @click="frequency">1000/7 Hz</code> or <code @click="frequency">1.23 kHz</code>.
  </p>
  <p>The first line of a SW3 scale <b>must</b> be a frequency expression.</p>

  <h3>Ratios</h3>
  <p>
    Ratios of two frequencies are denoted by a numerator and a denominator separated by a slash
    character. e.g. <code @click="ratio">3/2</code>.
  </p>
  <p>
    The numerator is optional: <code @click="ratio">/2</code> is the same as
    <code @click="ratio">1/2</code>.
  </p>
</template>
<style scoped>
code {
  cursor: pointer;
}
</style>
