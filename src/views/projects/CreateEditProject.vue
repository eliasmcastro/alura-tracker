<template>
  <section>
    <form @submit.prevent="save">
      <div class="field">
        <label for="nameProject" class="label">Nome do Projeto</label>
        <input
          type="text"
          id="nameProject"
          class="input"
          v-model="nameProject"
        />
      </div>
      <div class="field has-text-right">
        <router-link to="/projects" class="button">Cancelar</router-link>
        <button type="submit" class="button is-success ml-2">Salvar</button>
      </div>
    </form>
  </section>
</template>

<script lang="ts">
import { useStore } from '@/store'
import { defineComponent } from 'vue'
import { ADD_PROJECT, ALTER_PROJECT } from '@/store/type-mutations'
import { TypeNotification } from '@/interfaces/INotification'
import useNotifier from '@/hooks/notifier'

export default defineComponent({
  name: 'CreateEditProject',

  setup() {
    const store = useStore()
    const { notify } = useNotifier()

    return {
      store,
      notify,
    }
  },

  props: {
    id: {
      type: String,
    },
  },

  data() {
    return {
      nameProject: '',
    }
  },

  methods: {
    save() {
      if (this.id) {
        this.store.commit(ALTER_PROJECT, {
          id: this.id,
          name: this.nameProject,
        })
        this.notify(
          TypeNotification.SUCESSO,
          'Sucesso!',
          'O projeto foi atualizado com sucesso!',
        )
      } else {
        this.store.commit(ADD_PROJECT, this.nameProject)
        this.notify(
          TypeNotification.SUCESSO,
          'Sucesso!',
          'O projeto foi cadastrado com sucesso!',
        )
      }

      this.nameProject = ''
      this.$router.push('/projects')
    },
  },

  mounted() {
    if (this.id) {
      const project = this.store.state.projects.find(
        (project) => project.id == this.id,
      )
      this.nameProject = project?.name || ''
    }
  },
})
</script>
