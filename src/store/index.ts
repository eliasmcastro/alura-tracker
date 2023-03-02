import IProject from '@/interfaces/IProject'
import { createStore, Store, useStore as vuexUseStore } from 'vuex'
import { InjectionKey } from 'vue'
import * as tm from './type-mutations'
import { INotification } from '@/interfaces/INotification'

interface State {
  themeDarkActive: boolean,
  projects: IProject[]
  notifications: INotification[]
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    themeDarkActive: false,
    projects: [],
    notifications: [],
  },

  mutations: {
    [tm.ADD_PROJECT](state, nameProject: string) {
      const project = {
        id: new Date().toISOString(),
        name: nameProject,
      } as IProject
      state.projects.push(project)
    },

    [tm.ALTER_PROJECT](state, project: IProject) {
      const index = state.projects.findIndex((proj) => proj.id == project.id)
      state.projects[index] = project
    },

    [tm.DELETE_PROJECT](state, id: string) {
      state.projects = state.projects.filter((proj) => proj.id != id)
    },

    [tm.NOTIFY](state, newNotification: INotification) {
      newNotification.id = new Date().getTime()
      state.notifications.push(newNotification)

      setTimeout(() => {
        state.notifications = state.notifications.filter(
          (notification) => notification.id != newNotification.id,
        )
      }, 3000)
    },
  },
})

export function useStore(): Store<State> {
  return vuexUseStore(key)
}
