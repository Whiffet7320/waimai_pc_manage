import { login, logout, getInfo } from '@/api/user'
import { setCookieJwt, getCookieJwt, removeCookieJwt  } from '@/utils/auth'
import router, { resetRouter } from '@/router'

const state = {
  jwt: getCookieJwt(),
  name: '',
  avatar: '',
  introduction: '',
  roles: [],
  roles_id: 0,
  admin_id: 0
}

const mutations = {
  SET_JWT: (state, jwt) => {
    state.jwt = jwt
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_ADMIN_ID: (state, admin_id) => {
    state.admin_id = admin_id
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_ROLES_ID: (state, roles_id) => {
    state.roles_id = roles_id
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const data = response
        console.log(data.jwt);
        commit('SET_JWT', data.jwt)
        setCookieJwt(data.jwt)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo().then(response => {
        if (!response) {
          reject('验证失败，请重新登录')
        }
        if(response.errcode !== 0){
          reject(response.errmsg)
        }
     
        var roles = response.user.roles;
        var roles_id = response.user.roles_id;
        // roles must be a non-empty array
        if (!roles || roles.length <= 0) {
          reject('getInfo: roles must be a non-null array!')
        }
        
        commit('SET_ADMIN_ID', response.user.id)
        commit('SET_ROLES', roles)
        commit('SET_ROLES_ID',roles_id)
        commit('SET_NAME', response.user.username)
        commit('SET_AVATAR', 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif')
        commit('SET_INTRODUCTION', '测试管理员')
        resolve(response.user)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise(resolve => {
        commit('SET_JWT', '')
        commit('SET_ROLES', [])
        removeCookieJwt()
        resetRouter()
        dispatch('tagsView/delAllViews', null, { root: true })
        resolve()
    })
  },

  // remove jwt
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_JWT', '')
      commit('SET_ROLES', [])
      removeCookieJwt()
      resolve()
    })
  },

  // dynamically modify permissions
  changeRoles({ commit, dispatch }, role) {
    return new Promise(async resolve => {
      const token = role + '-token'

      commit('SET_JWT', token)
      setCookieJwt(data.jwt)
      const { roles } = await dispatch('getInfo')
      const {roles_id} =  await dispatch('getInfo')
      resetRouter()
      // generate accessible routes map based on roles
      const accessRoutes = await dispatch('permission/generateRoutes', roles, roles_id,{ root: true })

      // dynamically add accessible routes
      router.addRoutes(accessRoutes)

      // reset visited views and cached views
      dispatch('tagsView/delAllViews', null, { root: true })

      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
