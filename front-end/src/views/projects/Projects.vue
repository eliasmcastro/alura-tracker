<template>
  <div class="projects">
    <h1 class="title">Projetos</h1>
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Projects',
})
</script>

<style scoped>
.projects {
  padding: 1.25rem;
}

.title {
  color: var(--text-primary);
}
</style>
