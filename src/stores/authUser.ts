import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Customer } from '@/types'

export const useAuthUserStore = defineStore('authUser', {
  state: () => ({
    authUser: ref<Customer | null>(null)
  }),
  getters: {
    isLoggedIn: (state) => computed(() => !!state.authUser),
    getUser: (state) => state.authUser,
  },
  actions: {
    setUser(user: Customer) {
      this.authUser = user
    },
    logout() {
      this.authUser = null
    }
  }
})