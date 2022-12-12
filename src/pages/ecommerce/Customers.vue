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
              <button @click.stop="registerModalOpen = true" class="btn bg-indigo-500 hover:bg-indigo-600 text-white">
                <svg class="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
                  <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                </svg>
                <span class="hidden xs:block ml-2">Añadir Cliente</span>
              </button>     
                       
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
       <!-- Create Profile -->
      <ModalBasic
      :modalOpen="registerModalOpen"
      @close-modal="registerModalOpen = false"
      title="Registrar Operador"
    >
      <!-- Modal content -->
      <div class="px-5 pt-4 pb-1">
        <div class="text-sm">
          <div class="font-medium text-slate-800 mb-2">
            Haga click sobre el círculo y elija una foto de perfil.
          </div>
          <div class="space-y-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div class="flex justify-center sm:col-span-2">
              <input id="image-input-create" class="hidden" accept="image/jpeg, image/png, image/jpg" type="file" @change="uploadImage">
          
              <img
                @click="clickInput"
                class="rounded-full cursor-pointer hover:grayscale ease-in-out duration-300 active:grayscale-0"
                :src="`${previewImage}`"
                width="64"
                height="64"
                :alt="'Foto de perfil'"
              />
            </div>
            <!-- Start -->
            <div>
              <label class="block text-sm font-medium mb-1 mt-2" for="name-create"
                >Nombre</label
              >
              <input id="name-create" class="form-input w-full" type="text" v-model="newUser.name"/>
            </div>
            <!-- Start -->
            <div>
              <label class="block text-sm font-medium mb-1 mt-2" for="email-create"
                >Correo</label
              >
              <input id="email-create" class="form-input w-full" type="text" v-model="newUser.email"/>
            </div>

            
            <!-- Start -->
            <div>
              <label class="block text-sm font-medium mb-1" for="cellphone"
                >Celular</label
              >
              <input id="cellphone" class="form-input w-full" type="text" v-model="newUser.phoneNumber" />
            </div>

           
            <!-- Start -->
            <div>
              <label class="block text-sm font-medium mb-1" for="password-create"
                >Clave</label
              >
              <input id="password-create" class="form-input w-full" type="password" v-model="newUser.password"/>
            </div>
            <!-- Start -->
            <div>
              <label class="block text-sm font-medium mb-1" for="confirm_password"
                >Confirmar Clave</label
              >
              <input id="confirm_password" class="form-input w-full" type="password" v-model="confirmation"/>
            </div>
             <!-- Select -->
            <div>
              <label class="block text-sm font-medium mb-1" for="room"
                >Habitacion</label
              >
              <select id="room" class="w-full form-select" v-model="newUser.room">
                <option v-for="room in rooms" :key="room.id" :value="room.id">{{room.number}}</option>
              </select>
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
            @click.stop="registerModalOpen = false"
          >
            Cancelar
          </button>
          <button :disabled="loading" @click="createNewUser()" class="btn-sm disabled:bg-indigo-300 bg-indigo-500 hover:bg-indigo-600 text-white">
            Guardar
          </button>
        </div>
      </div>
      </ModalBasic>
    
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import Sidebar from '../../partials/Sidebar.vue'
import useRooms from "../../composables/useRooms";
import useUsers from "../../composables/useUsers";
import useAdmins from "../../composables/useAdmins";
import Header from '../../partials/Header.vue'
import ModalBasic from '../../components/ModalBasic.vue';
import DeleteButton from '../../partials/actions/DeleteButton.vue'
import DateSelect from '../../components/DateSelect.vue'
import FilterButton from '../../components/DropdownFilter.vue'
import CustomersTable from '../../partials/customers/CustomersTable.vue'
import Toast from '../../components/Toast.vue'
import PaginationClassic from '../../components/PaginationClassic.vue'


import DefaultImage from '../../images/user-avatar-80.png'
import useAuth from '../../composables/useAuth'
import { useRouter, useRoute } from 'vue-router'
import useResources from '../../composables/useResources'
const previewImage = ref(DefaultImage);
const {getImage} = useResources()
const router = useRouter();
const route = useRoute();

const sidebarOpen = ref(false)
const confirmation = ref('')
const succestoast = ref(false);    
const registerModalOpen = ref(false)
const { users,results, error, initializeClients, loading,newUserId } = useUsers();
const { createUser } = useAdmins();
const { rooms, initializeRooms, updateRoom } = useRooms();
const newUser = ref({
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
    role: 'user',
})
const selectedItems = ref([])
const updateSelectedItems = (selected) => {
  selectedItems.value = selected
}
function resetData() {
  if(!error.value) {
      newUser.value = {
      name: '',
      email: '',
      password: '',            
      phoneNumber: '',
      role: 'user',
      room: ''
    }
    confirmation.value = ''
  }
}

const createNewUser = async () => {
  
  let response = await createUser(newUser?.value);
  registerModalOpen.value=false; 
 
  //if(newUser.value.room) {
    //let resultRoom = rooms.value.find((prevRoom)=>prevRoom.id == newUser.value.room);
    //if(resultRoom) {
      //let usersList = [...resultRoom.users];
      //usersList.push(response?.data.id);
      
      //await updateRoom({users: usersList},resultRoom.id);
  //Bug, proponer actualizar el modelo de Room desde el backend
    //}
   // }

  resetData();
  succestoast.value=true;
  router.push(route.path);
}


const clickInput = () => {
  const input = document.querySelector('#image-input-create')
  input.click();
}

const uploadImage = (e) => {
  const image = e.target.files[0];
  newUser.value.file = e.target.files[0];

  const reader = new FileReader();
  reader.readAsDataURL(image);
  reader.onload = e =>{
  previewImage.value = e.target.result;
  ;
  };
}

 
  initializeClients();
  initializeRooms();
    
 </script>