import { defineStore, acceptHMRUpdate } from 'pinia';
import { User } from '../interfaces/user'

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        user: null,
    }),

    getters: {
        isLoggedIn: (state) => !!state.user
    },

    actions: {
        async initAuth() {
            let user = this.user

            if (!user) {
                //const response = await $fetch('/api/user')
                //user = response.user
            }

            this.updateUser(user)
        },

        async login (payload) {
            // some login logic
        },

        async register (payload) {
            // some register logic
        },

        async logOut() {
            this.updateUser(null)
        },

        updateUser(payload) {
            this.user = payload
        }

    },
})
