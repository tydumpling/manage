/**
 * @description 素材中心
 */

const route = [
  {
    path: '/material',
    meta: { title: '素材中心', i18nName: 'tadMaterialCenter', icon: 'editor' },
    name: 'Material',
    redirect: '/material/index',
    component: () => import('@/layout/index.vue'),
    children: [
      {
        path: 'index',
        meta: { title: '素材中心', i18nName: 'tadMaterialCenter', icon: 'editor' },
        name: 'MaterialIndex',
        component: () => import('@/views/material/index.vue')
      }
    ]
  }
]

export default route
