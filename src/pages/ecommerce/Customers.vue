<template>
  <!-- Page -->
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
            <CustomersTable @edit-customer="succestoast=true"/>
          </div>
         
          <!-- Pagination -->
          <div class="mt-8">
            <PaginationClassic :items="users.length" :results="results" :type="'users'"/>
          </div>          

        </div>
      </main>

    </div> 

    <!-- Hidden modals until trigger   -->
    
    <!-- Modal: CREATE Profile -->
    <ModalBasic
    :modalOpen="registerModalOpen"
    @close-modal="registerModalOpen = false"
    title="Registrar Huésped"
  >
    <!-- Modal content -->
    <div class="px-5 pt-4 pb-1">
      <div class="text-sm">
        <div class="font-medium text-slate-800 mb-2 text-center">
          Haga click sobre el círculo y elija una foto de perfil.
        </div>

        <!-- Inicio del Form -->
        <div class="space-y-2 grid grid-cols-1 sm:grid-cols-2 gap-4" >
          
          <!-- Image - Error Messages -->
          <div class="flex flex-col">
            <p class="text-xs text-red-500 font-medium italic mt-2" for="name-create" :hidden="registerErrors.imageFormat">
            *  El formato de Imagen no es permitido (Solo "jpg", "png" o "jpeg")
            </p>
            <p class="text-xs text-red-500 font-medium italic mb-1" for="name-create" :hidden="registerErrors.imageSize">
            *  Imagen muy pesada (Máx. 1.5MB)
            </p>
            
          </div>

          <!-- Profile Pic - Image Chooser -->
          <div class="flex justify-center sm:col-span-2">
            <input id="image-input-create" class="hidden" accept="image/jpeg, image/png, image/jpg" type="file" @change="uploadImage">
        
            <img
              @click="clickInput"
              class="rounded-full 
              w-[64px]
              h-[64px]
              cursor-pointer 
              hover:grayscale 
              ease-in-out 
              duration-300 
              active:grayscale-0"
              :src="`${previewImage}`"
              width="64"
              height="64"
              :alt="'Foto de perfil'"
            />
          </div>
          <!-- Name Input + Label -->
          <div>
            <label class="block text-sm font-medium mb-1 mt-2" for="name-create"
              >Nombre 
              <span class="text-red-500" for="name-create">*</span>
            </label>
            <p class="text-xs text-red-500 font-medium italic mb-1 mt-2" for="name-create" :hidden="registerErrors.name">
            *  El nombre no puede estar vacío
            
            </p>
            <input id="name-create" class="form-input w-full" type="text" v-model="newUser.name"/>
          </div>

          <!-- Mail Input + Label -->
          <div>
            <label class="block text-sm font-medium mb-1 mt-2" for="email-create"
              >Correo
              <span class="text-red-500" for="name-create">*</span>
              
            </label>
            <p class="text-xs text-red-500 font-medium italic mb-1 mt-2" for="name-create" :hidden="registerErrors.mail">
            *  El correo no es válido
            </p>
            <input id="email-create" class="form-input w-full" type="text" v-model="newUser.email"/>
          </div>

          
          <!-- Cellphone Input + Label -->
          <div>
            <label class="block text-sm font-medium mb-1" for="cellphone"
              >Celular
              <span class="text-red-500" for="name-create">*</span>
            </label>
            <p class="text-xs text-red-500 font-medium italic mb-1 mt-2" for="name-create" :hidden="registerErrors.cellphone">
            *  El nro. celular no es válido
            </p>
            <input id="cellphone" class="form-input w-full" type="text" v-model="newUser.phoneNumber" />
          </div>

          
          <!-- Password Input + Label -->
          <div>
            <label class="block text-sm font-medium mb-1" for="password-create">
              Clave
              <span class="text-red-500" for="name-create">*</span>
            </label>
            <p class="text-xs text-red-500 font-medium italic mb-1 mt-2" for="name-create" :hidden="registerErrors.password">
            *  La clave no puede estar vacía
            </p>
            <p class="text-xs text-red-500 font-medium italic mb-1 mt-2" for="name-create" :hidden="registerErrors.passwordValid">
            *  Mínimo 6 caracteres
            </p>
            <input id="password-create" class="form-input w-full" type="password" v-model="newUser.password"/>
          </div>
          <!-- Confirmation Input + Label -->
          <div>
            <label class="block text-sm font-medium mb-1" for="confirm_password"
              >Confirmar Clave</label
            >
            <p class="text-xs text-red-500 font-medium italic mb-1 mt-2" for="name-create" :hidden="registerErrors.passwordConfirm">
            *  Las claves no coinciden
            </p>
            <input id="confirm_password" class="form-input w-full" type="password" v-model="confirmation"/>
          </div>
          
          <!-- Room Select + Label -->
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
        <button :disabled="!isNewUserValid || loading" @click="createNewUser()" class="btn-sm disabled:bg-indigo-300 bg-indigo-500 hover:bg-indigo-600 text-white">
          <span :hidden="loading">Guardar</span>
          <span :hidden="!loading">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="animate-spin h-5 w-5 mx-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
          </span>
        </button>
      </div>
    </div>
    </ModalBasic>
  
  </div>
</template>

<script setup>
//////////////////////////////////////////
//Import Component Dependencies
//////////////////////////////////////////

