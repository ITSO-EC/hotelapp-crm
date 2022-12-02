<template>
  <div class="flex h-screen overflow-hidden">

    <!-- Sidebar -->
    <Sidebar :sidebarOpen="sidebarOpen" @close-sidebar="sidebarOpen = false" />

    <!-- Content area -->
    <div class="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
      
      <!-- Site header -->
      <Header :sidebarOpen="sidebarOpen" @toggle-sidebar="sidebarOpen = !sidebarOpen" />
      <Toast :type="'error'" :open="error" @close-toast="error=null; succestoast = false" class="fixed z-40 mt-16 w-1/3">{{error}}</Toast>
      <Toast :type="'success'" :open="!error && succestoast" @close-toast="succestoast=false" class="fixed z-40 mt-16 w-1/3">Cambio realizado con éxito</Toast>
     
      <main>
        <div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

          <!-- Page header -->
          <div class="sm:flex sm:justify-between sm:items-center mb-8">

            <!-- Left: Title -->
            <div class="mb-4 sm:mb-0">
              <h1 class="text-2xl md:text-3xl text-slate-800 font-bold">Usuarios 👦</h1>
            </div>

            <!-- Right: Actions  -->
            <div class="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">

              <!-- Delete button -->
              <!-- <DeleteButton :selectedItems="selectedItems" /> -->

              <!-- Dropdown -->
              <!-- <DateSelect /> -->

              <!-- Filter button -->
              <!-- <FilterButton align="right" /> -->

              <!-- Add customer button -->
              <RouterLink :to="{name:'Signup'}" class="btn bg-indigo-500 hover:bg-indigo-600 text-white">
                <svg class="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
                  <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                </svg>
                <span class="hidden xs:block ml-2">Añadir Cliente</span>
              </RouterLink>     
                       
            </div>

          </div>

          <!-- Table -->
          <div >
            <CustomersTable @change-selection="updateSelectedItems($event)" @edit-customer="succestoast=true"/>
          </div>
         
          <!-- Pagination -->
          <div class="mt-8">
            <PaginationClassic :items="users.length" :results="results" :type="'users'"/>
          </div>          

        </div>
      </main>

    </div> 
    
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import Sidebar from '../../partials/Sidebar.vue'
import useOrders from "../../composables/useOrders";
import useUsers from "../../composables/useUsers";
import Header from '../../partials/Header.vue'
import ModalBasic from '../../components/ModalBasic.vue';
import DeleteButton from '../../partials/actions/DeleteButton.vue'
import DateSelect from '../../components/DateSelect.vue'
import FilterButton from '../../components/DropdownFilter.vue'
import CustomersTable from '../../partials/customers/CustomersTable.vue'
import Toast from '../../components/Toast.vue'
import PaginationClassic from '../../components/PaginationClassic.vue'

  const succestoast = ref(false);
    const sidebarOpen = ref(false)
    const { users,results, error } = useUsers();
    const { initializeAllOrders } = useOrders();

    
    const selectedItems = ref([])
    initializeAllOrders()
    const updateSelectedItems = (selected) => {
      selectedItems.value = selected
   
}
</script>