import { storeToRefs } from 'pinia';
import { useItemsStore } from '../stores/itemsStore'
import axios from 'axios';
import { Item } from '../interfaces/item';

const useItems = () => {
    const itemsStore = useItemsStore();
    
    const BASE_API='https://itso.ga/v1/'
    
    const { items , queriedItems , selectedItem , error, loading, results, page, pages} = storeToRefs(itemsStore);
    //'/api/Items'
    const initializeItems = async (selpage: number = 1) => {
      
        itemsStore.toggleLoading(true);
        try {
          itemsStore.loadItems(await axios.get(BASE_API+'pages?limit=8&page='+selpage))
          itemsStore.toggleLoading(false);
          
        } catch (err) {
          error.value = err;
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
       
        if(payload.image_url.size/1000 > 300) {
          loading.value = false;
          error.value = 'La imagen excede el peso máximo (300kB)'
          return;
          
        } 

        try {
          await axios.post(BASE_API+'pages', payload ,{
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

    const updateItem = async( payload:Item, id:string ) =>{
      loading.value = true;
      
      if(payload.image_url.size/1000 > 300) {
        loading.value = false;
        error.value = 'La imagen excede el peso máximo (300kB)'
        return;
        
      } 

      try {
        await axios.patch(BASE_API+'pages/'+id, payload ,{
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

    const deleteItem = async (id:string) => {
      loading.value = true;
      
      try {
        await axios.delete(BASE_API+'pages/'+id);
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
        initializeItems,
        filterByName,
        getItemById 

    }
}
export default useItems;
