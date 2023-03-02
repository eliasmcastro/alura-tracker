<template>
  <section>
    <div class="has-text-right">
      <router-link to="/projects/new" class="button">
        <span class="icon is-small">
          <i class="fas fa-plus"></i>
        </span>
        <span>Novo projeto</span>
      </router-link>
    </div>
    <table v-if="projects.length > 0" class="table is-fullwidth mt-3">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th class="has-text-centered">Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="project in projects" :key="project.id">
          <td>{{ project.id }}</td>
          <td>{{ project.name }}</td>
          <td class="has-text-centered">
            <button class="button is-danger" @click="deleteProject(project.id)">
              <span class="icon is-small">
                <i class="fas fa-trash"></i>
              </span>
            </button>
            <router-link
              :to="`/projects/${project.id}`"
              class="button is-warning ml-2"
            >
              <span class="icon is-small">
                <i class="fas fa-pencil-alt"></i>
              </span>
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-else class="has-text-centered">
      <hr />
      <p>Nenhum projeto cadastrado</p>
    </div>
  </section>
</template>

<script lang="ts">
import { useStore } from '@/store'
import { computed, defineComponent } from 'vue'
import { DELETE_PROJECT } from '@/store/type-mutations'
import { TypeNotification } from '@/interfaces/INotification'
import useNotifier from '@/hooks/notifier'

export default defineComponent({
  name: 'ListProjects',

  setup() {
    const store = useStore()
    const { notify } = useNotifier()

    return {
      projects: computed(() => store.state.projects),
      store,
      notify,
    }
  },

  methods: {
    deleteProject(id: string) {
      this.store.commit(DELETE_PROJECT, id)

      this.notify(
        TypeNotification.SUCESSO,
        'Sucesso!',
        'O projeto foi excluído com sucesso!',
      )
    },
  },
})
</script>
