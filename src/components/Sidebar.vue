<template>
  <header>
    <h1>
      <img src="@/assets/logo.png">  
    </h1>
    <button class="button" @click="changeTheme">
      {{ textButton }}
    </button>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Sidebar',
  
  emits: ['themeChange'],
  
  data () {
    return {
      themeDarkActive: false
    }
  },
  
  computed: {
    textButton () {
      if (this.themeDarkActive) {
        return 'Desativar modo escuro'
      }
      return 'Ativar modo escuro'
    }
  },
  
  methods: {
    changeTheme () {
      this.themeDarkActive = !this.themeDarkActive
      this.$emit('themeChange', this.themeDarkActive)
    }
  }
})
</script>

<style scoped>
header {
  padding: 1rem;
  background: #0d3b66;
  width: 100%;
  height: 100vh;
  text-align: center;
}

@media only screen and (max-width: 768px) {
  header {
    padding: 2.5rem;
    height: auto;
  }
}
</style>
