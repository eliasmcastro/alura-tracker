<template>
  <div class="box">
    <div class="columns">
      <div
        class="column is-5"
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
      <div class="column is-3">
        <div class="select">
          <select v-model="idProject">
            <option value="">Selecione o projeto</option>
            <option
              :value="project.id"
              v-for="project in projects"
              :key="project.id"
            >
              {{ project.name }}
            </option>
          </select>
        </div>
      </div>
      <div class="column">
        <Timer @finishedTimer="finishTask" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import { key } from '@/store'
import { TypeNotification } from '@/interfaces/INotification'
import useNotifier from '@/hooks/notifier'
import Timer from '@/components/common/Timer.vue'

export default defineComponent({
  name: 'FormTask',

  setup() {
    const store = useStore(key)
    const { notify } = useNotifier()

    return {
      projects: computed(() => store.state.project.projects),
      notify,
    }
  },

  emits: ['saveTask'],

  components: {
    Timer,
  },

  data() {
    return {
      description: '',
      idProject: '',
    }
  },

  methods: {
    finishTask(elapsedTime: number): void {
      this.$emit('saveTask', {
        durationInSeconds: elapsedTime,
        description: this.description,
        project: this.projects.find((project) => project.id === Number(this.idProject)),
      })

      this.notify(
        TypeNotification.SUCESSO,
        'Sucesso!',
        'Tarefa finalizada com sucesso!',
      )

      this.description = ''
      this.idProject = ''
    },
  },
})
</script>

<style scoped>
.select,
select {
  width: 100%;
}

.box {
  color: var(--text-primary);
  background-color: var(--bg-primary);
}

.button {
  margin-left: 8px;
}
</style>