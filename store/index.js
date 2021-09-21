export const state = () => ({
  isAdmin: false,
  worker: null
})

export const mutations = {
  SET_AUTH (state, data) {
    state.isAdmin = data.isAdmin
    state.worker = data.worker
  },
  LOGOUT (state) {
    state.isAdmin = false
    state.worker = null
  }
}

export const actions = {
  setAuth (state, data) {
    state.commit('SET_AUTH', data)
  },
  logOut (state) {
    state.commit('LOGOUT')
  }
}
