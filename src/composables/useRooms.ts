import { storeToRefs } from 'pinia';
import { useRoomsStore } from '../stores/roomsStore'
import axios from 'axios';
import { Room } from '../interfaces/room';

const useRooms = () => {
    const roomsStore = useRoomsStore();
    
    const BASE_API='https://hotelapp.fastery.dev/v1/rooms'
    
    const { rooms , queriedRooms , selectedRoom , error, loading, results, page, pages} = storeToRefs(roomsStore);
    //'/api/Rooms'
    const initializeRooms = async (selpage: number = 1) => {
      
        roomsStore.toggleLoading(true);
        try {
          roomsStore.loadRooms(await axios.get(BASE_API+'?limit=8&page='+selpage))
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
       
        if(payload.image_url.size/1000 > 300) {
          loading.value = false;
          error.value = 'La imagen excede el peso máximo (300kB)'
          return;
          
        } 

        try {
          await axios.post(BASE_API+'', payload ,{
            headers: {
              'Content-type':'multipart/form-data'
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
