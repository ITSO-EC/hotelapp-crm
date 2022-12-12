import axios from "axios";
import { storeToRefs } from "pinia";
import { User } from "../interfaces/user";
import {useRoute} from 'vue-router';
import { useAuthStore } from "../stores/authStore";
import Cookies from 'js-cookie'

const AUTH_API='https://hotelapp.fastery.dev/v1/auth/'
const BASE_API='https://hotelapp.fastery.dev/v1/'

const useAuth = () => {
  
  
    const authStore = useAuthStore();
    
    
    const { user, error, loading } = storeToRefs(authStore);
    
    const initializeAuth = async () => {
      loading.value = true;
      let uid = Cookies.get('user_id');
      let at = Cookies.get('access_token');
      if(uid && at)
      {
        let response = await axios.get(BASE_API+'/users/'+uid)
        authStore.loadUser(response.data)
       
      }
      loading.value = false;
    }

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
            await initializeAuth();
            loading.value = false;
          }
          else{
            let response = await axios.patch(BASE_API+'users/'+id, payload,
            {
              headers: {
                'Content-Type' : 'application/json'
              }
            })
          
            loading.value = false;
          }
         
          
        }
        catch(err) {
          error.value = err.response.data.message;
          loading.value = false;
          
          }
    };

    const login = async(payload:User) => {
        loading.value = true;
        try {
          const response = await axios.post(AUTH_API+'login', payload);
          authStore.loadUser(response?.data?.user);

          if(response.status == 200){
            let d = new Date(response?.data.tokens.access.expires)
            let e = new Date(response?.data.tokens.refresh.expires)
            document.cookie ="access_token=" + response?.data?.tokens?.access.token + ";" + "expires=" + d.toUTCString() + ";path=/";
            document.cookie ="user_id=" + response?.data?.user?.id + ";" + "expires=" + d.toUTCString() + ";path=/";
           
            document.cookie ="refresh_token=" + response?.data?.tokens?.refresh.token + ";" + "expires=" + e.toUTCString() + ";path=/";
          }
         
          loading.value = false;
          initializeAuth();
        }
        catch(err) {
          error.value = err.response.data;
          loading.value = false;
        }
     };

    const isLoggedIn = () => {
     return false;
      
    }

    const logout = async () => {
      authStore.loadUser(undefined);
      Cookies.remove('user_id')

    }
  
  
    return {
        // Properties
        user,
        error,
        loading,
        
        //methods
        login,
        isLoggedIn,
        editUser,
        initializeAuth,
    }
}
export default useAuth;
