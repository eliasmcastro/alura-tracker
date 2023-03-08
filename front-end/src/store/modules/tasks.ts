import { Module } from 'vuex'
import http from '@/http'
import { State } from '@/store'
import ITask from '@/interfaces/ITask'
import { DEFINE_TASKS, ADD_TASK, ALTER_TASK, REMOVE_TASK } from '@/store/type-mutations'
import { GET_TASKS, CREATE_TASK, UPDATE_TASK, DELETE_TASK } from '@/store/type-actions'

export interface StateTask {
  tasks: ITask[]
}

export const task: Module<StateTask, State> = {  
  mutations: {
    [DEFINE_TASKS](state, tasks: ITask[]) {
      state.tasks = tasks
    },

    [ADD_TASK](state, task: ITask) {
      state.tasks.push(task)
    },

    [ALTER_TASK](state, task: ITask) {
      const index = state.tasks.findIndex((t) => t.id == task.id)
      state.tasks[index] = task
    },

    [REMOVE_TASK](state, id: number) {
      state.tasks = state.tasks.filter((task) => task.id !== id)
    },
  },

  actions: {
    [GET_TASKS]({ commit }, filter: string) {
      let url = 'tasks'

      if (filter) {
        url += '?description=' + filter
      }

      http.get(url).then((response) => commit(DEFINE_TASKS, response.data))
    },

    [CREATE_TASK]({ commit }, task: ITask) {
      return http
        .post('/tasks', task)
        .then((resposta) => commit(ADD_TASK, resposta.data))
    },

    [UPDATE_TASK]({ commit }, task: ITask) {
      return http
        .put(`/tasks/${task.id}`, task)
        .then(() => commit(ALTER_TASK, task))
    },

    [DELETE_TASK]({ commit }, task: ITask) {
      return http
        .delete(`/tasks/${task.id}`)
        .then(() => commit(REMOVE_TASK, task.id))
    },
  },
}
