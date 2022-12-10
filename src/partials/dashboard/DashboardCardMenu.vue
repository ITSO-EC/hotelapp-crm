<template>
  <div class="col-span-full sm:col-span-6  bg-white shadow-lg rounded-sm border border-slate-200">
    <div class="px-5 pt-5 flex flex-col h-full" >
      <header class="flex justify-between items-start mb-2">
        <!-- Icon -->
      
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z" />
        <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 6.75h.75v.75h-.75v-.75zM6.75 16.5h.75v.75h-.75v-.75zM16.5 6.75h.75v.75h-.75v-.75zM13.5 13.5h.75v.75h-.75v-.75zM13.5 19.5h.75v.75h-.75v-.75zM19.5 13.5h.75v.75h-.75v-.75zM19.5 19.5h.75v.75h-.75v-.75zM16.5 16.5h.75v.75h-.75v-.75z" />
      </svg>

        <EditMenu align="right" class="relative inline-flex">
        
          <li>
            <span class="cursor-pointer font-medium text-sm text-slate-600 hover:text-slate-800 flex py-1 px-3" @click.stop="editBreakfastModal = true"> Cambiar Desayuno</span>
          </li>
          
        </EditMenu>
      </header>
      <div class="my-4" :key="loading">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-12 h-12 cursor-pointer hover:text-slate-300 active:text-slate-900">
          <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
        </svg>

        <h2 class="text-lg font-semibold text-slate-800 mb-2">Desayuno del Día:</h2>
        <div class="text-lg font-semibold text-slate-600 uppercase mb-1">{{breakfast?.schedule}}</div>
        
        <h2 class="text-md font-semibold text-slate-800 mb-2">Descripcion:</h2>
        <div class="text-xs font-semibold text-slate-400 uppercase mb-1">{{breakfast?.description}}</div>
      </div>
      
     
    </div>
     <!-- Edit Breakfast -->
     <ModalBasic
      :modalOpen="editBreakfastModal"
      @close-modal="editBreakfastModal = false"
      title="Modificar Desayuno del Dia"
    >
      <!-- Modal content -->
      <div class="px-5 pt-4 pb-1">
        <div class="text-sm">
          <div class="space-y-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <!-- Start -->
            <div class="sm:col-span-2">
              <label class="block text-sm font-medium mb-1 mt-2" for="breakfast-title"
                >Plato</label
              >
              <input id="breakfast-title" class="form-input w-full" type="text" v-model="breakfast.schedule"/>
            </div>
  
            <!-- Start -->
            <div  class="sm:col-span-2">
              <label class="block text-sm font-medium mb-1" for="breakfast-description"
                >Descripcion</label
              >
              <textarea id="breakfast-description" class="form-input w-full" type="text" v-model="breakfast.description" />
            </div>
   
        
          </div>
        </div>
      </div>
      <!-- Modal footer -->
      <div class="px-5 py-4">
        <div class="flex flex-wrap justify-end space-x-2">
          <button
            class="
              btn-sm
              border-slate-200
              hover:border-slate-300
              text-slate-600
            "
            @click.stop="editBreakfastModal = false"
          >
            Cancelar
          </button>
          <button :disabled="loading" @click="editBreakfastModal=false; updateItem({schedule: breakfast.schedule, description: breakfast.description}, breakfast.id)" class="btn-sm disabled:bg-indigo-300 bg-indigo-500 hover:bg-indigo-600 text-white">
            Guardar
          </button>
        </div>
      </div>
    </ModalBasic>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import LineChart from '../../charts/LineChart01.vue'
import useItems from '../../composables/useItems'
import EditMenu from '../../components/DropdownEditMenu.vue'

import ModalBasic from '../../components/ModalBasic.vue'

// Import utilities
import { tailwindConfig, hexToRGB } from '../../utils/Utils'

const {getBreakfast,loading, updateItem} = useItems();

const breakfast = ref({})
const editBreakfastModal = ref(false);

getBreakfast().then(res=>breakfast.value = res.data.results[0])

</script>