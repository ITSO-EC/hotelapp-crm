import axios from 'axios';
import { storeToRefs } from 'pinia';

import { Order } from '../interfaces/order';
import { useOrdersStore } from '../stores/ordersStore';

const BASE_API='https://itso.ga/v1/'

const useOrders = () => {
    const ordersStore = useOrdersStore();
    
    
    const {orders, selectedOrder,error, loading, results, page, pages} = storeToRefs(ordersStore);


    const initializeAllOrders = async (page:number=1) => {
      loading.value = true;
      ordersStore.loadOrders(await axios.get(BASE_API+'orders?page='+page));  
      loading.value = false;
    }
    const retrieveOrdersByUser = async (userid:string) => {
      return await axios.get(BASE_API+'orders?user='+ userid +'&limit=100') 
    }

    const nextPage = async (actualpage:number) => {
      await initializeAllOrders(actualpage+1);
    }
    const prevPage = async (actualpage:number) => {
      await initializeAllOrders(actualpage-1);
    }
  
    const getOrderById = (id: string) => ordersStore.getOrderById(id);
    
    
    const createOrder = async (payload:Order) => {
      loading.value = true;
      
      try {
        await axios.post(BASE_API+'orders',{...payload},
        {
          headers: {
            'Content-type':'multipart/form-data'
          }
        })
        loading.value = false;
        initializeAllOrders(page.value)
      }
      catch(err) {
       
        error.value = err;
        loading.value = false;
      }
      
    };

      const deleteOrder = async (id:string) => {
        loading.value = true;
        
        try {
          await axios.delete(BASE_API+'orders/'+id);
          loading.value = false;
          
          initializeAllOrders(page.value);
  
        } catch (error) {
          console.error(error)
          
          error.value = error;
          loading.value = false;
        }
        
        
      }
  
    return {
        // Properties
        orders,
        selectedOrder,
        error,
        loading,
        results,
        page,
        pages,

        //methods
        createOrder,
        nextPage,
        prevPage,
        deleteOrder,
        retrieveOrdersByUser,
        initializeAllOrders,
        getOrderById 

    }
}
export default useOrders;
