import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import Tasks from '@/views/tasks/Tasks.vue'
import Projects from '@/views/projects/Projects.vue'
import CreateEditProject from '@/views/projects/CreateEditProject.vue'
import ListProjects from '@/views/projects/ListProjects.vue'

const routes: RouteRecordRaw[] = [
  {
    name: 'Tasks',
    path: '/',
    component: Tasks,
  },
  {
    name: 'Projects',
    path: '/projects',
    component: Projects,
    children: [
      {
        name: 'ListProjects',
        path: '',
        component: ListProjects,
      },
      {
        name: 'CreateProject',
        path: 'new',
        component: CreateEditProject,
      },
      {
        name: 'EditProject',
        path: ':id',
        component: CreateEditProject,
        props: true,
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
