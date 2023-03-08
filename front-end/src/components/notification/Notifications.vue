<template>
  <div class="notifications">
    <article
      class="message"
      :class="context[notification.type]"
      v-for="notification in notifications"
      :key="notification.id"
    >
      <div class="message-header">{{ notification.title }}</div>
      <div class="message-body">
        {{ notification.text }}
      </div>
    </article>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from '@/store'
import { TypeNotification } from '@/interfaces/INotification'

export default defineComponent({
  name: 'Notifications',

  setup() {
    const store = useStore()

    return {
      notifications: computed(() => store.state.notifications),
    }
  },

  data() {
    return {
      context: {
        [TypeNotification.SUCESSO]: 'is-success',
        [TypeNotification.ATENCAO]: 'is-warning',
        [TypeNotification.FALHA]: 'is-danger',
      },
    }
  },
})
</script>

<style scoped>
.notifications {
  position: absolute;
  right: 0;
  width: 300px;
  padding: 8px;
  z-index: 105;
}
</style>