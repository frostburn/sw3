<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'

const colorScheme = ref<'light' | 'dark'>('dark')
const typingActive = ref(false)

document.documentElement.setAttribute('data-theme', colorScheme.value)

/*
onMounted(() => {
  // Fetch user preferences
  const storage = window.localStorage;
  if ("colorScheme" in storage) {
    const scheme = storage.getItem("colorScheme");
    if (scheme === "light" || scheme === "dark") {
      colorScheme.value = scheme;
    }
  } else {
    // Infer based on a media query.
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      colorScheme.value = "dark";
    } else {
      colorScheme.value = "light";
    }
  }
});
*/
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
