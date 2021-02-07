<template>
  <header>
    <Navbar />
  </header>
  <main class="overflow d-flex">
    <router-view v-slot="{ Component }">
      <transition name="route" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </main>
  <footer>
    <Footer />
  </footer>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'

export default {
  name: 'App',
  setup() {
    return {
      appState: computed(() => AppState)
    }
  }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";
@import "./assets/scss/_variables.scss";
@import "bootstrap";
@media only screen and (max-width: 600px) {
  #app {
    flex-direction: column-reverse;
  }
  main::-webkit-scrollbar {
    display: none !important;
  }
  footer {
    display: none;
  }
}
</style>
