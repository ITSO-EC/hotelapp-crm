<template>
  <div
    class="
      col-span-full
      sm:col-span-6
      xl:col-span-4
      bg-white
      shadow-lg
      rounded-sm
      border border-slate-200
    "
  >
    <div class="flex flex-col h-full">
      <!-- Card top -->
      <div class="grow p-5">
        <!-- Menu button -->
        <div class="relative">
          <div v-if="getGuests(item?.number) == null" class="absolute top-0 left-0 inline-flex bg-green-500 text-slate-800 px-4 rounded-full shadow">
            <span>Disponible</span>   
          </div>
          <div v-else class="absolute top-0 left-0 inline-flex bg-red-500 text-slate-800 font-bold px-4 rounded-full shadow">
            <span>No disponible</span>   
          </div>

          <EditMenu align="right" class="absolute top-0 right-0 inline-flex ">
            <!-- Edit CheckOut  -->
            <li v-if="getGuests(item?.number) != null && getGuests(item?.number).length > 0">
              <button
                class="
                  font-medium
                  text-sm text-slate-600
                  hover:text-slate-800
                  flex
                  py-1
                  px-3
                "
                @click.stop="coModalOpen = true"
                >Editar Checkout</button
              >
            </li>

            <!-- See Guests -->
            <li>
              <button
                class="
                  font-medium
                  text-sm text-slate-600
                  hover:text-slate-800
                  flex
                  py-1
                  px-3
                "
                @click.stop="basicModalOpen = true"
                >Ver Huéspedes</button
              >
            </li>
            
            <!-- Empty Room -->
            <li>
              <button
                class="
                  font-medium
                  text-sm text-rose-500
                  hover:text-rose-600
                  flex
                  py-1
                  px-3
                "
               
                @click.stop="dangerModalOpen = true"
                >Vaciar Habitación</button
              >
            </li>
          </EditMenu>
        </div>
        <!-- Image + name -->
        <header class="-mx-5">
          <div class=" flex justify-center mb-2 ">
            
            
              <img
                class=" -mt-5 w-full inset-x-0 h-[220px] object-cover"
                :src="`${item.image}`"
               
                :alt="item.name"
              />
            
          </div>
          <div class="text-center">
            <router-link
              class="inline-flex text-slate-800 hover:text-slate-900"
              :to="'#'"
            >
              <h2 class="text-xl leading-snug justify-center font-semibold">
                {{ item.name }}
              </h2>
            </router-link>
          </div>
          <div class="flex justify-center gap-8 items-center">
            
            <p><span class="font-bold">Número: </span>{{ item.number }}</p>
            <p><span class="font-bold">Huéspedes: </span>{{getGuests(item.number) ? getGuests(item.number).length:0}}</p>
          </div>
        </header>
        <!-- Bio -->
        <div class="text-center mt-2">
          <div class="text-sm">
            <p><span class="font-bold">Check-Out: </span>{{ getCheckout(item.number) }}</p>
          </div>
        </div>
      </div>
      
    </div>
    
    <!-- Change Checkout -->
    <ModalBasic  
      :modalOpen="coModalOpen"
      @close-modal="coModalOpen = false"
      :title="`Habitación ${item.number}`">
      <!-- Modal content -->
      <div class="px-5 pt-4 pb-1">
          <div class="text-sm">
            <div class="font-medium text-slate-800 mb-2">
              A continuación, elija la nueva fecha de checkout.
            </div>

            <!-- Form Start -->
            <div class="space-y-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <!-- Checkout Input + Label -->
              <div class="sm:col-span-2">
                <label class="block text-sm font-medium mb-1 mt-2" for="name-create"
                  >Checkout
                </label>
                <p class="text-xs text-red-500 font-medium italic mb-1 mt-2" for="name-create" :hidden="true">
                *  La fecha debe ser superior o igual al día actual
                
                </p>
                <input id="name-create" class="form-input w-full" :min="convertDateHTML5(today)" type="date" v-model="newCheckOut" />
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
              @click.stop="coModalOpen = false"
            >
              Cancelar
            </button>
            <button 
            :disabled="newCheckOutDate == '' || loading"
            @click="updateRoom({'checkOutTime': newCheckOutDate}, getRoomID(item?.number))"
            class="btn-sm disabled:bg-indigo-300 bg-indigo-500 hover:bg-indigo-600 text-white">
              <span :hidden="loading" >Aceptar</span>
              <span :hidden="!loading">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="animate-spin h-5 w-5 mx-5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
              </span>
            </button>
          </div>
        </div>
    </ModalBasic>
    <!-- Users Assigned -->
    <ModalBasic  
      :modalOpen="basicModalOpen"
      @close-modal="basicModalOpen = false"
      :title="`Huéspedes - Habitación ${item.number}`">
      <!-- Modal content -->
      <div class="px-5 pt-4 pb-1">
          <div class="text-sm" v-if="getGuests(item?.number) != null">
            <div class="font-medium text-slate-800 mb-2">
              A continuación, se presentan todos los huéspedes asignados a esta habitación.
            </div>

            <!-- Form Start -->
            <div class="space-y-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <SmallCustomersTable class="col-span-2" :users="getGuests(item.number)"/>
            </div>
          </div>
          <div class="text-sm" v-else>
            <div class="font-medium text-slate-800 mb-2">
              No se han registrado huéspedes aún.
            </div>
            <button
            @click="router.push('/ecommerce/customers')" 
            class="btn-sm disabled:bg-indigo-300 bg-indigo-500 hover:bg-indigo-600 text-white">
              <span >Agregar</span>
              <span class="rotate-45 ml-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>

              </span>
            </button>
          </div>
        </div>
        <!-- Modal footer -->
        <div class="px-5 py-4">
          <div class="flex flex-wrap justify-end space-x-2">
         
            <button 
            @click="basicModalOpen = false"
            class="btn-sm disabled:bg-indigo-300 bg-indigo-500 hover:bg-indigo-600 text-white">
              <span >Aceptar</span>
             
            </button>
          </div>
        </div>
    </ModalBasic>
    <!-- UnAssign All Guests Room -->
    <ModalBlank  :modalOpen="dangerModalOpen"
      @close-modal="dangerModalOpen = false">
      
      <div class="p-5 flex space-x-4">
        <!-- Icon -->
        <div
          class="
            w-10
            h-10
            rounded-full
            flex
            items-center
            justify-center
            shrink-0
            bg-rose-100
          "
        >
          <svg
            class="w-4 h-4 shrink-0 fill-current text-rose-500"
            viewBox="0 0 16 16"
          >
            <path
              d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 12c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zm1-3H7V4h2v5z"
            />
          </svg>
        </div>
        <!-- Content -->
        <div>
          <!-- Modal header -->
          <div class="mb-2">
            <div class="text-lg font-semibold text-slate-800">
              ¿Está seguro que desea retirar a todos los huéspedes de esta habitación?
            </div>
          </div>
          <!-- Modal content -->
          <div class="text-sm mb-10">
            <div class="space-y-2">
              <p>Considere que deberá reasignarlos.</p>
            
            </div>
          </div>
          <!-- Modal footer -->
          <div class="flex flex-wrap justify-end space-x-2">
            <button
              class="
                btn-sm
                border-slate-200
                hover:border-slate-300
                text-slate-600
              "
              @click.stop="dangerModalOpen = false"
            >
              Cancelar
            </button>
            <button 
            @click.stop="emptyRoom(getRoomID(item.number),getGuests(item.number)),dangerModalOpen=false"
            :disabled="loading"
            class="btn-sm bg-rose-500 disabled:bg-rose-300 hover:bg-rose-600 text-white">
              
              <span :hidden="loading" >Si, vaciar </span>
              <span :hidden="!loading">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="animate-spin h-5 w-5 mx-5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    </ModalBlank>

  </div>
