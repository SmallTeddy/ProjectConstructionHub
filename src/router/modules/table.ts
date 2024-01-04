import type { RouteRecordRaw } from 'vue-router'

const UserLayout = () => import('@/views/layout/index.vue')

const table: RouteRecordRaw = {
  path: '/table',
  component: UserLayout,
  name: 'Table',
  meta: { title: 'table' },
  redirect: '/table/demo',
  children: [
    {
      path: 'demo',
      component: () => import('@/views/table/index.vue'),
      name: 'TableDemo',
      meta: { title: 'tableDemo' },
    },
  ],
}

export { table }
