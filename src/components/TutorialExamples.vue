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

function pythagoras() {
  scale.name = 'Pythagorean chain of fifths'
  scale.autoFrequency = true
  scale.lines.length = 0
  scale.lines.push('440 Hz')
  for (const input of 'd5,m2,m6,m3,m7,P4,P1,P5,M2,M6,M3,M7,A4'.split(',')) {
    scale.lines.push(input)
  }
  scale.lines.push('P8')
}

function twelveTone() {
  scale.name = '12-tone equal temperament'
  scale.autoFrequency = true
  scale.lines.length = 0
  scale.lines.push('440 Hz')
  for (const input of 'm2,M2,m3,M3,P4,A4,P5,m6,M6,m7,M7,12@'.split(',')) {
    scale.lines.push(input)
  }
  scale.lines.push('P8')
}

function absoluteFJS() {
  scale.name = 'Bb4^7 above C4'
  scale.autoFrequency = false
  scale.lines.length = 0
  scale.lines.push('C4 = 261.63Hz')
  scale.lines.push('Bb4^7')
  scale.lines.push('C5')
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
    <code @click="relative">6/5</code>.
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
  <h3>Pythagorean</h3>
  <p>
    Pythagorean intervals such as the perfect fourth <code @click="relative">P4</code> are
    constructed by multiplying powers of two and three so <code @click="relative">16/9</code> i.e.
    <code @click="relative">2^4 * 3^-2</code> is a Pythagorean interval but
    <code @click="relative">5/4</code> is not because it contains a factor of five.
  </p>
  <p>
    They form a chain of fifths going from diminished (negative three's exponent) to augmented
    (positive three's exponent):
    <code @click="pythagoras">..., d5, m2, m6, m3, m7, P4, P1, P5, M2, M6, M3, M7, A4, ...</code>
  </p>
  <p>
    If you're coming from 12-tone equal temperament you may already be familiar with this notation.
    Just tag a <code @click="twelveTone">12@</code> at the end of your sorted scale and you're right
    at home.
  </p>
  <h3>FJS</h3>
  <p>
    The <a href="https://en.xen.wiki/w/Functional_Just_System">Functional Just System</a> extends
    Pythagorean notation using microtonal accidentals that move from the <i>spine</i> of fifths to
    higher primes. e.g. the major third <code @click="relative">M3</code> =
    <code @click="relative">81/64</code> is fairly complex as a ratio but the 5-limit major third is
    much simpler <code @click="relative">M3^5</code> = <code @click="relative">5/4</code>.
  </p>
  <p>
    Note that in FJS the accidentals signify where the higher primes are in the fraction. The
    superscript 5 actually goes down in pitch while the subscript 5 goes up in pitch. Compare
    <code @click="relative">m3</code> with <code @click="relative">m3_5</code>.
  </p>
  <h3>Absolute pitches</h3>
  <p>
    Pythagorean notation extends to absolute pitches like <code @click="relative">C4</code> where
    the nominal determines where in the chain of fifths we are and the number counts the octaves
    i.e. <code @click="relative">B5</code> is two octaves higher than <code @click="relative">B3</code>.
  </p>
  <p>
    Due to a historical quirk instead of going alphabetically the octaves begin at C and go D, E, F, G, A and B before starting the next octave.
  </p>
  <p>
    Instead of becoming augmented absolute pitches acquire accidentals:<br />
    <code @click="relative">C#4</code> is the same as
    <code @click="relative">C4 + A1</code> and<br />
    <code @click="relative">Cb4</code> is the same as <code @click="relative">C4 + d1</code>.
  </p>
  <p>
    It is an unfortunate bug of this common notation that <i>"A of octave 4"</i> and
    <i>"augmented fourth"</i> collide. To get around it you can write this nominal in lower case
    <code @click="relative">a4</code> or with a natural sign <code @click="relative">A=4</code>.
  </p>
  <p>
    Note that absolute pitches require a declaration of the root pitch on the first line:
    <code @click="frequency">A4 = 420 Hz</code> (A4 is unambiguously a pitch here)
  </p>
  <p>
    FJS accidental are supported with absolute pitches. e.g.
    <code @click="absoluteFJS">Bb4^7</code> is <code @click="relative">7/4</code> above C4.
  </p>
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
  <p>
    Repeated multiplication can be expressed using the caret symbol '^'. e.g.
    <code @click="relative">2*2*2</code> = <code @click="relative">2^3</code>
  </p>
  <p>
    Exponentiation has a higher precedence than multiplication or division
    <code @click="relative">3^2 % 2^3</code> = <code @click="relative">9/8</code>
  </p>
  <p>
    Note that in SonicWeave slash division binds stronger than exponentiation so
    <code @click="relative">3^1/2</code> is the square root of three.
  </p>
  <h3>Modulo</h3>
  <p>
    The remainder after division is notated 'mod' and placed between the dividend and the divisor.
    e.g.
    <code @click="relative">7 mod 4</code> = <code @click="relative">3</code>.
  </p>
  <p>
    Modulo in pitch space is useful for octave reduction. e.g.
    <code @click="relative">(P5 + P5 + P5) mod P8</code> = <code @click="relative">M6</code>
  </p>
  <h3>Equave reduction</h3>
  <p>
    To get the same behaviour with scalars you have to call it 'reduce'. e.g.
    <code @click="relative">(3 * 3 * 3) reduce 2</code> = <code @click="relative">27/16</code>.
  </p>
  <h3>Unary operators</h3>
  <p>
    The minus sign negates: <code @click="relative">-P4</code> =
    <code @click="relative">P5 - P8</code> and <br />
    the percent sign inverts: <code @click="relative">%2</code> =
    <code @click="relative">1/2</code>.
  </p>
  <p>
    All by themselves negative frequencies are not that interesting as they sound the same:
    <code @click="frequency">-440 Hz</code> ~ <code @click="frequency">440 Hz</code>
  </p>
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
