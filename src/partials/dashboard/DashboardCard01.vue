<template>
  <div class="col-span-full sm:col-span-6  bg-white shadow-lg rounded-sm border border-slate-200">
    <div class="px-5 pt-5 flex flex-col h-full">
      <header class="flex justify-between items-start mb-2">
        <!-- Icon -->
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
      </svg>

        <EditMenu align="right" class="relative inline-flex">
          <li>
            <span class="cursor-pointer font-medium text-sm text-slate-600 hover:text-slate-800 flex py-1 px-3" @click.stop="editWifiModal = true">Cambiar wifi</span>
          </li>
          <li>
            <span class="cursor-pointer font-medium text-sm text-slate-600 hover:text-slate-800 flex py-1 px-3" @click.stop="editDoorKeyModal = true">Cambiar Clave Puerta</span>
          </li>
          
        </EditMenu>
      </header>
      <div class="my-4">
        <h2 class="text-lg font-semibold text-slate-800 mb-2">Clave del Wifi</h2>
        <div class="text-md font-semibold text-slate-400 uppercase mb-1">{{wifiCode.description}}</div>
        <h2 class="text-lg font-semibold text-slate-800 mb-2">Clave de la Puerta Exterior</h2>
        <div class="text-md font-semibold text-slate-400 uppercase mb-1">{{doorKey.description}}</div>
      </div>
      
     
    </div>
     <!-- Edit Wifi -->
     <ModalBasic
      :modalOpen="editWifiModal"
      @close-modal="editWifiModal = false"
      title="Modificar Clave Wifi"
    >
      <!-- Modal content -->
      <div class="px-5 pt-4 pb-1">
        <div class="text-sm">
          <div class="space-y-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <!-- Start -->
            <div class="sm:col-span-2">
              <label class="block text-sm font-medium mb-1 mt-2" for="wificode"
                >Clave Wifi</label
              >
              <input id="wificode" class="form-input w-full" type="text" v-model="wifiCode.description"/>
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
            @click.stop="editWifiModal = false"
          >
            Cancelar
          </button>
          <button :disabled="loading" @click="editWifiModal=false; updateItem({description: wifiCode.description}, wifiCode.id)" class="btn-sm disabled:bg-indigo-300 bg-indigo-500 hover:bg-indigo-600 text-white">
            Guardar
          </button>
        </div>
      </div>
    </ModalBasic>
     <!-- Edit DoorKey -->
     <ModalBasic
      :modalOpen="editDoorKeyModal"
      @close-modal="editDoorKeyModal = false"
      title="Modificar Clave de la Puerta Exterior"
    >
      <!-- Modal content -->
      <div class="px-5 pt-4 pb-1">
        <div class="text-sm">
          <div class="space-y-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <!-- Start -->
            <div class="sm:col-span-2">
              <label class="block text-sm font-medium mb-1 mt-2" for="doorkey"
                >Clave de la Puerta</label
              >
              <input id="doorkey" class="form-input w-full" type="text" v-model="doorKey.description"/>
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
            @click.stop="editDoorKeyModal = false"
          >
            Cancelar
          </button>
          <button :disabled="loading" @click="editDoorKeyModal=false; updateItem({description: doorKey.description}, doorKey.id)" class="btn-sm disabled:bg-indigo-300 bg-indigo-500 hover:bg-indigo-600 text-white">
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
import EditMenu from '../../components/DropdownEditMenu.vue'
import useItems from '../../composables/useItems'
import ModalBasic from '../../components/ModalBasic.vue'

// Import utilities
import { tailwindConfig, hexToRGB } from '../../utils/Utils'
const {getWifi, getDoorKey, loading, updateItem} = useItems();
const wifiCode = ref({});
const doorKey = ref({});
const editWifiModal = ref(false);
const editDoorKeyModal = ref(false);

getWifi().then(res=>wifiCode.value = res.data.results[0])
getDoorKey().then(res=>doorKey.value = res.data.results[0])

</script>