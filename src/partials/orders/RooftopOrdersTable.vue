
<script setup>
//////////////////////////////////////////
//Import Component Dependencies
//////////////////////////////////////////
//Vue + Components
import {ref,onMounted,onUnmounted} from 'vue'
import { onBeforeRouteLeave, useRoute } from "vue-router";
import Order from "./OrdersTableItem.vue";

//Composables
import useRooms from "../../composables/useRooms";
import useRooftopOrders from "./../../composables/useRooftopOrders";

import useUsers from "./../../composables/useUsers";  

//////////////////////////////////////////
//Variables + Refs Init
//////////////////////////////////////////

//Vue Related Init
const route = useRoute();
const props = defineProps({
  rooftop: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    default: ""
  }
});

//Composables Init
const {initializeRooms, rooms} = useRooms();
const { orders,  initializeAllOrders, retrieveRooftopOrders, loading,results,page } =  useRooftopOrders() ;

//Refs Init
const interval = ref(null);

//////////////////////////////////////////
//Component Functionality 
//////////////////////////////////////////

//Core Actions - CRUD / Specific Actions
function initializeOrders(silent=false) {
 
  initializeAllOrders(page.value || 1, silent, props.status);
 
}


//Hooks
onMounted(()=> {
  initializeOrders();
  initializeRooms();
  interval.value =  setInterval(() => {
      initializeOrders(true);
  }, 3000);
})


onUnmounted(()=> {
  
  clearInterval(interval.value);
})
</script>

<template>
  <div class="bg-white shadow-lg rounded-sm border border-slate-200 relative">
    <header class="px-5 py-4">
      <h2 class="font-semibold text-slate-800">
        Órdenes de {{props.rooftop ? 'Desayuno' : 'Servicio a Hab.'}} <span class="text-slate-400 font-medium">{{results}}</span>
      </h2>
    </header>
    <div>
      <!-- Table -->
      <div class="overflow-x-auto">
        <table class="table-auto w-full">
          <!-- Table header -->
          <thead
            class="
              text-xs
              text-center
              first:text-left
              last:text-right
              font-semibold
              uppercase
              text-slate-500
              bg-slate-50
              border-t border-slate-200
            "
          >
            <tr>
              <th class="px-2 pl-5 py-3 whitespace-nowrap hidden md:table-cell">
                <div class="font-semibold ">Fecha</div>
              </th>
              <th class="px-2 pl-5 py-3 whitespace-nowrap">
                <div class="font-semibold ">Hora</div>
              </th>
              
              <th class="px-2 pl-5 py-3 whitespace-nowrap">
                <div class="font-semibold ">Huésped</div>
              </th>
              <th class="px-2 pl-5 py-3 whitespace-nowrap">
                <div class="font-semibold ">Habitacion</div>
              </th>
              <th class="px-2 pr-5 py-3 whitespace-nowrap">
                <div class="font-semibold ">Estado</div>
              </th>
             
             
              <th class="px-2 py-3 whitespace-nowrap">
                <span class="sr-only">Menu</span>
              </th>
            </tr>
          </thead>
          <!-- Table body -->
          <tbody v-if="!loading" class="text-sm divide-y divide-slate-200">
            <Order
            v-for="order in orders"
            :key="order.id"
            :order="order"
            :value="order.id"
            :rooftop="props.rooftop"
            />  
          </tbody>
          <tbody v-else class="w-full min-h-[40vh] flex flex-col justify-center items-center mx-auto">
            
            <div class="mx-auto absolute inset-x-0">
              <svg class="animate-spin block h-24 w-24 mt-10 mx-auto text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg> 
              <span class="inline-block text-xl font-bold w-full my-4 mt-6 mx-auto text-center mb-10">Actualizando</span>
            </div>
            
            
          </tbody>
        </table>
        
      </div>
    </div>

  </div>
</template>
