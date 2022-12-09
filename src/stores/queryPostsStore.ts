import { defineStore} from 'pinia';
import { Post } from '../interfaces/post';

interface PostsState {
    posts: Post[];
    selectedPost: Object;
    loading: boolean;
    error: String;
    results: number;
    page: number;
    pages: number;
}

export const useQueryPostsStore = defineStore({
    id: 'queryposts',
    state: (): PostsState => ({
        posts: [] ,
        selectedPost: {},
        error: '',
        loading: false,
        results: 0,
        page:1,
        pages:1
    }),
    getters: {},
    actions: {
        getPostById(id: string) {
            this.selectedPost = this.posts?.find((post) => post.id == id);
            
        },
        loadPosts(data) {
            try {
                this.posts = data.data.results;
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
