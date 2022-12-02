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
              <!-- Delete button -->
              <!-- <DeleteButton :selectedItems="selectedItems" /> -->
              <!-- Dropdown -->
              <!-- <DateSelect /> -->
              <!-- Filter button -->
              <!-- <FilterButton align="right" /> -->
              <!-- Add order button -->
              <button @click.stop="orderModalOpen=true" class="btn bg-indigo-500 hover:bg-indigo-600 text-white">
                <svg class="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
                  <path
                    d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                </svg>
                <span class="hidden xs:block ml-2" >Nueva Orden</span>
              </button>
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

    <!-- CreateOrders -->
    <ModalBasic :modalOpen="orderModalOpen" @close-modal="orderModalOpen = false" title="Crear Órden">
      <!-- Modal content -->
      <div class="px-5 pt-4 pb-1">
        <div class="text-sm">
          <div class="font-medium text-slate-800 mb-2">
            Registre los datos de la orden que desee registrar manualmente.
          </div>
          <div class="space-y-2 grid grid-cols-1 sm:grid-cols-2 gap-4">


            <!-- Start -->
            <div>
              <label class="block text-sm font-medium mb-1 mt-2" for="title">Título</label>
              <input v-model="newOrder.title" id="title" class="form-input w-full" type="text" />
            </div>
           


            <!-- Start -->
            <div>
              <label class="block text-sm font-medium mb-1" for="user">Id Emisor</label>
              <input v-model="newOrder.user" id="user" class="form-input w-full" type="text" />
            </div>

            
           
            <!-- Start -->
            <div>
              <label class="block text-sm font-medium mb-1" for="type">Tipo</label>
              <select id="type" class="form-select w-full" v-model="newOrder.type">
                <option value="subscribed">Suscripcion</option>
                <option value="refunded">Reclamo</option>  
              </select>

            </div>

            <!-- Start -->
            <div>
              <label class="block text-sm font-medium mb-1" for="description">
                Mensaje
              </label>
              <input id="description" class="form-input w-full" type="text" v-model="newOrder.description" />
            </div>

            <!-- Start -->
            <div>
              <label class="block text-sm font-medium mb-1" for="price">Cantidad ($USD)</label>
              <input id="price" class="form-input w-full" type="text" placeholder="$##.##" v-model="newOrder.price"/>
            </div>


            <!-- file-->
            <form ref="form">
              <label class="block text-sm font-medium mb-1" for="file">Archivo</label>
            
              <input ref='fileInput' @input="onSelectedFile()" id="file" class="form-input w-full" type="file" />
            </form>
          </div>
        </div>
      </div>
      <!-- Modal footer -->
      <div class="px-5 py-4">
        <div class="flex flex-wrap justify-end space-x-2">
          <button class="
              btn-sm
              border-slate-200
              hover:border-slate-300
              text-slate-600
            " @click.stop="orderModalOpen = false">
            Cancelar
          </button>
          <button @click="createOrder({...newOrder}); succestoast=true; orderModalOpen=false; resetFile()"
            class="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white">
            Guardar
          </button>
        </div>
      </div>
    </ModalBasic>
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