/**
 * @description 系统中心
 */

const route = [
  {
    path: '/system',
    meta: { title: '系统中心', i18nName: 'tadSysManagement', icon: 'system' },
    name: 'System',
    redirect: '/system/params',
    component: () => import('@/layout/index.vue'),
    children: [
      {
        path: 'params',
        meta: { title: '系统参数', i18nName: 'tadSystemParam', icon: 'system' },
        name: 'SystemParams',
        component: () => import('@/views/system/user.vue')
      },
      {
        path: 'visit',
        meta: { title: '访问数据', i18nName: 'tadVisitData', icon: 'user' },
        name: 'SystemVisit',
        component: () => import('@/views/system/role.vue')
      }
    ]
  }
]

export default route