</template>

<script setup>
//////////////////////////////////////////
//Import Component Dependencies
//////////////////////////////////////////

//Vue + Components
import { ref, watch } from "vue";
import { useRouter } from "vue-router";

import EditMenu from "../../components/DropdownEditMenu.vue";
import ModalBasic from "../../components/ModalBasic.vue";
import ModalBlank from '../../components/ModalBlank.vue'
import SmallCustomersTable from './SmallCustomersTable.vue'
//Composables
import useRooms from '../../composables/useRooms'

//////////////////////////////////////////
//Variables + Refs Init
//////////////////////////////////////////
//Vue Related Init
const props = defineProps(['item']);
const router = useRouter();

//Composables Init
const { rooms, initializeRooms, loading,updateRoom, emptyRoom } = useRooms();
//Refs Init
const basicModalOpen = ref(false);
const coModalOpen = ref(false);
const dangerModalOpen = ref(false);
const today = new Date();
const newCheckOut = ref('');
const newCheckOutDate = ref('')

//////////////////////////////////////////
//Component Functionality 
//////////////////////////////////////////
//Core Actions - CRUD / Specific Actions
const getRoomID = (number) => {
  const selectedRoom = rooms.value.find((selroom) => selroom.number == number);
  return selectedRoom?.id;
}
const getGuests = (number) => {
  const selectedRoom = rooms.value.find((selroom) => selroom.number == number);
  if (selectedRoom?.users.length == 0) return null;
  return selectedRoom?.users
}

const getCheckout = (number) => {
  const selectedRoom = rooms.value.find((selroom) => selroom.number == number);
  if(selectedRoom?.checkOutTime) return convertDate(selectedRoom?.checkOutTime)
  return '--/--/--'
}

watch(newCheckOut, (currentValue) => {
    newCheckOutDate.value = new Date(currentValue)
    let day = newCheckOutDate.value.getDate();
    newCheckOutDate.value.setDate(day +1)
})

// Edit Form Validation

//Utils - UI / Parsing / Any Other Un-Specific Component Action
const convertDate = (date) => {
  const monthNames = ["01", "02", "03", "04", "05", "06",
  "07", "08", "09", "10", "11", "12", "Error"
];

  date = new Date(date)
  let dd = date.getDate(); 
  let mm = date.getMonth();
  let yyyy = date.getFullYear(); 
  if(dd<10){dd='0'+dd} 
  return date = dd+'/'+monthNames[mm]+'/'+yyyy
}

const convertDateHTML5 = (date) => {
  const monthNames = ["01", "02", "03", "04", "05", "06",
  "07", "08", "09", "10", "11", "12", "Error"
];

  date = new Date(date)
  let dd = date.getDate(); 
  let mm = date.getMonth();
  let yyyy = date.getFullYear(); 
  if(dd<10){dd='0'+dd} 
  return date = yyyy +'-'+monthNames[mm]+'-' + dd
}
//Possible hydration

if(rooms.value.length < 1)
{
  initializeRooms()
}

</script>