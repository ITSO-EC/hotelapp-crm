import { defineStore, acceptHMRUpdate } from 'pinia';
import { User } from '../interfaces/user';

interface UsersState {
    users: User[];
    selectedUser: {};
    loading: boolean;
    error: String;
    results: number;
    page: number;
    pages: number
}

export const useUsersStore = defineStore({
    id: 'users',
    state: (): UsersState => ({
        users: [] ,
        selectedUser: {},
        error: '',
        loading: false,
        results: 0,
        page:1,
        pages:1
    }),
    getters: {
        
    },
    actions: {
        getUserById(id: string) {
            this.selectedUser = this.users?.find((user) => user.id == id);
        },

        loadUsers(data) {
           try {
                this.users = data.data.results;
                this.results = data.data.totalResults;
                this.page = data.data.page;
                
                this.pages = data.data.totalPages;
           } catch (error) {
                this.error = error;
                console.error(error);
           }
            
        },
    }
});
