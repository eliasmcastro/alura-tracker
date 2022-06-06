<template>
  <main class="columns is-gapless is-multiline" :class="{ 'theme-dark': themeDarkActive }">
    <div class="column is-one-quarter">
      <Sidebar @themeChange="changeTheme"/>
    </div>
    <div class="column is-three-quarter content">
      <FormTask @saveTask="saveTask"/>
      <div class="list">
        <Task v-for="(task, index) in tasks" :key="index" :task="task"/>
        <Box v-if="emptyTaskList">
          Você não está muito produtivo hoje :(
        </Box>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Sidebar from './components/Sidebar.vue'
import FormTask from './components/FormTask.vue'
import Task from './components/Task.vue'
import Box from './components/Box.vue'
import ITask from './interfaces/ITask'

export default defineComponent({
  name: 'App',
  
  components: {
    Sidebar,
    FormTask,
    Task,
    Box
  },

  data () {
    return {
      tasks: [] as ITask[],
      themeDarkActive: false
    }
  },

  computed: {
    emptyTaskList () : boolean {
      return this.tasks.length === 0
    }
  },

  methods: {
    changeTheme (themeDarkActive: boolean) {
      this.themeDarkActive = themeDarkActive
    },

    saveTask (task: ITask) {
      this.tasks.push(task)
    }    
  }
});
</script>

<style>
main {
  --bg-primary: #fff;
  --text-primary: #000;
}

main.theme-dark {
  --bg-primary: #2b2d42;
  --text-primary: #ddd;
}

.content {
  background-color: var(--bg-primary);
}

.list {
  padding: 1.25rem;
}
</style>
