<template>
  <div class="bg-white shadow-lg rounded-sm border border-slate-200 relative">
    <header class="px-5 py-4">
      <h2 class="font-semibold text-slate-800">
        Todas las Serv. Hab. <span class="text-slate-400 font-medium">{{results}}</span>
      </h2>
    </header>
    <div>
      <!-- Table -->
      <div class="overflow-x-auto">
        <table v-if="!loading" class="table-auto w-full divide-y divide-slate-200">
          <!-- Table header -->
          <thead
            class="
              text-xs
              font-semibold
              uppercase
              text-slate-500
              bg-slate-50
              border-t border-slate-200
            "
          >
            <tr>
   
              <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div class="font-semibold text-left">Órden</div>
              </th>
              <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div class="font-semibold text-left">Fecha</div>
              </th>
              <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div class="font-semibold text-left">Cliente</div>
              </th>
              <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div class="font-semibold text-left">Habitacion</div>
              </th>
              <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div class="font-semibold text-left">Estado</div>
              </th>
             
             
              <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <span class="sr-only">Menu</span>
              </th>
            </tr>
          </thead>
          <!-- Table body -->
          <Order
            v-for="order in orders"
            :key="order.id"
            :order="order"
            :value="order.id"
          />
        </table>
        <div v-else class="md:col-span-2 xl:col-span-1">
          <svg class="animate-spin block h-24 w-24 mt-10 mx-auto text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg> 
          <span class="inline-block text-xl font-bold w-full my-4 mt-6 mx-auto text-center mb-10">Actualizando</span>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
  import useOrders from "./../../composables/useOrders";
  import useUsers from "./../../composables/useUsers";
  
  import Order from "./OrdersTableItem.vue";
  
  const { initializeUsers } = useUsers();
  const { orders,  initializeAllOrders, loading,results } = useOrders();
  initializeUsers();
  initializeAllOrders();

 

</script>
