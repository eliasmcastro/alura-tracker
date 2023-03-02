<template>
  <div class="is-flex is-align-items-center is-justify-content-space-between">
    <Stopwatch :timeInSeconds="timeInSeconds" />
    <button class="button" @click="start" :disabled="stopwatchRunning">
      <span class="icon">
        <i class="fas fa-play"></i>
      </span>
      <span>play</span>
    </button>
    <button class="button" @click="stop" :disabled="!stopwatchRunning">
      <span class="icon">
        <i class="fas fa-stop"></i>
      </span>
      <span>stop</span>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Stopwatch from './Stopwatch.vue'

export default defineComponent({
  name: 'Timer',

  emits: ['finishedTimer'],

  components: {
    Stopwatch,
  },

  data() {
    return {
      timeInSeconds: 0,
      stopwatch: 0,
      stopwatchRunning: false,
    }
  },

  methods: {
    start() {
      // 1 seg = 1000 ms
      this.stopwatchRunning = true
      this.stopwatch = setInterval(() => {
        this.timeInSeconds += 1
      }, 1000)
    },

    stop() {
      this.stopwatchRunning = false
      clearInterval(this.stopwatch)
      this.$emit('finishedTimer', this.timeInSeconds)
      this.timeInSeconds = 0
    },
  },
})
</script>