<script setup lang="ts">
import { useScaleStore } from '@/stores/scale'

const scale = useScaleStore()

function _relative() {
  scale.autoFrequency = true
  scale.lines.length = 0
  scale.lines.push('440 Hz')
}

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
  _relative()
  scale.lines.push(target.textContent!)
  scale.lines.push('P8')
}

function pythagoras() {
  scale.name = 'Pythagorean chain of fifths'
  _relative()
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

function equalBeats() {
  scale.name = 'Equally beating major seventh chord'
  scale.autoFrequency = true
  scale.lines.length = 0
  scale.lines.push('440 Hz')
  scale.lines.push('frequency(M3^5) + 1Hz')
  scale.lines.push('frequency(P5) - 1Hz')
  scale.lines.push('frequency(M7^5) + 0Hz')
  scale.lines.push('frequency(P8) + 1Hz')
}

function deltaRational() {
  scale.name = 'Delta-rational semifourth'
  scale.autoFrequency = true
  scale.lines.length = 0
  scale.lines.push('440 Hz')
  scale.lines.push('ratio(P4 % 2) + 0/6')
  scale.lines.push('ratio(P4 % 2) + 1/6')
  scale.lines.push('ratio(P4 % 2) + 2/6')
  scale.lines.push('ratio(P4 % 2) + 3/6')
  scale.lines.push('ratio(P4 % 2) + 4/6')
  scale.lines.push('P8')
}

function lyman() {
  scale.name = 'Octave reduced hydrogen Lyman series'
  scale.autoFrequency = false
  scale.lines.length = 0
  scale.lines.push('nmtof(121.56701) * 2^-42')
  scale.lines.push('nmtof(102.57220) * 2^-42')
  scale.lines.push('nmtof(97.253650) * 2^-42')
  scale.lines.push('nmtof(94.974287) * 2^-42')
  scale.lines.push('nmtof(93.780331) * 2^-42')
  scale.lines.push('nmtof(93.0748142) * 2^-42')
  scale.lines.push('nmtof(92.6225605) * 2^-42')
  scale.lines.push('nmtof(92.3150275) * 2^-42')
  scale.lines.push('nmtof(92.0963006) * 2^-42')
  scale.lines.push('nmtof(91.9351334) * 2^-42')
  scale.lines.push('nmtof(91.1753)  * 2^-42 // Lyman limit')
}

function syntonic() {
  scale.name = '5-limit minor using a variable'
  scale.autoFrequency = true
  scale.lines.length = 0
  scale.lines.push('440 Hz')
  scale.lines.push('$syntonic = pitch(9/8 % 10/9)')
  scale.lines.push('m3 + $syntonic')
  scale.lines.push('P5')
  scale.lines.push('m7 + $syntonic')
  scale.lines.push('P8')
}

function reduce() {
  scale.name = 'Fives against a double octave'
  scale.autoFrequency = true
  scale.lines.length = 0
  scale.lines.push('440 Hz')
  scale.lines.push('5')
  scale.lines.push('5^2')
  scale.lines.push('5^3')
  scale.lines.push('5^4')
  scale.lines.push('5^5')
  scale.lines.push('= $ reduce 4')
  scale.lines.push('4')
}

function context1() {
  scale.name = 'Positive backreference'
  _relative()
  scale.lines.push('P4')
  scale.lines.push('$1 + M2')
  scale.lines.push('P8')
}

function superwhole() {
  scale.name = 'Super-whole-tones'
  _relative()
  scale.lines.push('$-1 * 8/7')
  scale.lines.push('$-1 * 8/7')
  scale.lines.push('$-1 * 8/7')
  scale.lines.push('$-1 * 8/7')
  scale.lines.push('$-1 * 8/7')
  scale.lines.push('2')
}

function neutrals() {
  scale.name = 'Neutral Pythagorean'
  scale.autoFrequency = true
  scale.lines.length = 0
  scale.lines.push('440 Hz')
  scale.lines.push('sd1 // [5.5 -3.5>')
  scale.lines.push('sd5 // [4.5 -2.5>')
  scale.lines.push('n2 // [2.5 -1.5>')
  scale.lines.push('n6 // [1.5 -0.5> = P11 % 2')
  scale.lines.push('n3 // [-0.5 0.5> = P5 % 2')
  scale.lines.push('n7 // [-1.5 1.5> = P5 * 3/2')
  scale.lines.push('sA4 // [-3.5 2.5>')
  scale.lines.push('sA1 // [-5.5 3.5>')
  scale.lines.push('P8')
}

function neutralAbsolute_() {
  scale.autoFrequency = false
  scale.lines.length = 0
  scale.lines.push('C4 = 261.63Hz')
  scale.lines.push('D4')
  scale.lines.push('Esb4')
  scale.lines.push('F4')
  scale.lines.push('G4')
  scale.lines.push('Asb4')
  scale.lines.push('Bsb4')
}

function neutralAbsolute() {
  scale.name = 'Neutral absolute Pythagorean'
  neutralAbsolute_()
  scale.lines.push('C5')
}

function neutral17() {
  scale.name = '17edo 3L4s'
  neutralAbsolute_()
  scale.lines.push('17@')
  scale.lines.push('C5')
}

function neutral5() {
  scale.name = '10edo! 3L4s'
  neutralAbsolute_()
  scale.lines.push("5@ // Bad practice, 5edo doesn't have a split fifth!")
  scale.lines.push('C5')
}

function tonesplitters() {
  scale.name = 'Tonesplitters'
  scale.autoFrequency = true
  scale.lines.length = 0
  scale.lines.push('440 Hz')
  scale.lines.push('sd2.5 // [6.5 -4>')
  scale.lines.push('n6.5 // [5.5 -3>')
  scale.lines.push('n3.5 // [3.5 -2>')
  scale.lines.push('n7.5 // [2.5 -1>')
  scale.lines.push('n4.5 // [0.5 0> = P8 % 2')
  scale.lines.push('n1.5 // [-1.5 1> = M2 % 2')
  scale.lines.push('n5.5 // [-2.5 2>')
  scale.lines.push('n2.5 // [-4.5 3> = M2 * 3/2')
  scale.lines.push('sA6.5 // [-5.5 4>')
  scale.lines.push('P8')
}

function semiquartals() {
  scale.name = 'Semiquartals'
  scale.autoFrequency = true
  scale.lines.length = 0
  scale.lines.push('440 Hz')
  scale.lines.push('d2.5 // [12 -7.5>')
  scale.lines.push('m6.5 // [11 -6.5>')
  scale.lines.push('m3.5 // [9 -5.5>')
  scale.lines.push('m7.5 // [8 -4.5>')
  scale.lines.push('m4.5 // [6 -3.5>')
  scale.lines.push('m1.5 // [4 -2.5>')
  scale.lines.push('m5.5 // [3 -1.5> = P4 * 3/2')
  scale.lines.push('m2.5 // [1 -0.5> = P4 % 2')
  scale.lines.push('M6.5 // [0 0.5> = P12 % 2')
  scale.lines.push('M3.5 // [-2 1.5>')
  scale.lines.push('M7.5 // [-3 2.5>')
  scale.lines.push('M4.5 // [-5 3.5>')
  scale.lines.push('M1.5 // [-7 4.5>')
  scale.lines.push('M5.5 // [-8 5.5>')
  scale.lines.push('M2.5 // [-10 6.5>')
  scale.lines.push('A6.5 // [-11 7.5>')
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
    hit keys on a physical keyboard (the typing kind; MIDI input is also missing).
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
    i.e. <code @click="relative">B5</code> is two octaves higher than
    <code @click="relative">B3</code>.
  </p>
  <p>
    Due to a historical quirk instead of going alphabetically the octaves begin at C and go D, E, F,
    G, A and B before starting the next octave.
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
    <code @click="frequency">A4 = 420 Hz</code> (A4 is unambiguously an absolute pitch here)
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
    SonicWeave differentiates between frequencies, frequency ratios (a.k.a. scalars) and pitches.
    Adding incompatible objects together will result in a runtime error
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
  <h3>Logarithm</h3>
  <p>
    Exponentiation can be reverted with the logarithm (base n). e.g.
    <code @click="relative">8 log 2</code> = <code @click="relative">3</code>.
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
  <p>At this point SonicWeave comes with only a handful of functions.</p>
  <p>
    Converting values to frequency is handy for building equally beating scales
    <code @click="equalBeats">frequency(P5) - 1Hz, ...</code>.
  </p>
  <p>
    Converting values to ratios allows you to build delta-rational scales
    <code @click="deltaRational">ratio(P4 % 2) + 1/6, ...</code>.
  </p>
  <p>
    Converting values to pitches allows you to add them to other pitches
    <code @click="relative">M3 - pitch(81/80)</code>.
  </p>
  <p>
    MIDI-to-frequency converts scalars to frequencies of 12-tone equal temperament with A4 = 440 Hz
    <code @click="relative">mtof(69)</code>.
  </p>
  <p>
    Frequency-to-MIDI does the reverse <code @click="relative">ftom(11 Hz)</code> (not so useful by
    itself).
  </p>
  <p>
    Converting nanometers to frequency is used to stress test the system with atomic spectra
    <code @click="lyman">nmtof(121.56701)</code>.
  </p>
  <p>
    Then there's the square root <code @click="relative">sqrt(4/3)</code> and<br />
    the cube root <code @click="relative">cbrt(3/2)</code>.
  </p>
  <h2>Declarations</h2>
  <h3>Variable declaration</h3>
  <p>
    You can declare custom variables using dollar sign '$' syntax
    <code @click="syntonic">$syntonic = pitch(9/8 % 10/9)</code>
  </p>
  <h4>Variable access</h4>
  <p>
    You cab access declared variables by name using corresponding dollar sign '$' syntax
    <code @click="syntonic">m3 + $syntonic</code>
  </p>
  <h3>Map declaration</h3>
  <p>
    You can map over all of the intervals so far by omitting the dollar sign and using an empty
    variable name on the right hand side:
    <code @click="reduce">= $ reduce 4</code>
  </p>

  <h2>Advanced topics</h2>
  <h3>Context variables</h3>
  <h4>Previous lines</h4>
  <p>
    You can refer to the base frequency using <code @click="relative">$0</code> or to any of the
    previous interval starting from '1' with <code @click="context1">$1</code>.
  </p>
  <p>
    Negative indices are counted back from the current line excluding variable definitions. This
    allows you to e.g. stack an interval using backreferences:
    <code @click="superwhole">$-1 * 8/7</code>.
  </p>
  <h4>Current index</h4>
  <p>TODO</p>
  <h4>Current MIDI note</h4>
  <p>TODO</p>
  <h3>Vals</h3>
  <p>TODO</p>
  <h3>Warts</h3>
  <p>TODO</p>
  <h4>Implicit tempering</h4>
  <p>TODO</p>
  <h3>Neutral Pythagorean</h3>
  <p>
    The ordinal notation for the perfect fifth <code @click="relative">P5</code> masks the fact that
    it spans 4 steps. This means that it can be split into two by introducing one new interval
    quality: <i>neutral</i>.
  </p>
  <p>
    The split fifth is called the neutral third <code @click="relative">n3</code> =
    <code @click="relative">P5 % 2</code>.
  </p>
  <p>
    Splitting the fifth also results in the augmented unison
    <code @click="relative">A1</code> splitting into two semi-augmented unisons
    <code @click="relative">sA1</code>.
  </p>
  <p>
    By stacking fifths on top of the neutral third we get a whole chain of neutral intervals:
    <code @click="neutrals">... n2, n6, n3, n7, ...</code>
  </p>
  <h4>Neutral absolute pitch</h4>
  <p>
    Because the sharp sign '#' is just syntactic sugar for '+ A1' we get neutral absolute pitch
    basically for free.
  </p>
  <p>Try this neutral scale for a taste <code @click="neutralAbsolute">C4, D4, Esb4, ...</code></p>
  <p>
    Now use implict tempering to hear it in 17edo
    <code @click="neutral17">... Bsb4, 17@, ...</code>.
  </p>
  <p>
    <b>Warning</b>, implicit tempering takes everything literally and will split the fifth even if
    that bridges into a higher equal temperament.<br />
    Despite the appearance this scale is actually in 10edo
    <code @click="neutral5">... Bsb4, 5@, ...</code>.
  </p>
  <h4>Neutral FJS</h4>
  <p>
    Neutral intervals complement Pythagorean intervals beautifully by filling gaps in the octave
    that are hard to reach through the chain of fifths.
  </p>
  <p>
    The
    <a href="https://en.xen.wiki/w/User:M-yac/Neutral_Intervals_and_the_FJS">neutral extension</a>
    of the Functional Just System takes advantage of this by associating some primes like 11, 13,
    29, 31, 37 etc. with a neutral interval. e.g. <code @click="relative">n3^11</code> =
    <code @click="relative">11/9</code>.
  </p>
  <p>
    SonicWeave won't let you bridge into irrationals. When combined with a regular Pythagorean
    interval the accidentals are interpreted according to the original FJS specification. e.g.
    <code @click="relative">m3^11</code> = <code @click="relative">11/9</code>.
  </p>
  <h3>Quarter-augmented intervals</h3>
  <p>
    The fifth can be split twice without breaking Pythagorean logic resulting in quarter-augmented
    intervals.
  </p>
  <p>
    The notational tweaks required consist of the quarter-augmented unison
    <code @click="relative">qA1</code>, the sesqui-quarter-augmented unison
    <code @click="relative">QA1</code>, semimajor intervals like
    <code @click="relative">sM2</code> and semiminor intervals like
    <code @click="relative">sm7</code>. Everything else that's classified as quarter-augmented
    follows from these according to Pythagorean logic.
  </p>
  <h3>Interordinals</h3>
  <h4>Tonesplitters</h4>
  <p>
    Technically the term <i>semitone</i> is a misnomer because
    <code @click="relative">m2</code> doesn't split the tone <code @click="relative">M2</code> in
    half with mathematical precission.
  </p>
  <p>
    While not musically exciting, the theoretical implications of splitting a whole-tone
    <code @click="relative">M2</code> into two true semi-whole-tones
    <code @click="relative">n1.5</code> are worth exploring. e.g. we get notation for the semioctave
    <code @click="relative">n4.5</code> = <code @click="relative">P8 % 2</code>.
  </p>
  <p>
    Tonesplitters form a chain of offset fifths which are all qualified as neutral:
    <code @click="tonesplitters">... n7.5, n4.5, n1.5, ...</code>.
  </p>
  <h4>Semiquartals</h4>
  <p>
    The true power of splitting the tone is revealed when we semidiminish one of the new intervals:
    <code @click="relative">n2.5 + sd1</code> = <code @click="relative">m2.5</code> =
    <code @click="relative">P4 % 2</code>.
  </p>
  <p>
    We've succesfully split the perfect fourth into two! <br />
    From the orginal seven neutral intervals spawns 7 diminished, 7 minor, 7 major and 7 augmented
    new semiquartal intervals with an internally consistent Pythagorean logic.
  </p>
  <p>
    The offset chain of fifths is
    <code @click="semiquartals">... m5.5, m2.5, M6.5, M3.5, ...</code>
  </p>
  <p>
    I love the sound of the split fourth so consider tonesplitters leading into semiquartals a
    personal indulgence.
  </p>
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
