import { asyncRoutes, constantRoutes } from '@/router'
import { getMenu } from '@/api/menu'
import Layout from '@/layout'

// const _import = require('@/router/_import_' + process.env.NODE_ENV)//获取组件的方法
/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    console.log(roles.some(role => route.meta.roles.includes(role)));
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []
  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

function settingAsyncRoutes(routes){
  const res = []
  routes.forEach(route => {
    const tmp = { ...route }
    if (tmp.component) {
      
      if (tmp.component === 'Layout') {//Layout组件特殊处理
        tmp.component = Layout
      } else {
        const map = {
          component : require(`@/views/${tmp.component}`).default
          //component : () => import(`@/views/${tmp.component}`)      // 异步的方式(有错误，原因待定)
         }
         tmp.component = map.component
      }
    }
    if (tmp.children && tmp.children.length) {
      tmp.children = settingAsyncRoutes(tmp.children)
    }
    res.push(tmp)
  })
  return res
}

const actions = {
  generateRoutes({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
     const roles_id = userInfo.roles_id  
      getMenu({roles_id: roles_id}).then(response => {
        console.log('response====>>>' , response);
        if(response.errcode != 0 || !response.menu){
          reject('加载菜单失败.')
        }
        const accessedRoutes = settingAsyncRoutes(response.menu)
        commit('SET_ROUTES', accessedRoutes)
        resolve(accessedRoutes)
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
