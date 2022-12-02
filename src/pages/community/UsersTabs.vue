<template>
  <div class="flex h-screen overflow-hidden">

    <!-- Sidebar -->
    <Sidebar :sidebarOpen="sidebarOpen" @close-sidebar="sidebarOpen = false" />

    <!-- Content area -->
    <div class="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
      
      <!-- Site header -->
      <Header :sidebarOpen="sidebarOpen" @toggle-sidebar="sidebarOpen = !sidebarOpen" />

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
          <div class="grid grid-cols-12 gap-6" :key="`${submitting}-page-${page}`">
            <UsersTabsCard
              v-for="item in users"
              :key="item?.id"
              :item="item"
            />
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
              <input id="cellphone" class="form-input w-full" type="text" v-model="newUser.phone_number" />
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
                <option value="operator">Creador</option>
                <option value="reviewer_1">Revisor I</option>
                <option value="reviewer_2">Revisor II</option>
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
          <button :disabled="submitting" @click="createUser()" class="btn-sm disabled:bg-indigo-300 bg-indigo-500 hover:bg-indigo-600 text-white">
            Guardar
          </button>
        </div>
      </div>
    </ModalBasic>
  </div>
</template>

<script>
import { ref,onMounted } from 'vue'
import Sidebar from '../../partials/Sidebar.vue'
import Header from '../../partials/Header.vue'
import SearchForm from '../../components/SearchForm.vue'
import UsersTabsCard from '../../partials/community/UsersTabsCard.vue'
import PaginationNumeric from '../../components/PaginationNumeric.vue'
import ModalBasic from '../../components/ModalBasic.vue'
import axios from 'axios';

import Image01 from '../../images/user-64-01.jpg'

export default {
  name: 'UsersTabs',
  components: {
    Sidebar,
    Image01,
    Header,
    SearchForm,
    UsersTabsCard,
    PaginationNumeric,
    ModalBasic
  },
  setup() {
    const newUser = ref({
        name: '',
        email: '',
        password: '',
        phone_number: '',
        role: '',
    })
    const confirmation = ref('')
    const pages = ref(1);
    const limit = ref(8);
    const page = ref(1);
    const sidebarOpen = ref(false)
    const registerModalOpen = ref(false)
    const submitting = ref(false)
    const users = ref([]);
    

    function resetData() {
      newUser.value = {
        name: '',
        email: '',
        password: '',            
        phone_number: '',
        role: '',
      }
      confirmation.value = ''
    }
    function createUser() {
        submitting.value = true;
        console.log(import.meta.env.VITE_API_URL)
        axios.post(import.meta.env.VITE_API_URL+'users', newUser.value)
        .then(response => {
          submitting.value = false
          resetData();
          registerModalOpen.value = false;
          getUsers();
        })
        .catch(error => {
          submitting.value = false
          console.log(error)
          
          registerModalOpen.value = false;
          resetData()
        });
    };

    function getUsers() {
      axios.get(import.meta.env.VITE_API_URL+'users?limit='+limit.value+'&page='+page.value)
      .then(response => {
        console.log(response.data);
        users.value = response.data.results;
        pages.value = response.data.totalPages;
        })
      .catch(error => console.log(error));
    }

    function changePage (number) {
      page.value = number;
      getUsers();
    }
    onMounted(() => {
      getUsers();
    })
    return {
      sidebarOpen,
      submitting,
      users,
      registerModalOpen,
      newUser,
      confirmation,
      createUser,
      changePage,
      pages,
      limit,
      page
    }  
  }
}
</script>