<template>
  <div class="box form">
    <div class="columns">
      <div
        class="column is-8"
        role="form"
        aria-label="Formulário para criação de uma nova tarefa"
      >
        <input
          type="text"
          class="input"
          placeholder="Qual tarefa você deseja iniciar?"
          v-model="description"
        />
      </div>
      <div class="column">
        <Timer @finishedTimer="finishTask"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Timer from './Timer.vue'

export default defineComponent({
  name: "FormTask",
  
  emits: ['saveTask'],
  
  components: {
    Timer
  },
  
  data () {
    return {
      description: ''
    }
  },
  
  methods: {
    finishTask (elapsedTime: number) : void {
      this.$emit('saveTask', {
        durationInSeconds: elapsedTime,
        description: this.description
      })
      this.description = ''
    }
  }
});
</script>

<style scoped>
.form {
  color: var(--text-primary);
  background-color: var(--bg-primary);
}
</style>