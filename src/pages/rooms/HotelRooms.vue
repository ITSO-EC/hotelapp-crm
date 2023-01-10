<template>
  <div class="flex h-screen overflow-hidden">

    <!-- Sidebar -->
    <Sidebar :sidebarOpen="sidebarOpen" @close-sidebar="sidebarOpen = false" />

    <!-- Content area -->
    <div class="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
      <Toast :type="'error'" :open="error?.response" @close-toast="error=null; error1=null; succestoast = false" 
      class="fixed z-40 mt-16 w-1/3">{{error?.response?.data != null? error.response?.data?.message :''}}</Toast>

     
      <!-- Site header -->
      <Header :sidebarOpen="sidebarOpen" @toggle-sidebar="sidebarOpen = !sidebarOpen" />
      
      <main>
        <div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

          <!-- Page header -->
          <div class="sm:flex sm:justify-between sm:items-center mb-8">

            <!-- Left: Title -->
            <div class="mb-4 sm:mb-0">
              <h1 class="text-2xl md:text-3xl text-slate-800 font-bold">Habitaciones 
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="inline-block w-9 h-9">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
              </svg>
              </h1>
            </div>

            <!-- Right: Actions  -->
            <div class="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
              <!-- Search form -->
              <!-- <SearchForm /> -->
              <!-- Add member button -->
            
            </div>            

          </div>

          <div class="grid grid-cols-12 gap-6">
            <RoomTabs v-for="(room,i) in rooms" :key="i" :item="room" ></RoomTabs>
          </div>
        </div>
      </main>

    </div> 

    
  </div>
</template>

<script setup>
//////////////////////////////////////////
//Import Component Dependencies
//////////////////////////////////////////

//Vue + Components
import { ref,watch } from 'vue'
import Sidebar from '../../partials/Sidebar.vue'
import Header from '../../partials/Header.vue'
import RoomTabs from '../../partials/ecommerce/RoomTabs.vue'
import PaginationNumeric from '../../components/PaginationNumeric.vue'
import ModalBasic from '../../components/ModalBasic.vue'
import Toast from '../../components/Toast.vue'
import useUsers from '../../composables/useAdmins'
import { useRouter, useRoute } from 'vue-router'

//Composables
import useResources from '../../composables/useResources'

//Media
import DefaultImage from '../../images/user-avatar-80.png'

//////////////////////////////////////////
//Variables + Refs Init
//////////////////////////////////////////

//Vue Related Init
const router = useRouter();
const route = useRoute();

//Composables Init
const {getImage} = useResources()
const  { initializeAdmins, createUser, loading, users, error,results,page ,pages } = useUsers() 

//Refs Init
const sidebarOpen = ref(false);
const succestoast = ref(false);    
const registerModalOpen = ref(false);
const previewImage = ref(DefaultImage);
const rooms = ref([
  {
    //Individual estandar
    name: "Hab. Doble Estándar",
    image: "https://friendsquito.com/wp-content/uploads/2021/06/FRIENDS-9.jpg",
    description: "11/01/23",
    number: 102,
  }, 
  {
    //Individual estandar
    name: "Hab. Doble Estándar",
    image: "https://friendsquito.com/wp-content/uploads/2021/06/FRIENDS-9.jpg",
    description: "11/01/23",
    number: 103,
  },
  {
    //Apartamento
    name: "Departamento con Cocina",
    image:"https://friendsquito.com/wp-content/uploads/2021/06/FRIENDS-27-1.jpg",
    description: "11/01/23",
    number: 104,
  }, 
  {
    //Balcon Delux
    name: "Doble Superior con Balcón",
    image: "https://friendsquito.com/wp-content/uploads/2022/07/FRIENDS-29.jpg",
    description: "11/01/23",
    number: 105,
  }, 
  {
    //Balcon Delux
    name: "Doble Superior con Balcón",
    image: "https://friendsquito.com/wp-content/uploads/2022/07/FRIENDS-29.jpg",
    description: "11/01/23",
    number: 106,
  },  
  {
    //Twin Delux
    name: "Hab. Doble Twin",
    image:"https://friendsquito.com/wp-content/uploads/2022/03/DOBLESUP.jpg",
    description: "11/01/23",
    number: 107,
  }, 
  {
    //Individual estandar
    name: "Hab. Doble Estándar",
    image: "https://friendsquito.com/wp-content/uploads/2021/06/FRIENDS-9.jpg",
    description: "11/01/23",
    number: 108,
  }, 
  {
    //Doble delux
    name: "Hab. Doble Superior",
    image:"https://friendsquito.com/wp-content/uploads/2022/07/FRIENDS-40.jpg",
    description: "11/01/23",
    number: 109,

  },
  {
    //Doble delux
    name: "Hab. Doble Superior",
    image:"https://friendsquito.com/wp-content/uploads/2022/07/FRIENDS-40.jpg",
    description: "11/01/23",
    number: 110,

  },
  {
    //Twin Delux
    name: "Hab. Doble Twin",
    image:"https://friendsquito.com/wp-content/uploads/2022/03/DOBLESUP.jpg",
    description: "11/01/23",
    number: 111,
  },
  {
    //Doble delux
    name: "Hab. Doble Superior",
    image:"https://friendsquito.com/wp-content/uploads/2022/07/FRIENDS-40.jpg",
    description: "--/--/--",
    number: 112,

  },
  {
    //Doble delux
    name: "Hab. Doble Superior",
    image:"https://friendsquito.com/wp-content/uploads/2022/07/FRIENDS-40.jpg",
    description: "11/01/23",
    number: 113,

  },
  {
    //Doble delux
    name: "Hab. Doble Superior",
    image:"https://friendsquito.com/wp-content/uploads/2022/07/FRIENDS-40.jpg",
    description: "11/01/23",
    number: 114,

  }, 
  {
    //Twin Delux
    name: "Hab. Doble Twin",
    image:"https://friendsquito.com/wp-content/uploads/2022/03/DOBLESUP.jpg",
    description: "11/01/23",
    number: 115,
  },
  {
    //Doble delux
    name: "Hab. Doble Superior",
    image:"https://friendsquito.com/wp-content/uploads/2022/07/FRIENDS-40.jpg",
    description: "11/01/23",
    number: 116,

  },
  
  
  {
    //Individual estandar
    name: "Hab. Doble Estándar",
    image: "https://friendsquito.com/wp-content/uploads/2021/06/FRIENDS-9.jpg",
    description: "11/01/23",
    number: 118,
  }, 
  
  {
    //Individual estandar
    name: "Hab. Doble Estándar",
    image: "https://friendsquito.com/wp-content/uploads/2021/06/FRIENDS-9.jpg",
    description: "11/01/23",
    number: 119,
  }
])


  //Register Modal Errors
const registerErrors = ref({
  imageFormat: true,
  imageSize: true,
  name: true,
  mail: true,
  cellphone: true,
  password: true,
  passwordValid: true,
  passwordConfirm: true,
})

//////////////////////////////////////////
//Component Functionality 
//////////////////////////////////////////

//Core Actions - CRUD / Specific Actions


// Register Form Validation

//Utils - UI / Parsing / Any Other Un-Specific Component Action

//Possible Required Hydration
initializeAdmins()

</script>