//Vue + Components
import { watch, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import Sidebar from '../../partials/Sidebar.vue';
import Header from '../../partials/Header.vue';
import ModalBasic from '../../components/ModalBasic.vue';
import DeleteButton from '../../partials/actions/DeleteButton.vue';
import DateSelect from '../../components/DateSelect.vue';
import FilterButton from '../../components/DropdownFilter.vue';
import CustomersTable from '../../partials/customers/CustomersTable.vue';
import Toast from '../../components/Toast.vue';
import PaginationClassic from '../../components/PaginationClassic.vue';

//Composables
import useRooms from "../../composables/useRooms";
import useUsers from "../../composables/useUsers";
import useResources from '../../composables/useResources'

//Media
import DefaultImage from '../../images/user-avatar-80.png'

//////////////////////////////////////////
//Variables + Refs Init
//////////////////////////////////////////

//Vue Related Init
const router = useRouter();
const route = useRoute();

//Composables Init
const {getImage} = useResources()
const { users,results, error, initializeClients, createUser, loading,newUserId } = useUsers();
const { rooms, initializeRooms, updateRoom } = useRooms();

//Refs Init
const sidebarOpen = ref(false)
const confirmation = ref('')
const succestoast = ref(false);    
const registerModalOpen = ref(false)
const previewImage = ref(DefaultImage);

const isNewUserValid = ref(false);
const newUser = ref({
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
    room: '63bb8cbf9955aa3847ba6e7c',
    role: 'user',
    allowQualify: true,
})
  //Register Modal Errors
const registerErrors = ref({
  imageFormat: true,
  imageSize: true,
  name: true,
  mail: true,
  cellphone: true,
  password: true,
  passwordValid: true,
  passwordConfirm: true,
})


//////////////////////////////////////////
//Component Functionality 
//////////////////////////////////////////

//Core Actions - CRUD / Specific Actions
const createNewUser = async () => {
  error.value = "";
  succestoast.value = false;
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

const resetErrors = () => {
  registerErrors.value.imageFormat = false;
  registerErrors.value.imageSize = false;
  registerErrors.value.name = false;
  registerErrors.value.mail = false;
  registerErrors.value.cellphone = false;
  registerErrors.value.password = false;
  registerErrors.value.passwordValid = false;
  registerErrors.value.passwordConfirm = false;
}

const resetData = () => {
  if(!error.value) {
      previewImage.value = DefaultImage;

      newUser.value.name= '';
      newUser.value.email= '';
      newUser.value.password= '';            
      newUser.value.phoneNumber= '';
      delete newUser.value.file;
      newUser.value.role= 'user';
      newUser.value.room= '63bb8cbf9955aa3847ba6e7c';
      newUser.value.allowQualify= true;
    
    confirmation.value = ''
    resetErrors();
  }
}

const checkValidUser = () => {
  isNewUserValid.value = false;

  if(loading.value) {
    isNewUserValid.value = false
    return;
  };

  let valid = true;
  Object.entries(registerErrors.value).forEach(([key, value]) => {
    if(!value && key != "imageFormat" && key != "imageSize") {
      valid = false;
      return;
    }
  });

  if(valid) isNewUserValid.value = true;

}
// Register Form Validation
const phoneNumberRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
watch([newUser.value, confirmation], ([currentValue, newConfirm]) => {
    (currentValue.name.length > 0) ? registerErrors.value.name = true : registerErrors.value.name = false;
    (phoneNumberRegex.exec(currentValue.phoneNumber)!=null) ? registerErrors.value.cellphone = true : registerErrors.value.cellphone = false;
    (emailRegex.exec(currentValue.email)!=null) ? registerErrors.value.mail = true : registerErrors.value.mail = false;
    (currentValue.password.length > 0) ? registerErrors.value.password = true : registerErrors.value.password = false; 
    (currentValue.password.length > 5 || currentValue.password.length < 1) ? registerErrors.value.passwordValid = true : registerErrors.value.passwordValid = false;
    (newConfirm == currentValue.password) ? registerErrors.value.passwordConfirm = true : registerErrors.value.passwordConfirm = false; 
    checkValidUser();
  }
);

//Utils - UI / Parsing / Any Other Un-Specific Component Action
const clickInput = () => {
  const input = document.querySelector('#image-input-create')
  input.click();
}

const uploadImage = (e) => {
  const image = e.target.files[0];
  if(e.target.files.length > 0)
  {
    let fileTokens = e.target.files[0]?.name.split(".");
    let fileType = fileTokens[fileTokens.length-1];
    let imageSize = e.target.files[0]?.size / 1000 /1000
      
    
    if(fileType == "jpeg" || fileType == "jpg" || fileType == "jpe" || fileType == "png" || fileType == "jfif")
    {
      registerErrors.value.imageFormat = true;
      
      if(imageSize < 1.5) {
        registerErrors.value.imageSize = true;  
        newUser.value.file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = e =>{
          previewImage.value = e.target.result;
        };
      }  
      else {
        registerErrors.value.imageSize = false;
      }
      
    }
    else {
      registerErrors.value.imageFormat = false;
    }
    
  }
  
}

//Possible Required Hydration
initializeClients();
initializeRooms();
    
 </script>