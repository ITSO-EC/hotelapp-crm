import { defineStore} from 'pinia';
import { Room } from '../interfaces/room';


interface RoomsState {
    rooms: Room[];
    queriedRooms: Room[];
    selectedRoom: Object;
    loading: boolean;
    error: String;
    results: number;
    page: number;
    pages: number
}

export const useRoomsStore = defineStore({
    id: 'rooms',
    state: (): RoomsState => ({
        rooms: [] ,
        queriedRooms: [],
        selectedRoom: {},
        error: '',
        loading: false,
        results: 0,
        page:1,
        pages:1 
    }),
    getters: {
       
    },
    actions: {
        getRoomById(id) {
            
            this.selectedRoom = this.rooms.find((room) =>  room.id === id);
        },
        filterByValue (text) {
            this.queriedRooms = [...this.rooms];
            let sorted =  this.queriedRooms?.filter(o =>
             o["name"]?.toString().toLowerCase().includes(text?.toString().toLowerCase()));
            this.queriedRooms = sorted;
        },
        loadRooms(data) {
            try {   
                this.rooms = data.data.results;
                this.queriedRooms = data.data.results;
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
        async addRoom(room: Object): Promise<void> {
            this.loading = true;
            this.rooms.push(room);
            this.loading = false;
        },
        async deleteRoom(id: number): Promise<void> {
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

