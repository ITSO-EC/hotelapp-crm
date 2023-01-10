<script setup>
//////////////////////////////////////////
//Import Component Dependencies
//////////////////////////////////////////
//Vue + Components
import { ref, watch } from 'vue'
import Sidebar from '../../partials/Sidebar.vue'
import Header from '../../partials/Header.vue'
import Toast from '../../components/Toast.vue'
import DeleteButton from '../../partials/actions/DeleteButton.vue'
import DateSelect from '../../components/DateSelect.vue'
import FilterButton from '../../components/DropdownFilter.vue'
import RooftopOrdersTable from '../../partials/orders/RooftopOrdersTable.vue'
import PaginationClassic from '../../components/PaginationClassic.vue'

//Composables
import useRooftopOrders from "./../../composables/useRooftopOrders";

//////////////////////////////////////////
//Variables + Refs Init
//////////////////////////////////////////

//Composables Init
const { orders, results, loading, error,createOrder,page,pages} = useRooftopOrders();

//Refs Init
const sidebarOpen = ref(false);
const succestoast = ref(false);
const selectedStatus = ref("")

watch(selectedStatus, (currentStatus) => {
  page.value = 1;
})

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
              <h1 class="text-2xl md:text-3xl text-slate-800 font-bold">Pedidos Desayunos 🍴</h1>
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

          <!-- Table -->
          <RooftopOrdersTable :rooftop="true" :status="selectedStatus" :key="selectedStatus"/>

          <!-- Pagination -->
          <div class="mt-8">
           
            <PaginationClassic :items="orders.length" :results="results" :type="'rooftop'" :localpage="page" key="`${page}`"/>
          </div>

        </div>
      </main>

    </div>

   
  </div>
</template>
