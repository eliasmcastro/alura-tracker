<template>
  <main
    class="columns is-gapless is-multiline"
    :class="{ 'theme-dark': themeDarkActive }"
  >
    <div class="column is-one-quarter">
      <Sidebar @themeChange="changeTheme" />
    </div>
    <div class="column is-three-quarter content">
      <Notifications />
      <router-view />
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Sidebar from '@/components/common/Sidebar.vue'
import Notifications from '@/components/notification/Notifications.vue'

export default defineComponent({
  name: 'App',

  components: {
    Sidebar,
    Notifications,
  },

  data() {
    return {
      themeDarkActive: false,
    }
  },

  methods: {
    changeTheme(themeDarkActive: boolean) {
      this.themeDarkActive = themeDarkActive
    },
  },
})
</script>

<style>
main {
  --bg-primary: #fff !important;
  --text-primary: #000 !important;
}

main.theme-dark {
  --bg-primary: #2b2d42 !important;
  --text-primary: #ddd !important;
}

.content {
  background-color: var(--bg-primary);
  color: var(--text-primary);
}

.list {
  padding: 1.25rem;
}
</style>
