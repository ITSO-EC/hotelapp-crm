import { defineStore} from 'pinia';
import { View } from '../interfaces/view';


interface ViewsState {
    views: View[];
    queriedViews: View[];
    selectedView: Object;
    loading: boolean;
    error: String;
    results: number;
    page: number;
    pages: number
}

export const useViewsStore = defineStore({
    id: 'views',
    state: (): ViewsState => ({
        views: [] ,
        queriedViews: [],
        selectedView: {},
        error: '',
        loading: false,
        results: 0,
        page:1,
        pages:1 
    }),
    getters: {
       
    },
    actions: {
        getViewById(id) {
            
            this.selectedView = this.views.find((view) =>  view.id === id);
        },
        filterByValue (text) {
            this.queriedViews = [...this.views];
            let sorted =  this.queriedViews?.filter(o =>
             o["name"]?.toString().toLowerCase().includes(text?.toString().toLowerCase()));
            this.queriedViews = sorted;
        },
        loadViews(data) {
            try {   
                this.views = data.data.results;
                this.queriedViews = data.data.results;
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
        async addView(view: Object): Promise<void> {
            this.loading = true;
            this.views.push(view);
            this.loading = false;
        },
        async deleteView(id: number): Promise<void> {
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

