<template>
  <header>
    <h1>
      <img src="@/assets/logo.png" alt="Alura Tracker" />
    </h1>
    <div class="has-text-centered">
      <button class="button" @click="changeTheme">
        Ativar modo {{ textButton }}
      </button>
    </div>
    <nav class="panel mt-5">
      <ul>
        <li>
          <router-link to="/" class="link">
            <i class="fas fa-tasks"></i>
            Tarefas
          </router-link>
        </li>
        <li>
          <router-link to="/projects" class="link">
            <i class="fas fa-project-diagram"></i>
            Projetos
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Sidebar',

  emits: ['themeChange'],

  data() {
    return {
      themeDarkActive: false,
    }
  },

  computed: {
    textButton(): string {
      return this.themeDarkActive ? 'claro' : 'escuro'
    },
  },

  methods: {
    changeTheme(): void {
      this.themeDarkActive = !this.themeDarkActive
      this.$emit('themeChange', this.themeDarkActive)
    },
  },
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

.panel li {
  margin: 8px 0;
}

.link {
  color: #fff;
}

.link:hover {
  color: #faf0ca;
}

.link.router-link-active {
  color: #faf0ca;
}
</style>
