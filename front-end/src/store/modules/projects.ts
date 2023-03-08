import { Module } from 'vuex'
import http from "@/http";
import { State } from '@/store'
import IProject from '@/interfaces/IProject'
import { DEFINE_PROJECTS, REMOVE_PROJECT } from '@/store/type-mutations'
import { GET_PROJECTS, CREATE_PROJECT, UPDATE_PROJECT, DELETE_PROJECT } from '@/store/type-actions'

export interface StateProject {
  projects: IProject[]
}

export const project: Module<StateProject, State> = {
  mutations: {
    [DEFINE_PROJECTS](state, projects: IProject[]) {
      state.projects = projects
    },

    [REMOVE_PROJECT](state, id: number) {
      state.projects = state.projects.filter((proj) => proj.id !== id)
    },
  },

  actions: {
    [GET_PROJECTS]({ commit }) {
      http.get('projects')
        .then(response => commit(DEFINE_PROJECTS, response.data))
    },

    [CREATE_PROJECT](context, nameProject: string) {
      return http.post('/projects', {
        name: nameProject
      })
    },

    [UPDATE_PROJECT](context, project: IProject) {
      return http.put(`/projects/${project.id}`, project)
    },

    [DELETE_PROJECT]({ commit }, id: string) {
      return http.delete(`/projects/${id}`)
        .then(() => commit(REMOVE_PROJECT, id))
    },
  },
}
