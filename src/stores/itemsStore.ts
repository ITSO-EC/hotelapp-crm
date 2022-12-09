import { defineStore} from 'pinia';
import { Item } from '../interfaces/item';


interface ItemsState {
    items: Item[];
    queriedItems: Item[];
    selectedItem: Object;
    loading: boolean;
    error: String;
    results: number;
    page: number;
    pages: number
}

export const useItemsStore = defineStore({
    id: 'items',
    state: (): ItemsState => ({
        items: [] ,
        queriedItems: [],
        selectedItem: {},
        error: '',
        loading: false,
        results: 0,
        page:1,
        pages:1 
    }),
    getters: {
       
    },
    actions: {
        getItemById(id) {
            
            this.selectedItem = this.items.find((item) =>  item.id === id);
        },
        filterByValue (text) {
            this.queriedItems = [...this.items];
            let sorted =  this.queriedItems?.filter(o =>
             o["name"]?.toString().toLowerCase().includes(text?.toString().toLowerCase()));
            this.queriedItems = sorted;
        },
        loadItems(data) {
            try {   
                this.items = data.data.results;
                this.queriedItems = data.data.results;
                this.results = data.data.totalResults;
                this.page = data.data.page;
                
                this.pages = data.data.totalPages;
                
            } catch (error) {
                console.error(error)
                this.error = error;
            }
            
               
        },
        toggleLoading( status: boolean ) {
            this.loading = status;
        },
        async addItem(item: Object): Promise<void> {
            this.loading = true;
            this.items.push(item);
            this.loading = false;
        },
        async deleteItem(id: number): Promise<void> {
            this.loading = true;
            this.posts = this.posts.filter((post) => post.id !== id);
            this.loading = false;
        },
        async updatePost(id: number): Promise<void> {
            // this.loading = true;
            // const post = this.posts.find((post) => post.id === id);

            // if (post) {
            //     post.done = !post.done;
            // }

            // await sleep(1000);
            // this.loading = false;
        },
    }
});

