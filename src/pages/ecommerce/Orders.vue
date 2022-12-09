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

          <!-- Table -->
          <OrdersTable />

          <!-- Pagination -->
          <div class="mt-8">
            <PaginationClassic :items="orders.length" :results="results" :type="'orders'"/>
          </div>

        </div>
      </main>

    </div>

   
  </div>
</template>

<script setup>
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
import useOrders from "./../../composables/useOrders";
import useUsers from "../../composables/useUsers";

const newOrder = ref({
  title: 'Titulo',
  description: 'Una description',
  price: 20,
  user: '633e50cd1b2f918f140bea75',
  type: 'subscribed',
  file_url: ''

})
const succestoast = ref(false);
const { orders, results, loading, error,createOrder,initializeAllOrders } = useOrders();
const { users, selectedUser, initializeUsers} = useUsers();

const sidebarOpen = ref(false)
const orderModalOpen = ref(false);

const selectedFile = ref(null);
const fileInput = ref(null);
let formData = new FormData()

const form = ref(null);

initializeUsers();

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

</script>