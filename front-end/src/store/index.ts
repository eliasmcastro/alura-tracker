import { createStore, Store, useStore as vuexUseStore } from 'vuex'
import { InjectionKey } from 'vue'
import { NOTIFY } from './type-mutations'
import { INotification } from '@/interfaces/INotification'

import { StateProject, project } from './modules/projects'
import { StateTask, task } from './modules/tasks'

export interface State {
  project: StateProject
  task: StateTask
  notifications: INotification[]
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    project: {
      projects: [],
    },
    task: {
      tasks: [],
    },
    notifications: [],
  },

  mutations: {
    [NOTIFY](state, newNotification: INotification) {
      newNotification.id = new Date().getTime()
      state.notifications.push(newNotification)

      setTimeout(() => {
        state.notifications = state.notifications.filter(
          (notification) => notification.id != newNotification.id,
        )
      }, 3000)
    },
  },

  modules: {
    project,
    task,
  },
})

export function useStore(): Store<State> {
  return vuexUseStore(key)
}
