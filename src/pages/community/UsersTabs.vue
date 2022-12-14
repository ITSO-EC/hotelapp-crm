<script setup>
//////////////////////////////////////////
//Import Component Dependencies
//////////////////////////////////////////

//Vue + Components
import { ref,watch } from 'vue'
import Sidebar from '../../partials/Sidebar.vue'
import Header from '../../partials/Header.vue'
import UsersTabsCard from '../../partials/community/UsersTabsCard.vue'
import PaginationNumeric from '../../components/PaginationNumeric.vue'
import ModalBasic from '../../components/ModalBasic.vue'
import Toast from '../../components/Toast.vue'
import useUsers from '../../composables/useAdmins'
import { useRouter, useRoute } from 'vue-router'

//Composables
import useAuth from '../../composables/useAuth'
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
const  { initializeAdmins, createUser, loading, users, error,results,page ,pages } = useUsers() 

//Refs Init
const sidebarOpen = ref(false);
const confirmation = ref('');
const succestoast = ref(false);    
const registerModalOpen = ref(false);
const previewImage = ref(DefaultImage);

const isNewUserValid = ref(false);
const newUser = ref({
  name: '',
  email: '',
  password: '',
  phoneNumber: '',
  role: 'admin',
  room: '63bb8cbf9955aa3847ba6e7c'
});
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
const createNewUser = async() => {
  error.value = "";
  succestoast.value = false;

  await createUser(newUser?.value);
  registerModalOpen.value=false; 

  resetData();
  succestoast.value=true
  router.push(route.path)
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
    newUser.value.role= 'admin';
    newUser.value.room= '63bb8cbf9955aa3847ba6e7c';
    
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
  const input = document.querySelector('#image-input')
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
initializeAdmins()

</script>
<template>
  <div class="flex h-screen overflow-hidden">

    <!-- Sidebar -->
    <Sidebar :sidebarOpen="sidebarOpen" @close-sidebar="sidebarOpen = false" />

    <!-- Content area -->
    <div class="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
      <Toast :type="'error'" :open="error?.response" @close-toast="error=null; error1=null; succestoast = false" 
      class="fixed z-40 mt-16 w-1/3">{{error?.response?.data != null? error.response?.data?.message :''}}</Toast>

     
      <!-- Site header -->
      <Header :sidebarOpen="sidebarOpen" @toggle-sidebar="sidebarOpen = !sidebarOpen" />
      <Toast :type="'error'" :open="error" @close-toast="error=null; succestoast = false" class="fixed z-40 mt-16 w-1/3">{{error}}</Toast>
      <Toast :type="'success'" :open="!error && succestoast" @close-toast="succestoast=false" class="fixed z-40 mt-16 w-1/3">Cambio realizado con ??xito</Toast>
     
      <main>
        <div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

          <!-- Page header -->
          <div class="sm:flex sm:justify-between sm:items-center mb-8">

            <!-- Left: Title -->
            <div class="mb-4 sm:mb-0">
              <h1 class="text-2xl md:text-3xl text-slate-800 font-bold">FriendsHotel ????</h1>
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
              @edit-profile="succestoast=true"
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

    <!-- Hidden modals until trigger -->
    <!-- CREATE Profile -->
    <ModalBasic
      :modalOpen="registerModalOpen"
      @close-modal="registerModalOpen = false"
      title="Registrar Staff"
    >
      <!-- Modal content -->
      <div class="px-5 pt-4 pb-1">
        <div class="text-sm">
          <div class="font-medium text-slate-800 mb-2">
            Haga click sobre el c??rculo y elija una foto de perfil.
          </div>

          <!-- Form Start -->
          <div class="space-y-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            

            <!-- Image - Error Messages -->
            <div class="flex flex-col">
              <p class="text-xs text-red-500 font-medium italic mt-2" for="name-create" :hidden="registerErrors.imageFormat">
              *  El formato de Imagen no es permitido (Solo "jpg", "png" o "jpeg")
              </p>
              <p class="text-xs text-red-500 font-medium italic mb-1" for="name-create" :hidden="registerErrors.imageSize">
              *  Imagen muy pesada (M??x. 1.5MB)
              </p>
              
            </div>

            <!-- Profile Pic - Image Chooser -->
            <div class="flex justify-center sm:col-span-2">
              <input id="image-input" class="hidden" accept="image/jpeg, image/png, image/jpg" type="file" @change="uploadImage">
          
              <img
              @click="clickInput"
                class="rounded-full 
                w-[64px]
                h-[64px]
                cursor-pointer hover:grayscale ease-in-out duration-300 active:grayscale-0"
                :src="`${previewImage}`"
                width="64"
                height="64"
                :alt="'Foto de perfil'"
              />
            </div>
            
            <!-- Name Input + Label -->
            <div>
              <label class="block text-sm font-medium mb-1 mt-2" for="name">
                Nombre y Apellido
              </label>
              <p class="text-xs text-red-500 font-medium italic mb-1 mt-2" for="name-create" :hidden="registerErrors.name">
                *  El nombre no puede estar vac??o
              </p>
              <input id="name" class="form-input w-full" type="text" v-model="newUser.name"/>
            </div>
          
            <!-- Mail Input + Label -->
            <div>
              <label class="block text-sm font-medium mb-1 mt-2" for="email"
                >Correo</label
              >
              <p class="text-xs text-red-500 font-medium italic mb-1 mt-2" for="name-create" :hidden="registerErrors.mail">
                *  El correo no es v??lido
              </p>
              <input id="email" class="form-input w-full" type="text" v-model="newUser.email"/>
            </div>

            
            <!-- Cellphone Input + Label -->
            <div>
              <label class="block text-sm font-medium mb-1" for="cellphone"
                >Celular
              </label>
              <p class="text-xs text-red-500 font-medium italic mb-1 mt-2" for="name-create" :hidden="registerErrors.cellphone">
                *  El nro. celular no es v??lido
              </p>
          
              <input id="cellphone" class="form-input w-full" type="text" v-model="newUser.phoneNumber" />
            </div>

           
            <!-- Password Input + Label -->
            <div>
              <label class="block text-sm font-medium mb-1" for="password"
                >Clave
              </label>
              <p class="text-xs text-red-500 font-medium italic mb-1 mt-2" for="name-create" :hidden="registerErrors.password">
                *  La clave no puede estar vac??a
              </p>
              <p class="text-xs text-red-500 font-medium italic mb-1 mt-2" for="name-create" :hidden="registerErrors.passwordValid">
                *  Minimo 6 caracteres
              </p>

              <input id="password" class="form-input w-full" type="password" v-model="newUser.password"/>
            </div>

            <!-- Confirmation Input + Label -->
            <div>
              <label class="block text-sm font-medium mb-1" for="confirm_password">
                Confirmar Clave
              </label>
              <p class="text-xs text-red-500 font-medium italic mb-1 mt-2" for="name-create" :hidden="registerErrors.passwordConfirm">
                *  Las claves no coinciden
              </p>

              <input id="confirm_password" class="form-input w-full" type="password" v-model="confirmation"/>
            </div>

             <!-- Role Select + Label -->
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

