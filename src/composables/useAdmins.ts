import axios from 'axios';
import { User } from '../interfaces/user'
import { storeToRefs } from 'pinia';
import { useAdminsStore } from '../stores/adminsStore'

const COMMON_API='https://hotelapp.fastery.dev/v1/users?sortBy=updatedAt:desc'
const BASE_API='https://hotelapp.fastery.dev/v1/'
const useAdmins = () => {
    const adminsStore = useAdminsStore();
    
    
    const {users, selectedUser,error, loading, results, page, pages} = storeToRefs(adminsStore);
    
    const initializeAdmins = async (page:number=1) => {
      loading.value = true;
      adminsStore?.loadAdmins(await axios.get(COMMON_API+'&role=admin&page='+page));
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
      const selectedUserx = users?.value?.find((user) => user.id == id);
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
            await initializeAdmins();
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
            await initializeAdmins();
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
          if(payload.file){
            let response = await axios.patch(BASE_API+'users/addImages/'+id, payload,
            {
              headers: {
                'Content-Type' : 'multipart/form-data'
              }
            })
            let userImages = response?.data.imageUrl;
            let response2 = await axios.patch(BASE_API+'users/'+id, {profileImageUrl: userImages[userImages.length - 1]} ,
            {
              headers: {
                'Content-Type' : 'application/json'
              }
            })
            adminsStore.loadAdmins(response2?.data)
            loading.value = false;
          }
          else{
            let response = await axios.patch(BASE_API+'users/'+id, payload,
            {
              headers: {
                'Content-Type' : 'application/json'
              }
            })
            adminsStore.loadAdmins(response?.data)
            loading.value = false;
          }
         
          
        }
        catch(err) {
          error.value = err.response.data.message;
          loading.value = false;
          
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
