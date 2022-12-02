import { defineStore, acceptHMRUpdate } from 'pinia';
import { Order } from '../interfaces/order';

interface OrdersState {
    orders: Order[];
    selectedOrder: {};
    loading: boolean;
    error: String;
    results: number;
    page: number;
    pages: number;
}

export const useOrdersStore = defineStore({
    id: 'orders',
    state: (): OrdersState => ({
        orders: [] ,
        selectedOrder: {},
        error: '',
        loading: false,
        results: 0,
        page:1,
        pages: 1
    }),
    getters: {
        
    },
    actions: {
        getOrderById(id: string) {
            this.selectedOrder = this.orders?.find((order) => order.id == id);
            
        },
        loadOrders(data) {
           try {
                this.orders = data.data.results;
                this.results = data.data.totalResults;
                this.page = data.data.page;
                this.pages = data.data.totalPages;
           } catch (error) {
                this.error = error;
                console.error(error);
           }
            
        },
    }
});
