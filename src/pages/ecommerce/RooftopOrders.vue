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

          <!-- Table -->
          <OrdersTable :rooftop="true"/>

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
import useOrders from "./../../composables/useRooftopOrders";

const sidebarOpen = ref(false);
const succestoast = ref(false);
const { orders, results, loading, error,createOrder} = useOrders();

</script>