import { storeToRefs } from 'pinia';
import { useRoomsStore } from '../stores/roomsStore'
import axios from 'axios';
import { Room } from '../interfaces/room';
import { User } from '../interfaces/user';


const useRooms = () => {
    const roomsStore = useRoomsStore();
    
    
    const USERS_API='https://hotelapp.fastery.dev/v1/users'
    const EMPTY_ROOM_ID = '63bb8cbf9955aa3847ba6e7c'
    const BASE_API='https://hotelapp.fastery.dev/v1/rooms'
    
    const { rooms , queriedRooms , selectedRoom , error, loading, results, page, pages} = storeToRefs(roomsStore);
    //'/api/Rooms'
    const initializeRooms = async (selpage: number = 1) => {
      
        roomsStore.toggleLoading(true);
        try {
          roomsStore.loadRooms(await axios.get(BASE_API+'?limit=20&populate=users&page='+selpage))
          roomsStore.toggleLoading(false);
          
        } catch (err) {
          error.value = err;
          roomsStore.toggleLoading(false);
        }
        
    };

    const nextPage = async (actualpage:number) => {
      await initializeRooms(actualpage+1);
    }
    const prevPage = async (actualpage:number) => {
      await initializeRooms(actualpage-1);
    }


    const createRoom = async( payload ) =>{
        loading.value = true;
       
      

        try {
          await axios.post(BASE_API+'', payload ,{
            headers: {
              'Content-type':'application/json'
            }
          })
          initializeRooms(page.value);
          loading.value = false;
        } catch (err) {
          error.value = err;
          loading.value = false;
        }
        
    };


    const getRoomById = (id) => {
      roomsStore.getRoomById(id)
    };
    const filterByName = (querytext: string)=> roomsStore.filterByValue(querytext);

    const updateRoom = async( payload, id:string ) =>{
      loading.value = true;
      if(payload.imagesUrl) {
        if(payload.imagesUrl[0].size/1000 > 300) {
          loading.value = false;
          error.value = 'La imagen excede el peso máximo (300kB)'
          return;
          
        } 
  
      }
      
      try {
        await axios.patch(BASE_API+'/'+id, payload ,{
          headers: {
           
            'Content-type': payload.imagesUrl ? 'multipart/form-data' : 'application/json'
          }
        })
        initializeRooms(page.value);
        loading.value = false;
      } catch (err) {
        error.value = err;
        loading.value = false;
      }
      
  };

    const emptyRoom = async( roomid, users ) =>{
      loading.value = true;
      
      try {

        await axios.patch(BASE_API+'/'+roomid, {'users':[]} ,{
          headers: {
          
            'Content-type': 'application/json'
          }
        })
        initializeRooms(page.value);
        
        for(const user of users) {
    
          await axios.patch(USERS_API+'/'+user.id, 
          {
            'room': EMPTY_ROOM_ID
          }, 
          {
            headers: {
              'Content-type' :'application/json'
            }
          })
        }
        loading.value = false;
      } catch (err) {
        error.value = err;
        loading.value = false;
      }
      
    };

    const deleteRoom = async (id:string) => {
      loading.value = true;
      
      try {
        await axios.delete(BASE_API+'/'+id);
        loading.value = false;
        
        initializeRooms(page.value);

      } catch (err) {
        
        
        error.value = err;
        loading.value = false;
      }
      
      
    }
    return {
        // Properties
        rooms,
        queriedRooms,
        emptyRoom,
        selectedRoom,
        error,
        loading,
        results,
        page,
        pages,

        //methods
        createRoom,
        updateRoom,
        nextPage,
        prevPage,
        deleteRoom,
        initializeRooms,
        filterByName,
        getRoomById 

    }
}
export default useRooms;
