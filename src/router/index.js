import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* 懒加载 */
import Layout from '@/layout'
/* 静态路由 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  }
]
/* 动态路由 */
export const asyncRoutes = [  
  // 公告
  {
      // 路径
      path: '/notice',
      // 对应的组件：Layout外面的部分
      component: Layout,
      // 重定向
      redirect: '/notice/shownotice',
      meta: { title: '通知', icon: 'el-icon-position' },
      //子路由
      children: [
        {
          path: '/notice/shownotice',
          // 懒加载
          component: () => import('@/views//notice/shownotice'),
          name: 'shownotice',
          meta: { title: '最新通知', icon: 'el-icon-position' }
        },
        {
          path: '/notice/changenotice',
          // 懒加载
          component: () => import('@/views//notice/changenotice'),
          name: 'changenotice',
          // 设置左侧栏的title,icon和所需要的权限，这里指必须是管理员才能访问
          meta: { title: '修改通知', icon: 'el-icon-position', roles: ['admin'] }
        }
      ]
  },
  // 选题
  {
    path: '/select',
    component: Layout,
    redirect: '/select/showselect',
    meta: { title: '论文选题', icon: 'edit' },
    children: [
      {
        path:'/selcet/errorselect',
        component: () => import('@/views//select/errorSelect'),
        name: 'errorSelect',
        meta: { title: '管理提交选题错误', icon: 'edit' ,roles: ['admin'] },
        hidden: true
      },
      {
        path: '/select/showselect',
        component: () => import('@/views//select/showselect'),
        name: 'showselect',
        meta: { title: '选题信息', icon: 'edit' }
      },
      {
        path: '/select/changeselect',
        component: () => import('@/views//select/addSelect'),
        name: 'changeselect',
        meta: { title: '提交选题', icon: 'edit', roles: ['teacher'] }
      },
      {
        path:'/select/myselect',
        component: () => import('@/views//select/mySelect'),
        name:'myselect',
        meta:{ title:'我的选题（教师）',icon:'edit',roles:['teacher']}
      }
    ]
  }, 
  // 个人信息
  {
    path: '/information',
    component: Layout,
    meta: { title: '个人信息', icon: 'user' },
    children: [
      {
        path: '/information/studentinformation',
        component: () => import('@/views//information/studentinformation'),
        name: 'studentinformation',
        meta: { title: '学生个人信息', icon: 'user', roles: ['student'] }
      },
      {
        path: '/information/teacherinformation',
        component: () => import('@/views//information/teacherinformation'),
        name: 'teacherinformation',
        meta: { title: '教师个人信息', icon: 'user', roles: ['teacher'] }
      },
      {
        path:'/information/errorinformation',
        component:() => import('@/views//information/adminStudent'),
        name:'errorinformation',
        meta:{ title:'管理员无法访问学生个人信息',roles:['admin']},
        hidden: true
      }
    ]
  },
  // 账号管理
  {
    path: '/account ',
    component: Layout,
    meta: { title: '账号管理', icon: 'peoples', roles: ['admin'] },
    children: [
      {
        path:'/account/studentAccount',
        component: () => import('@/views//account/studentAccount'),
        name:'accountManagement',
        meta: { title: '学生账号管理', icon: 'peoples', roles: ['admin']}
      },
      {
        path:'/account/teacherAccount',
        component: () => import('@/views//account/teacherAccount'),
        name:'accountManagement',
        meta: { title: '教师账号管理', icon: 'peoples', roles: ['admin']}
      }
    ]
  },
  // 404页面
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router
