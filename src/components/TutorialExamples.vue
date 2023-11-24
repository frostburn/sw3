<script setup lang="ts">
import { useScaleStore } from '@/stores/scale'

const scale = useScaleStore()

function frequency(event: MouseEvent) {
  const target = event.target as unknown as HTMLElement
  scale.name = target.textContent!
  scale.autoFrequency = false
  scale.lines.length = 0
  scale.lines.push(target.textContent!)
  scale.lines.push('P8')
}

function relative(event: MouseEvent) {
  const target = event.target as unknown as HTMLElement
  scale.name = target.textContent!
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
    All these are valid frequency expressions (<b>click</b> on the code to load a preset scale)
    <code @click="frequency">440 Hz</code>, <code @click="frequency">293.66Hz</code>,
    <code @click="frequency">1000/7 Hz</code> or <code @click="frequency">1.23 kHz</code>.
  </p>
  <p>The first line of a SW3 scale <b>must</b> be a frequency expression.</p>

  <h3>Ratios</h3>
  <p>
    Ratios of two frequencies are denoted by a numerator and a denominator separated by a slash
    character. e.g. <code @click="relative">3/2</code>.
  </p>
  <p>
    The numerator is optional: <code @click="relative">/2</code> is the same as
    <code @click="relative">1/2</code>.
  </p>

  <h3>Decimals</h3>
  <p>
    SW3 alsos denote ratios of frequencies with numbers separated by a decimal dot. e.g.
    <code @click="relative">1.5</code> means the same thing as <code @click="relative">3/2</code>.
  </p>
  <p>
    This is in contrast to Scala and SW2 where this syntax results in an interval measured in cents.
  </p>
  <p>
    This also means that e.g. <code @click="relative">1.2</code> is a true 5-limit interval, namely
    6/5.
  </p>
  <p>
    The whole part is optional: <code @click="relative">.5</code> is the same as
    <code @click="relative">0.5</code>. <br />
    The fractional part is optional: <code @click="relative">3.</code> is the same as
    <code @click="relative">3.0</code>.
  </p>
  <p>
    SW internals make a difference between rationals and reals. To make sure that a decimal number
    is not associated with any prime use an exclamation mark after the number e.g.
    <code @click="relative">3.14159265!</code>
  </p>

  <h3>Bare numbers</h3>
  <p>
    SW3 supports numbers without slashes or dots. e.g. <code @click="relative">7</code> is the same
    as <code @click="relative">7/1</code>.
  </p>

  <h3>Equally Divided Just Intonation</h3>
  <p>
    EDJI is denoted in the the same way as in SW2. e.g.
    <code @click="relative">3\5</code> is two to the power of three fifths when interpreted as a
    frequency ratio.
  </p>
  <p>
    The interval to be equally divided in pitch-space can be specified in angle brackets
    <code @click="relative">7\9&lt;3&gt;</code> is three to the power of seven ninths as a frequency
    ratio. The angle brackets may contain any valid SonicWeave expression.
  </p>
  <h3>Cents</h3>
  <p>
    Values measured in cents must use explicit units. e.g. <code @click="relative">600 c</code> is
    the square root of two as a frequency ratio. Unlike SW2, cents are directly associated with the
    prime 2. i.e. <code @click="relative">1c</code> is the same as
    <code @click="relative">1\1200</code>.
  </p>
  <p>
    To disassociate from the primes use an exclamation mark e.g.<code @click="relative"
      >1.955000865 c!</code
    >
    represents a real number approximately equal to <code @click="relative">1.00112989!</code> (note
    the exclamation mark).
  </p>
  <h3>Monzos</h3>
  <p>
    Prime count vectors are denoted with an opening square bracket and a closing angle bracket. e.g.
    <code @click="relative">[-4, 4, -1&gt;</code> is equal to
    <code @click="relative">81/80</code> or <code @click="relative">2^-4 * 3^4 * 5^-1</code> (see
    expressions below).
  </p>
  <h3>FJS</h3>
  <p>TODO</p>
  <h3>Absolute FJS</h3>
  <p>TODO: Absolute pitches require a declaration of the root pitch at the first line.</p>
  <h3>Comments</h3>
  <p>
    Everything after two slashes is ignored.
    <code @click="relative">M7^5 // The 5-limit major seventh, 15/8.</code>
  </p>

  <h2>Expressions</h2>
  <p>
    SW3 differentiates between frequencies, frequency ratios (a.k.a. scalars) and pitches. Adding
    together incompatible objects will result in a runtime error
    <code class="bad" @click="frequency">123Hz + 3/2 + 1\3</code>.
  </p>
  <p>
    Full arithmetic with parenthesis is supported featuring addition, subtraction, multiplication,
    division, exponentiation and modulo.
  </p>
  <h3>Additive operators</h3>
  <p>
    Addition and subtraction have the lowest precedence.
    <code @click="relative">5 - 1 - 2 + 4</code> is equal to <code @click="relative">6</code>.
  </p>
  <h3>Multiplicative operators</h3>
  <p>
    Multiplication is denoted with the asterisk '*'. SonicWeave reserves the slash character '/' for
    ratios and uses the percent sign '%' to denote division. You can also use '×' for multiplication
    and '÷' for division.
  </p>
  <p>
    Multiplication has the lowest precedence after addition.
    <code @click="relative">9 % 3 + 5 * 7 - 30</code> is equal to <code @click="relative">8</code>.
  </p>
  <p>
    You can only multiply by scalars <code @click="relative">2 × P4</code>. Multiplying pitches
    makes no sense <code class="bad" @click="relative">M3 * P3</code>. Division works between
    frequencies and produces ratios <code @click="relative">500Hz ÷ 400Hz</code>
  </p>
  <h3>Exponentiation</h3>
  <p>TODO</p>
  <h3>Modulus</h3>
  <p>TODO</p>
  <h3>Equave reduction</h3>
  <p>TODO</p>
  <h3>Unary operators</h3>
  <p>TODO</p>
  <h3>Functions</h3>
  <p>TODO</p>

  <h2>Declarations</h2>
  <h3>Variable declaration</h3>
  <p>TODO: You can declare custom variables. TODO: Variables can be accessed by name.</p>
  <h3>Map declaration</h3>
  <p>TODO</p>

  <h2>Advanced types</h2>
  <h3>Context variables</h3>
  <p>TODO</p>
  <h3>Vals</h3>
  <p>TODO</p>
  <h3>Warts</h3>
  <p>TODO</p>
  <h4>Implicit tempering</h4>
  <p>TODO</p>
  <h3>Neutral FJS</h3>
  <p>TODO</p>
  <h3>Interordinals</h3>
  <h4>Semiquartals</h4>
  <p>TODO</p>
  <h4>Semioctals</h4>
  <p>TODO</p>
  <h3>Quarter-augmented intervals</h3>
  <p>TODO</p>
  <h3>Seconds</h3>
  <p>
    Under the hood SW3 has support for all time domain quantities. e.g.
    <code @click="frequency">10 ms</code> is implicitly converted to
    <code @click="frequency">100 Hz</code> when used as a base frequency.
  </p>
  <h3>Inverse cents</h3>
  <p>
    If you really want to understand the meaning of <code @click="relative">€ * c</code>, I suggest
    reading my
    <a href="https://en.xen.wiki/w/User:Frostburn/Theory_From_First_Principles">notes</a> over at
    XenWiki.
  </p>
</template>
<style scoped>
code {
  cursor: pointer;
}
.bad {
  background-color: brown;
}
</style>
