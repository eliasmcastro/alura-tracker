<template>
  <Box>
    <div class="columns is-clickable" @click="taskClicked">
      <div class="column is-4">
        Projeto: {{ task.project?.name || 'Tarefa sem projeto' }}
      </div>
      <div class="column is-6">
        Tarefa: {{ task.description || 'Tarefa sem descrição' }}
      </div>
      <div class="column">
        <Stopwatch :timeInSeconds="task.durationInSeconds" />
      </div>
    </div>
  </Box>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import Stopwatch from '@/components/common/Stopwatch.vue'
import ITask from '@/interfaces/ITask'
import Box from '@/components/common/Box.vue'

export default defineComponent({
  name: 'Task',

  emits: ['taskClicked'],

  components: {
    Box,
    Stopwatch,
  },

  props: {
    task: {
      type: Object as PropType<ITask>,
      required: true,
    },
  },

  methods: {
    taskClicked() {
      this.$emit('taskClicked', this.task)
    },
  },
})
</script>
