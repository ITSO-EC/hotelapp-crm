<script setup>
//////////////////////////////////////////
//Import Component Dependencies
//////////////////////////////////////////
//Vue + Components
import { ref } from 'vue'
import Sidebar from '../../partials/Sidebar.vue'
import Header from '../../partials/Header.vue'
import Toast from '../../components/Toast.vue'
import DeleteButton from '../../partials/actions/DeleteButton.vue'
import DateSelect from '../../components/DateSelect.vue'
import FilterButton from '../../components/DropdownFilter.vue'
import OrdersTable from '../../partials/orders/OrdersTable.vue'
import PaginationClassic from '../../components/PaginationClassic.vue'
import ModalBasic from "../../components/ModalBasic.vue";

//Composables
import useOrders from "./../../composables/useOrders";
import useUsers from "../../composables/useUsers";

//////////////////////////////////////////
//Variables + Refs Init
//////////////////////////////////////////

//Composables Init
const { orders, results, loading, error,createOrder,initializeAllOrders } = useOrders();
const { users, selectedUser, initializeUsers} = useUsers();

//Refs Init
const sidebarOpen = ref(false)
const orderModalOpen = ref(false);
const succestoast = ref(false);
const selectedStatus = ref("")

const selectedFile = ref(null);
const fileInput = ref(null);
const form = ref(null);
const newOrder = ref({
  title: 'Titulo',
  description: 'Una description',
  price: 20,
  user: '633e50cd1b2f918f140bea75',
  type: 'subscribed',
  file_url: ''
})

//Variables
let formData = new FormData()


//////////////////////////////////////////
//Component Functionality 
//////////////////////////////////////////

//Core Actions - CRUD / Specific Actions
function onSelectedFile() {
  let file = fileInput.value.files;
  if (file != null) {
    let reader = new FileReader();
    reader.onload = (e) => {
      selectedFile.value = e.target.result;
    };
    
    reader.readAsDataURL(file[0]);
    
    newOrder.value.file_url = file[0]

  }
}

function resetFile() {
    selectedFile.value = null;
    newOrder.value = {
      title: 'Titulo',
      description: 'Una description',
      price: 20,
      user: '633e50cd1b2f918f140bea75',
      type: 'subscribed',
      file_url: ''
    }
    form.value.reset();
}

//Possible Required Hydration
initializeUsers();

</script>
<template>
  <div class="flex h-screen overflow-hidden" :key="orders.length">

    <!-- Sidebar -->
    <Sidebar :sidebarOpen="sidebarOpen" @close-sidebar="sidebarOpen = false" />

    <!-- Content area -->
    <div class="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

      <!-- Site header -->
      <Header :sidebarOpen="sidebarOpen" @toggle-sidebar="sidebarOpen = !sidebarOpen" />
      <Toast :type="'error'" :open="error?.response" @close-toast="error=null; succestoast = false" 
      class="fixed z-40 mt-16 w-1/3">{{error?.response?.data != null? error.response?.data?.message :'Error Desconocido'}}</Toast>

      <Toast :type="'success'" :open="!error && succestoast && !loading" 
      @close-toast="succestoast=false" class="fixed z-40 mt-16 w-1/3">
      Órden creada exitosamente.</Toast>
     
      <main>
        <div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

          <!-- Page header -->
          <div class="sm:flex sm:justify-between sm:items-center mb-8">

            <!-- Left: Title -->
            <div class="mb-4 sm:mb-0">
              <h1 class="text-2xl md:text-3xl text-slate-800 font-bold">Serv. Hab. 📝</h1>
            </div>

            <!-- Right: Actions  -->
            <div class="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
              <div></div>
            </div>

          </div>

          <!-- Filter Actions -->
          <div class="sm:flex sm:justify-between sm:items-center mb-5">

            <!-- Left Side Filters -->
            <div class="mb-4 sm:mb-0">
                <ul class="flex flex-wrap -m-1">
                    <li class="m-1">
                        <button 
                        @click="selectedStatus=''"
                        :class="selectedStatus=='' ? 'border-transparent shadow-sm bg-indigo-500 text-white ' :'border-slate-200 hover:border-slate-300 shadow-sm bg-white text-slate-500'"
                        class="inline-flex items-center justify-center 
                        text-sm font-medium leading-5 rounded-full px-3 py-1 border 
                        
                        duration-150 ease-in-out">Todos</button>
                    </li>
                    <li class="m-1">
                        <button 
                        :class="selectedStatus=='status=success' ? 'border-transparent shadow-sm bg-indigo-500 text-white ' :'border-slate-200 hover:border-slate-300 shadow-sm bg-white text-slate-500'"
                        
                        @click="selectedStatus='status=success'" 
                        class="inline-flex items-center justify-center 
                        text-sm font-medium leading-5 rounded-full px-3 py-1 border
                         
                           duration-150 ease-in-out">Pendientes</button>
                    </li>
                    <li class="m-1">
                        <button 
                        @click="selectedStatus='status=pending'"
                        :class="selectedStatus=='status=pending' ? 'border-transparent shadow-sm bg-indigo-500 text-white ' :'border-slate-200 hover:border-slate-300 shadow-sm bg-white text-slate-500'"
                        
                        class="inline-flex items-center justify-center 
                        text-sm font-medium leading-5 rounded-full px-3 py-1 border
                        duration-150 ease-in-out">Trabajando</button>
                    </li>
                    <li class="m-1">
                        <button 
                        @click="selectedStatus='status=finished'"
                        :class="selectedStatus=='status=finished' ? 'border-transparent shadow-sm bg-indigo-500 text-white ' :'border-slate-200 hover:border-slate-300 shadow-sm bg-white text-slate-500'"
                        
                        class="inline-flex items-center justify-center 
                        text-sm font-medium leading-5 rounded-full px-3 py-1 border
                        duration-150 ease-in-out">Resueltos</button>
                    </li>
                    <li class="m-1">
                        <button 
                        @click="selectedStatus='status=rejected'"
                        :class="selectedStatus=='status=rejected' ? 'border-transparent shadow-sm bg-indigo-500 text-white ' :'border-slate-200 hover:border-slate-300 shadow-sm bg-white text-slate-500'"
                        
                        class="inline-flex items-center justify-center 
                        text-sm font-medium leading-5 rounded-full px-3 py-1 border 
                        duration-150 ease-in-out">Cancelados</button>
                    </li>
                </ul>
            </div>


          </div>

          <!-- Orders Table -->
          <OrdersTable :status="selectedStatus" :key="selectedStatus"/>

          <!-- Pagination -->
          <div class="mt-8">
            <PaginationClassic :items="orders.length" :results="results" :type="'orders'"/>
          </div>

        </div>
      </main>

    </div>

   
  </div>
</template>
