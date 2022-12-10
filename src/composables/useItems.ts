import { storeToRefs } from 'pinia';
import { useItemsStore } from '../stores/itemsStore'
import axios from 'axios';
import { Item } from '../interfaces/item';

const useItems = () => {
    const itemsStore = useItemsStore();
    
    const BASE_API='https://hotelapp.fastery.dev/v1/'
    
    const { items , queriedItems , selectedItem , error, loading, results, page, pages} = storeToRefs(itemsStore);
    //'/api/Items'
    const initializeItems = async (selpage: number = 1) => {
      
        itemsStore.toggleLoading(true);
        try {
          itemsStore.loadItems(await axios.get(BASE_API+'items?&page='+selpage))
          itemsStore.toggleLoading(false);
          
        } catch (err) {
          error.value = err;
          itemsStore.toggleLoading(false);
        }
        
    };

    const getBreakfast = async (selpage: number = 1) => {
      
      itemsStore.toggleLoading(true);
      
      try {
        return await axios.get(BASE_API+'items?name=Desayuno')
        
      } catch (err) {
        error.value = err;
        return err;
         
      }
      finally {
        itemsStore.toggleLoading(false);
      }
      
  };
  const getWifi = async (selpage: number = 1) => {
      
    itemsStore.toggleLoading(true);
    
    try {
      return await axios.get(BASE_API+'items?name=WifiCode')
      
    } catch (err) {
      error.value = err;
      return err;
       
    }
    finally {
      itemsStore.toggleLoading(false);
    }
    
};
const getDoorKey = async (selpage: number = 1) => {
      
  itemsStore.toggleLoading(true);
  
  try {
    return await axios.get(BASE_API+'items?name=DoorKey')
    
  } catch (err) {
    error.value = err;
    return err;
     
  }
  finally {
    itemsStore.toggleLoading(false);
  }
  
};
    const nextPage = async (actualpage:number) => {
      await initializeItems(actualpage+1);
    }
    const prevPage = async (actualpage:number) => {
      await initializeItems(actualpage-1);
    }


    const createItem = async( payload ) =>{
        loading.value = true;
       

        try {
          await axios.post(BASE_API+'items', payload ,{
            headers: {
              'Content-type':'multipart/form-data'
            }
          })
          initializeItems(page.value);
          loading.value = false;
        } catch (err) {
          error.value = err;
          loading.value = false;
        }
        
    };


    const getItemById = (id) => {
      itemsStore.getItemById(id)
    };
    const filterByName = (querytext: string)=> itemsStore.filterByValue(querytext);

    const updateItem = async( payload, id:string ) =>{
      loading.value = true;
      

      try {
        await axios.patch(BASE_API+'items/'+id, payload ,{
          headers: {
            'Content-type':'application/json'
          }
        })
        initializeItems(page.value);
        loading.value = false;
      } catch (err) {
        error.value = err;
        loading.value = false;
      }
      
  };

    const deleteItem = async (id:string) => {
      loading.value = true;
      
      try {
        await axios.delete(BASE_API+'items/'+id);
        loading.value = false;
        
        initializeItems(page.value);

      } catch (err) {
        
        
        error.value = err;
        loading.value = false;
      }
      
      
    }
    return {
        // Properties
        items,
        queriedItems,
        selectedItem,
        error,
        loading,
        results,
        page,
        pages,

        //methods
        createItem,
        updateItem,
        nextPage,
        prevPage,
        deleteItem,
        getBreakfast,
        getWifi,
        getDoorKey,
        initializeItems,
        filterByName,
        getItemById 

    }
}
export default useItems;
