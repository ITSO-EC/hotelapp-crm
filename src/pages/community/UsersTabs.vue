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
              <h1 class="text-2xl md:text-3xl text-slate-800 font-bold">FriendsHotel 📞</h1>
            </div>

            <!-- Right: Actions  -->
            <div class="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
              <!-- Search form -->
              <!-- <SearchForm /> -->
              <!-- Add member button -->
              <button  @click.stop="registerModalOpen = true" class="btn bg-indigo-500 hover:bg-indigo-600 text-white">
                <svg class="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
                  <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                </svg>
                <span class="hidden xs:block ml-2">Agregar Operador</span>
              </button>
            </div>            

          </div>

          <!-- Cards -->
          <div v-if="!loading" class="grid grid-cols-12 gap-6" :key="`${loading}-page-${page}`">
            <UsersTabsCard
            
              v-for="item in users"
              :key="item?.id"
              :item="item"
            />
          </div>
          <div v-else>
            <div class="mx-auto min-h-[50vh] flex flex-col items-center justify-center">
              <svg class="animate-spin block h-24 w-24 mt-10 mx-auto text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg> 
              <span class="inline-block text-xl font-bold w-full my-4 mt-6 mx-auto text-center mb-10">Actualizando</span>
            
            </div>
          </div>
          
          <!-- Pagination -->
          <div class="mt-8">
            <PaginationNumeric :totalPages="pages" @change-page="changePage"/>
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
             
              <img
                class="rounded-full cursor-pointer hover:grayscale ease-in-out duration-300 active:grayscale-0"
                :src="'../src/images/user-64-01.jpg'"
                width="64"
                height="64"
                :alt="'Foto de perfil'"
              />
            </div>
            <!-- Start -->
            <div>
              <label class="block text-sm font-medium mb-1 mt-2" for="name"
                >Nombre y Apellido</label
              >
              <input id="name" class="form-input w-full" type="text" v-model="newUser.name"/>
            </div>
            <!-- Start -->
            <div>
              <label class="block text-sm font-medium mb-1 mt-2" for="email"
                >Correo</label
              >
              <input id="email" class="form-input w-full" type="text" v-model="newUser.email"/>
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
              <label class="block text-sm font-medium mb-1" for="password"
                >Clave</label
              >
              <input id="password" class="form-input w-full" type="password" v-model="newUser.password"/>
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
              <label class="block text-sm font-medium mb-1" for="country"
                >Rol</label
              >
              <select id="country" class="w-full form-select" v-model="newUser.role">
                <option value="admin">Admin</option>
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
          <button :disabled="loading" @click="createUser(newUser);registerModalOpen=false; successtoast=true" class="btn-sm disabled:bg-indigo-300 bg-indigo-500 hover:bg-indigo-600 text-white">
            Guardar
          </button>
        </div>
      </div>
    </ModalBasic>
  </div>
</template>

<script setup>
import { ref,onMounted } from 'vue'
import Sidebar from '../../partials/Sidebar.vue'
import Header from '../../partials/Header.vue'
import UsersTabsCard from '../../partials/community/UsersTabsCard.vue'
import PaginationNumeric from '../../components/PaginationNumeric.vue'
import ModalBasic from '../../components/ModalBasic.vue'
import useUsers from '../../composables/useAdmins'
import Toast from '../../components/Toast.vue'
import Image01 from '../../images/user-64-01.jpg'


const  { initializeAdmins, createUser, loading, users, results, error ,page ,pages } = useUsers() 
const sidebarOpen = ref(false)
const confirmation = ref('')
const succestoast = ref(false);    
const registerModalOpen = ref(false)

const newUser = ref({
  name: '',
  email: '',
  password: '',
  phoneNumber: '',
  role: 'admin',
})
function resetData() {
    newUser.value = {
    name: '',
    email: '',
    password: '',            
    phoneNumber: '',
    role: '',
  }
  confirmation.value = ''
}


initializeAdmins()
</script>
