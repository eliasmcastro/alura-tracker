<template>
  <Modal :show="taskSelected != null">
    <template v-slot:header>
      <p class="modal-card-title mb-0">Detalhes da tarefa</p>
      <button @click="closeModal" class="delete" aria-label="close"></button>
    </template>
    <template v-slot:body>
      <div class="field">
        <label for="description" class="label">Descrição</label>
        <input
          type="text"
          id="description"
          class="input"
          v-model="taskSelected.description"
        />
      </div>
    </template>
    <template v-slot:footer>
      <button class="button" @click="closeModal">Cancelar</button>
      <button class="button is-danger" @click="deleteTask">
        Excluir
      </button>
      <button class="button is-success" @click="updateTask">
        Atualizar
      </button>
    </template>
  </Modal>
  <FormTask @saveTask="saveTask" />
  <div class="list">
    <Box v-if="emptyTaskList"> Você não está muito produtivo hoje :( </Box>
    <div class="field">
      <p class="control has-icons-left">
        <input
          type="text"
          class="input"
          placeholder="Nome exato da tarefa"
          v-model="filter"
        />
        <span class="icon is-small is-left">
          <i class="fas fa-search"></i>
        </span>
      </p>
    </div>
    <Task
      v-for="(task, index) in tasks"
      :key="index"
      :task="task"
      @taskClicked="taskClicked"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from '@/store'
import { GET_TASKS, GET_PROJECTS, CREATE_TASK, UPDATE_TASK, DELETE_TASK } from '@/store/type-actions'
import Modal from '@/components/common/Modal.vue'
import FormTask from '@/components/tasks/FormTask.vue'
import Box from '@/components/common/Box.vue'
import Task from '@/components/tasks/Task.vue'
import ITask from '@/interfaces/ITask'

export default defineComponent({
  name: 'Tasks',

  components: {
    Modal,
    FormTask,
    Box,
    Task,
  },

  setup() {
    const store = useStore()

    store.dispatch(GET_TASKS)
    store.dispatch(GET_PROJECTS)

    return {
      store,
      tasks: computed(() => store.state.task.tasks),
    }
  },

  data() {
    return {
      taskSelected: null as ITask | null,
      filter: '',
    }
  },

  computed: {
    emptyTaskList(): boolean {
      return this.tasks && this.tasks.length === 0
    },
  },

  watch: {
    filter(value) {
      this.store.dispatch(GET_TASKS, value)
    },
  },

  methods: {
    saveTask(task: ITask) {
      this.store.dispatch(CREATE_TASK, task)
    },

    updateTask() {
      this.store
        .dispatch(UPDATE_TASK, this.taskSelected)
        .then(() => this.closeModal())
    },

    deleteTask() {
      this.store
        .dispatch(DELETE_TASK, this.taskSelected)
        .then(() => this.closeModal())
    },

    taskClicked(task: ITask) {
      this.taskSelected = task
    },

    closeModal() {
      this.taskSelected = null
    },
  },
})
</script>
