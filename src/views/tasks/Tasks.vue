<template>
  <FormTask @saveTask="saveTask" />
  <div class="list">
    <Task v-for="(task, index) in tasks" :key="index" :task="task" />
    <Box v-if="emptyTaskList"> Você não está muito produtivo hoje :( </Box>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import FormTask from '@/components/tasks/FormTask.vue'
import Task from '@/components/tasks/Task.vue'
import Box from '@/components/common/Box.vue'
import ITask from '@/interfaces/ITask'

export default defineComponent({
  name: 'Tasks',

  components: {
    FormTask,
    Task,
    Box,
  },

  data() {
    return {
      tasks: [] as ITask[],
    }
  },

  computed: {
    emptyTaskList(): boolean {
      return this.tasks.length === 0
    },
  },

  methods: {
    saveTask(task: ITask) {
      this.tasks.push(task)
    },
  },
})
</script>