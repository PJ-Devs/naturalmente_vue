import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Customer } from '../types'

export const useAuthUserStore = defineStore('authUser', {
  state: () => ({
    authUser: ref<Customer | null>(JSON.parse(localStorage.getItem('authUser') || 'null'))
  }),
  getters: {
    isLoggedIn: (state) => computed(() => state.authUser != null),
    getUser: (state) => state.authUser,
  },
  actions: {
    setUser(user: Customer | null) {
      if(user) {
        localStorage.setItem('authUser', JSON.stringify(user))
      }
      this.authUser = user
    },
    logout() {
      this.authUser = null
    }
  }
})