import axios from 'axios';
import { User } from '../interfaces/user'
import { storeToRefs } from 'pinia';
import { useUsersStore } from '../stores/usersStore'
import { ref } from 'vue';

const BASE_API='https://hotelapp.fastery.dev/v1/'
const useUsers = () => {
    const usersStore = useUsersStore();
    
    const newUserId = ref('');
    const {users, selectedUser,error, loading, results, page, pages} = storeToRefs(usersStore);

    const initializeUsers = async (page:number=1) => {
        loading.value = true;
        usersStore?.loadUsers(await axios.get(BASE_API+'users?populate=room&role=user&page='+page));
        loading.value = false;
    }

    const initializeClients = async (page:number=1) => {
      loading.value = true;
      usersStore.loadUsers(await axios.get(BASE_API+'users?populate=room&role=user&page='+page));
      loading.value = false;
    }
  
    const nextPage = async (actualpage:number) => {
      await initializeClients(actualpage+1);
    }
    const prevPage = async (actualpage:number) => {
      await initializeClients(actualpage-1);
    }

    const selectUserById = (id: string) => usersStore.getUserById(id);

    const retrieveUserById = (id: string) => {
      const selectedUserx = users.value?.find((user) => user.id == id);
      return selectedUserx;
    }

    const createUser = async(payload:User) => {
        loading.value = true;
        try {
          await axios.post(BASE_API+'users', payload).then((res)=> newUserId.value = res.data.id)
          loading.value = false;
          await initializeClients()

        
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
          initializeClients();
        }
        catch(err) {
          error.value = err.response.data.message;
          loading.value = false;
          
          initializeClients()
        }
    };
  
    const deleteUser = async(id:string) => {
        loading.value = true;
        axios.delete(BASE_API+'users/'+id)
        .then(response => {
        loading.value = false;
        initializeClients()
        })
        .catch(err => {
          loading.value = false    
          error.value = err.response.data.message;
        });
    };

    const addImage = async(payload, userid) => {
      await axios.patch(BASE_API+'users/addImages/'+userid,payload,
      {
        headers: {
          'Content-Type' : 'multipart/form-data'
        }
      })
      await initializeClients();
    }
    const deleteImage = async(imagestr, userid) => {
      await axios.patch(BASE_API+'users/deleteImages/'+userid,
      {
        file: imagestr
      },
      {
        headers: {
          'Content-Type' : 'application/json'
        }
      })
      await initializeClients();
    }
  
  
    return {
        // Properties
        users,
        selectedUser,
        newUserId,
        error,
        loading,
        results,
        page,
        pages,

        //methods
        nextPage,
        addImage,
        deleteImage,
        prevPage,
        createUser,
        editUser,
        deleteUser,
        retrieveUserById,
        initializeUsers,
        initializeClients,
        selectUserById 

    }
}
export default useUsers;
