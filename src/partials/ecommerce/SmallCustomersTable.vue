<template>
  <div class="bg-white relative">
    <div>

      <!-- Table -->
      <div class="overflow-x-auto rounded-sm border">
        <table class="table-auto">
          <!-- Table header -->
          <thead class="text-xs font-semibold
          uppercase text-slate-500 bg-slate-50 border-t border-b  w-full">
            <tr class=" text-center">
              <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap text-left">
                <div class="font-semibold">Huésped</div>
              </th>
              <th class="px-2 first:pl-5 last:pr-5 w-full py-3 whitespace-nowrap">
                <div class="font-semibold">Celular</div>
              </th>
              
             
              <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div class="font-semibold"></div>
              </th>
             
              <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <span class="sr-only">Menu</span>
              </th>
            </tr>
          </thead>
          
          <!-- Table body -->
          <tbody class="text-sm divide-y divide-slate-200">
            <Customer 
              v-for="customer in users"
              :key="customer.id"
              @edit-customer="$emit('edit-customer')"
              :customer="customer"/>
            
          </tbody>
        </table>

      </div>
    </div>
    
  </div>
</template>
<script setup>
//////////////////////////////////////////
//Import Component Dependencies
//////////////////////////////////////////

//Vue + Components
import useUsers from '../../composables/useUsers';
import Customer from './SmallCustomersTableItem.vue';

//////////////////////////////////////////
//Variables + Refs Init
//////////////////////////////////////////

//Vue Related Init
const emits = defineEmits('edit-customer');

//Composables Init
const props = defineProps(['users'])


</script>