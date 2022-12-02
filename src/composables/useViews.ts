import { storeToRefs } from 'pinia';
import { useViewsStore } from '../stores/viewsStore'
import axios from 'axios';
import { View } from '../interfaces/view';

const useViews = () => {
    const viewsStore = useViewsStore();
    
    const BASE_API='https://itso.ga/v1/'
    
    const { views , queriedViews , selectedView , error, loading, results, page, pages} = storeToRefs(viewsStore);
    //'/api/views'
    const initializeViews = async (selpage: number = 1) => {
      
        viewsStore.toggleLoading(true);
        try {
          viewsStore.loadViews(await axios.get(BASE_API+'pages?limit=8&page='+selpage))
          viewsStore.toggleLoading(false);
          
        } catch (err) {
          error.value = err;
          viewsStore.toggleLoading(false);
        }
        
    };

    const nextPage = async (actualpage:number) => {
      await initializeViews(actualpage+1);
    }
    const prevPage = async (actualpage:number) => {
      await initializeViews(actualpage-1);
    }


    const createView = async( payload ) =>{
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
          initializeViews(page.value);
          loading.value = false;
        } catch (err) {
          error.value = err;
          loading.value = false;
        }
        
    };


    const getViewById = (id) => {
      viewsStore.getViewById(id)
    };
    const filterByName = (querytext: string)=> viewsStore.filterByValue(querytext);

    const updateView = async( payload:View, id:string ) =>{
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
        initializeViews(page.value);
        loading.value = false;
      } catch (err) {
        error.value = err;
        loading.value = false;
      }
      
  };

    const deleteView = async (id:string) => {
      loading.value = true;
      
      try {
        await axios.delete(BASE_API+'pages/'+id);
        loading.value = false;
        
        initializeViews(page.value);

      } catch (err) {
        
        
        error.value = err;
        loading.value = false;
      }
      
      
    }
    return {
        // Properties
        views,
        queriedViews,
        selectedView,
        error,
        loading,
        results,
        page,
        pages,

        //methods
        createView,
        updateView,
        nextPage,
        prevPage,
        deleteView,
        initializeViews,
        filterByName,
        getViewById 

    }
}
export default useViews;
