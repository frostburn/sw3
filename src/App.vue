<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { useAudioContextStore } from './stores/audio-context'
import { Keyboard, type CoordinateKeyboardEvent } from '@/keyboard'
import { useScaleStore } from './stores/scale'

const audioContext = useAudioContextStore()
const scale = useScaleStore()

const colorScheme = ref<'light' | 'dark'>('light')
const equaveShift = ref(0)
const degreeShift = ref(0)
const isomorphicHorizontal = ref(1)
const isomorphicVertical = ref(7)
const typingActive = ref(false)

function emptyKeyup() {}

function keyboardNoteOn(index: number) {
  if (!audioContext.synth) {
    return emptyKeyup
  }
  return audioContext.synth.noteOn(440 * 2 ** ((index - scale.scale.baseMidiNote) / 12), 0.8)
}

// === Typing keyboard state ===
function windowKeydownOrUp(event: KeyboardEvent | MouseEvent) {
  const target = event.target
  // Keep typing activated while adjusting sliders
  if (target instanceof HTMLInputElement && ['range', 'radio', 'checkbox'].includes(target.type)) {
    typingActive.value = true
    return
  }
  // Disable typing for other types of input elements
  if (
    target instanceof HTMLTextAreaElement ||
    target instanceof HTMLInputElement ||
    target instanceof HTMLSelectElement
  ) {
    typingActive.value = false
  } else {
    typingActive.value = true
  }
}

// === Handle special keys ===
function windowKeydown(event: KeyboardEvent) {
  // Currently editing the scale, bail out
  if (!typingActive.value) {
    return
  }

  // Disable browser specific features like quick find on Firefox
  event.preventDefault()

  // The key left of Digit1 releases sustained keys
  if (event.code === 'Backquote') {
    typingKeyboard.deactivate()
    return
  }

  typingKeyboard.keydown(event)
}

// Keyups don't make new sounds so they can be passed through.
function windowKeyup(event: KeyboardEvent) {
  typingKeyboard.keyup(event)
}

// === Typing keyboard input ===
const typingKeyboard = new Keyboard()

function typingKeydown(event: CoordinateKeyboardEvent) {
  // Key not mapped to layers, bail out
  if (event.coordinates === undefined) {
    return emptyKeyup
  }

  const [x, y, z] = event.coordinates

  // Key not in the layer with digits and letters, bail out
  if (z !== 1) {
    return emptyKeyup
  }

  let index = scale.scale.baseMidiNote + scale.scale.size * equaveShift.value

  index += degreeShift.value + x * isomorphicHorizontal.value + (2 - y) * isomorphicVertical.value

  return keyboardNoteOn(index)
}

watch(colorScheme, (newValue) => {
  document.documentElement.setAttribute('data-theme', newValue)
  window.localStorage.setItem('colorScheme', newValue)
})

onMounted(() => {
  document.addEventListener('touchstart', audioContext.initialize)
  document.addEventListener('mousedown', audioContext.initialize)
  document.addEventListener('keydown', audioContext.initialize)

  window.addEventListener('keyup', windowKeyup)
  window.addEventListener('keydown', windowKeydownOrUp)
  window.addEventListener('keyup', windowKeydownOrUp)
  window.addEventListener('mousedown', windowKeydownOrUp)
  window.addEventListener('keydown', windowKeydown)
  typingKeyboard.addKeydownListener(typingKeydown)

  // Fetch user preferences
  const storage = window.localStorage
  if ('colorScheme' in storage) {
    const scheme = storage.getItem('colorScheme')
    if (scheme === 'light' || scheme === 'dark') {
      colorScheme.value = scheme
    }
  } else {
    // Infer based on a media query.
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      colorScheme.value = 'dark'
    } else {
      colorScheme.value = 'light'
    }
  }
})

onUnmounted(async () => {
  window.removeEventListener('keydown', windowKeydown)
  window.removeEventListener('keyup', windowKeyup)
  window.removeEventListener('keydown', windowKeydownOrUp)
  window.removeEventListener('keyup', windowKeydownOrUp)
  window.removeEventListener('mousedown', windowKeydownOrUp)
  typingKeyboard.removeEventListener(typingKeydown)

  document.removeEventListener('touchstart', audioContext.initialize)
  document.removeEventListener('mousedown', audioContext.initialize)
  document.removeEventListener('keydown', audioContext.initialize)

  await audioContext.unintialize()
})
</script>

<template>
  <nav id="app-navigation">
    <ul id="app-tabs">
      <li>
        <RouterLink to="/about"><strong>Sw</strong></RouterLink>
      </li>
      <li><RouterLink to="/">Build Scale</RouterLink></li>
      <li><RouterLink to="/synth">Synth</RouterLink></li>
    </ul>
    <div id="app-tray" class="hidden-sm">
      <ul>
        <template v-if="typingActive">
          <li title="Type on your computer keyboard to hear the synth">
            <span class="typing-info active">Key</span>
          </li>
        </template>
        <template v-else>
          <li title="Synth will not respond to keypresses until you click outside the input field">
            <span class="typing-info">Key</span>
          </li>
        </template>
      </ul>
    </div>
  </nav>
  <RouterView />
</template>

<style>
@import '@/assets/main.css';

#app {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  height: 100vh;
}

nav#app-navigation {
  flex: 0 0 auto;
  display: flex;
}

#app > main {
  flex: 1 1 auto;
  overflow-y: hidden;
}

/* Navigation tabs */
nav#app-navigation {
  background-color: var(--color-accent);
  color: white;
  max-width: 100%;
  overflow-x: auto;
}
ul#app-tabs {
  padding: 0px;
  margin: 0px;
  white-space: nowrap;
}
nav#app-navigation ul li {
  list-style-type: none;
  display: inline-block;
}
nav#app-navigation ul li a {
  display: inline-block;
  padding: 0.75rem 1rem;
  color: white;
  text-decoration: none;
  cursor: default;
}

nav#app-navigation ul#app-tabs li a:hover {
  background-color: var(--color-accent-deeper);
}

nav#app-navigation ul#app-tabs li a.router-link-exact-active,
nav#app-navigation ul#app-tabs li a.router-link-exact-active:hover {
  background-color: var(--color-background);
  color: var(--color-text);
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

/* Status indicator tray */
#app-tray {
  width: 100%;
  text-align: right;
  cursor: default;
}

#app-tray ul {
  display: inline-block;
  padding: 0.75rem 1rem;
  background-color: var(--color-accent-deeper);
}

#app-tray ul li {
  color: var(--color-accent);
}

#app-tray ul li .active {
  color: var(--color-accent-text);
}
</style>
