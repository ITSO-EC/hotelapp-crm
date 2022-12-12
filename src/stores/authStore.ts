import { defineStore, acceptHMRUpdate } from 'pinia';
import { User } from '../interfaces/user'
interface AuthState {
    user?: User;
    loading: boolean;
    error: String;
    }
export const useAuthStore = defineStore({
    id: 'auth',
    state: (): AuthState => ({
        user: undefined ,
        error: '',
        loading: false,
    }),

    getters: {
    },

    actions: {
        loadUser(data) {
            try 
            {
                this.loading = true;
                  this.user = data; 
                  
                this.loading = false;
                
            } 
            catch (error) 
            {
                this.error = error;
                console.error(error);
            }
             
         },
  

        async logOut() {
            this.user = undefined
        },

    },
})
