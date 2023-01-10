import axios from 'axios';
import { User } from '../interfaces/user'
import { storeToRefs } from 'pinia';
import { useUsersStore } from '../stores/usersStore'
import { ref } from 'vue';

const COMMON_API='https://hotelapp.fastery.dev/v1/users?sortBy=updatedAt:desc';
const BASE_API='https://hotelapp.fastery.dev/v1/';

const useUsers = () => {
    const usersStore = useUsersStore();
    
    const newUserId = ref('');
    const {users, selectedUser,error, loading, results, page, pages} = storeToRefs(usersStore);

    const initializeUsers = async (page:number=1) => {
        loading.value = true;
        usersStore?.loadUsers(await axios.get(COMMON_API+'&populate=room&role=user&page='+page));
        loading.value = false;
    }

    const initializeClients = async (page:number=1) => {
      loading.value = true;
      usersStore.loadUsers(await axios.get(COMMON_API+'&populate=room&role=user&page='+page));
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

        if(!payload.file) {
            
          await axios.post(BASE_API+'users', payload, 
          {
            headers:{
              'Content-Type': 'application/json'
            }
          });
          await initializeClients();
          loading.value = false;
        }
        else {
          let response = await axios.post(BASE_API+'users', payload, 
          {
            headers:{
              'Content-Type': 'multipart/form-data'
            }
          });
          let userImages = response?.data.imageUrl;
          let response2 = await axios.patch(BASE_API+'users/'+response?.data.id, {profileImageUrl: userImages[userImages.length - 1]} ,
          {
            headers: {
              'Content-Type' : 'application/json'
            }
          })
          await initializeClients();
          loading.value = false;
        }

        
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
    const deleteImage = async(imagestr:string[], userid) => {
     
      let headersList = {
        "Accept": "/",
        
       }
       
       let formdata = new FormData();
       formdata.append("files", JSON.stringify([imagestr[0]]));
       
       let bodyContent =  formdata;
       
       let reqOptions = {
         url: "https://hotelapp.fastery.dev/v1/users/deleteImages/"+userid,
         method: "PATCH",
         headers: headersList,
         data: bodyContent,
       }
       
      await axios.request(reqOptions);
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
