import axios from 'axios';
import { User } from '../interfaces/user'
import { storeToRefs } from 'pinia';
import { useUsersStore } from '../stores/usersStore'

const BASE_API='https://itso.ga/v1/'
const useUsers = () => {
    const usersStore = useUsersStore();
    
    
    const {users, selectedUser,error, loading, results, page, pages} = storeToRefs(usersStore);

    const initializeUsers = async (page:number=1) => {
        loading.value = true;
        usersStore.loadUsers(await axios.get(BASE_API+'users?page='+page));
        loading.value = false;
    }

    const nextPage = async (actualpage:number) => {
      await initializeUsers(actualpage+1);
    }
    const prevPage = async (actualpage:number) => {
      await initializeUsers(actualpage-1);
    }

    const selectUserById = (id: string) => usersStore.getUserById(id);

    const retrieveUserById = (id: string) => {
      const selectedUserx = users.value?.find((user) => user.id == id);
      return selectedUserx;
    }

    const createUser = async(payload:User) => {
        loading.value = true;
        try {
          axios.post(BASE_API+'users', payload);
          initializeUsers()
          loading.value=false;
        } catch (error) {
          error.value = error;
          loading.value=false;
        }
        
      
      };

      const editUser = async(payload:User, id:string) => {
        loading.value = true;
        try {
          await axios.patch(BASE_API+'users/'+id, payload)
          loading.value = false;
          initializeUsers();
        }
        catch(err) {
          error.value = err.response.data.message;
          loading.value = false;
          
          initializeUsers()
        }
       };
  
      const deleteUser = async(id:string) => {
        loading.value = true;
        axios.delete(BASE_API+'users/'+id)
        .then(response => {
        initializeUsers()
        loading.value = false
        })
        .catch(err => {
          loading.value = false    
          error.value = err.response.data.message;
        });
      };
  
    return {
        // Properties
        users,
        selectedUser,
        error,
        loading,
        results,
        page,
        pages,

        //methods
        nextPage,
        prevPage,
        createUser,
        editUser,
        deleteUser,
        retrieveUserById,
        initializeUsers,
        selectUserById 

    }
}
export default useUsers;
