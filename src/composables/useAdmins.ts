import axios from 'axios';
import { User } from '../interfaces/user'
import { storeToRefs } from 'pinia';
import { useAdminsStore } from '../stores/adminsStore'

const BASE_API='https://hotelapp.fastery.dev/v1/'
const useAdmins = () => {
    const adminsStore = useAdminsStore();
    
    
    const {users, selectedUser,error, loading, results, page, pages} = storeToRefs(adminsStore);
    
    const initializeAdmins = async (page:number=1) => {
      loading.value = true;
      adminsStore?.loadAdmins(await axios.get(BASE_API+'users?role=admin&page='+page));
      loading.value = false;
    }
    const nextPage = async (actualpage:number) => {
      await initializeAdmins(actualpage+1);
    }
    const prevPage = async (actualpage:number) => {
      await initializeAdmins(actualpage-1);
    }

    const selectUserById = (id: string) => adminsStore.getUserById(id);

    const retrieveUserById = (id: string) => {
      const selectedUserx = users.value?.find((user) => user.id == id);
      return selectedUserx;
    }

    const createUser = async(payload:User) => {
        loading.value = true;
        try {
          await axios.post(BASE_API+'users', payload);
          loading.value = false;
          initializeAdmins()
        } catch (err) {
          error.value = err.response.data.message;
          loading.value=false;
        }
        
      
      };

      const editUser = async(payload:User, id:string) => {
        loading.value = true;
        try {
          await axios.patch(BASE_API+'users/'+id, payload)
          loading.value = false;
          initializeAdmins();
        }
        catch(err) {
          error.value = err.response.data.message;
          loading.value = false;
          
          initializeAdmins()
        }
       };
  
      const deleteUser = async(id:string) => {
        loading.value = true;
        axios.delete(BASE_API+'users/'+id)
        .then(response => {
        loading.value = false;
        initializeAdmins()
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
        initializeAdmins,
        selectUserById 

    }
}
export default useAdmins;
