<template>
  <Box>
    <div class="columns">
      <div class="column is-7">{{ task.description || 'Tarefa sem descrição' }}</div>
      <div class="column">
        <Stopwatch :timeInSeconds="task.durationInSeconds"/>
      </div>
    </div>
  </Box>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import Stopwatch from "./Stopwatch.vue";
import ITask from '../interfaces/ITask'
import Box from './Box.vue'

export default defineComponent({
  name: "Task",
  
  components: {
    Box,
    Stopwatch,
  },
  
  props: {
    task: {
      type: Object as PropType<ITask>,
      required: true
    }
  }
});
</script>
