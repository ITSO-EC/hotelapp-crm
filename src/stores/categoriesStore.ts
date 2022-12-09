import { defineStore, acceptHMRUpdate } from 'pinia';
import { Category } from '../interfaces/category';

interface CategoriesState {
    categories: Category[];
    selectedCategory: {};
    loading: boolean;
    error: String;
    results: number;
    page: number;
    pages: number;
}

export const useCategoriesStore = defineStore({
    id: 'categories',
    state: (): CategoriesState => ({
        categories: [] ,
        selectedCategory: {},
        error: '',
        loading: false,
        results: 0,
        page:1,
        pages: 1
    }),
    getters: {
        
    },
    actions: {
        getCategoryById(id: string) {
            this.selectedCategory = this.categories?.find((category) => category.id == id);
            
        },
        loadCategories(data) {
           try {
                this.categories = data.data.results;
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
