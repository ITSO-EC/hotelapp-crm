import axios from 'axios';
import { storeToRefs } from 'pinia';

import { Order } from '../interfaces/order';
import { useOrdersStore } from '../stores/ordersStore';

const BASE_API='https://hotelapp.fastery.dev/v1/'

const useOrders = () => {
    const ordersStore = useOrdersStore();
    
    
    const {orders, selectedOrder,error, loading, results, page, pages} = storeToRefs(ordersStore);


    const initializeAllOrders = async (page:number=1) => {
      loading.value = true;
      ordersStore.loadOrders(await axios.get(BASE_API+'orders?item=63937cc98320bc07c1b97ffa&populate=item,user&page='+page));
      loading.value =false;
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

    const editOrderStatus = async (payload:any) => {
      loading.value = true;
      
      try {
        await axios.patch(BASE_API+'orders/'+payload.id,
        {status : payload.status},
        {
          headers: {
            'Content-type':'application/json'
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
        editOrderStatus,
        deleteOrder,
        
        initializeAllOrders,
        getOrderById 

    }
}
export default useOrders;
