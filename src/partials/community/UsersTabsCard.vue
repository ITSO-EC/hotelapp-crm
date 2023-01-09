<template>
  <div
    class="
      col-span-full
      sm:col-span-6
      xl:col-span-3
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
          <EditMenu align="right" class="absolute top-0 right-0 inline-flex">
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
                >Editar perfil</button
              >
            </li>
         

            <li v-if="item.allowQualify"><button  
              @click="editUser({allowQualify: false}, item.id).then((res)=>initializeAdmins())"
              class="
                  font-medium
                  text-sm text-rose-500
                  hover:text-rose-600
                  flex
                  py-1
                  px-3
                ">Prohibir Review</button></li>
            <li v-else  ><button 
              @click="editUser({allowQualify: true}, item.id).then((res)=>initializeAdmins())"
              
              class="
                  font-medium
                  text-sm text-emerald-500
                  hover:text-emerald-600
                  flex
                  py-1
                  px-3
                "> Habilitar Review</button></li>
            
                
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
                >Eliminar</button
              >
            </li>
          </EditMenu>
        </div>
        <!-- Image + name -->
        <header>
          <div class="flex justify-center mb-2">
            <div              
            class="relative inline-flex items-start"
            >
            
              <img
                class="rounded-full w-[64px] h-[64px] object-cover"
                :src="`${itemRef.profileImageUrl ? getImage(itemRef.profileImageUrl): previewImage}`"
                width="64"
                height="64"
                :alt="item.name"
              />
            </div>
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
          <div class="flex justify-center items-center">
            <span class="text-sm font-medium text-slate-400 -mt-0.5 mr-1"
              >-&gt;</span
            >
            <span>{{ item.role =="admin"? 'Staff':'User' }}</span>
          </div>
        </header>
        <!-- Bio -->
        <div class="text-center mt-2">
          <div class="text-sm">{{ item.email }}</div>
        </div>
      </div>
      
    </div>
    <!-- Edit Profile -->
    <ModalBasic
      :modalOpen="basicModalOpen"
      @close-modal="basicModalOpen = false"
      title="Editar Staff"
    >
      <!-- Modal content -->
      <div class="px-5 pt-4 pb-1">
        <div class="text-sm">
          <div class="font-medium text-slate-800 mb-2">
            Para cambiar la foto de perfil, haga click sobre ella.
          </div>

          <!-- Form Start -->
          <div class="space-y-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            
             <!-- Image - Error Messages -->
             <div class="flex flex-col">
              <p class="text-xs text-red-500 font-medium italic mt-2" for="name-create" :hidden="editErrors.imageFormat">
              *  El formato de Imagen no es permitido (Solo "jpg", "png" o "jpeg")
              </p>
              <p class="text-xs text-red-500 font-medium italic mb-1" for="name-create" :hidden="editErrors.imageSize">
              *  Imagen muy pesada (Máx. 1.5MB)
              </p>
              
            </div>

            <!-- Profile Pic - Image Chooser -->  
            <div class="flex justify-center sm:col-span-2">
              <input :id="`image-input-${item.id}`" class="hidden" accept="image/jpeg, image/png, image/jpg" type="file" @change="uploadImage">
              
              <img
                class="rounded-full 
                cursor-pointer 
                hover:grayscale ease-in-out duration-300 active:grayscale-0 
                w-[64px] 
                h-[64px] 
                object-cover"
                :src="`${itemRef.profileImageUrl ? getImage(itemRef.profileImageUrl): previewImage}`"
                @click.stop="clickInput()"
                width="64"
                height="64"
                :alt="item.name"
              />
            </div>
            
            <!-- Name Input + Label -->
            <div>
              <label class="block text-sm font-medium mb-1 " :for="`name-${item.id}`">
                Nombre
              </label>
              <p class="text-xs text-red-500 font-medium italic mb-1 mt-2" for="name-create" :hidden="editErrors.name">
                *  El nombre no puede estar vacío
              </p>

              <input :id="`name-${item.id}`" class="form-input w-full" type="text" v-model="itemRef.name" />
            </div>
            
            <!-- Mail Input + Label -->
            <div>
              <label class="block text-sm font-medium mb-1 " :for="`email-${item.id}`">
                Correo
              </label>
              <p class="text-xs text-red-500 font-medium italic mb-1 mt-2" for="name-create" :hidden="editErrors.mail">
              *  El correo no es válido
              </p>

              <input :id="`email-${item.id}`" class="form-input w-full" type="text" v-model="itemRef.email"/>
            </div>

            <!-- Cellphone Input + Label -->
            <div>
              <label class="block text-sm font-medium mb-1" :for="`cellphone-${item.id}`" >
                Celular
              </label>
              <p class="text-xs text-red-500 font-medium italic mb-1 mt-2" for="name-create" :hidden="editErrors.cellphone">
              *  El nro. celular no es válido
              </p>
              <input :id="`cellphone-${item.id}`" class="form-input w-full" type="text" v-model="itemRef.phoneNumber "/>
            </div>

            <!-- Role Select + Label -->
            <div v-if="item.role!='admin'">
              <label class="block text-sm font-medium mb-1" :for="`role-${item.id}`" 
                >Rol</label
              >
              <select :id="`role-${item.id}`" class="w-full form-select" :value="item.role">
                <option value="admin">Admin</option>
                <option value="user">Huesped</option>
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
            @click.stop="basicModalOpen = false"
          >
            Cancelar
          </button>
          <button 
          @click="updateUser"
          :disabled="!isNewUserValid || loading"
          class="btn-sm disabled:bg-indigo-300 bg-indigo-500 hover:bg-indigo-600 text-white">
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

  
    <!-- Delete Profile -->
    <ModalBlank
      id="danger-modal"
      :modalOpen="dangerModalOpen"
      @close-modal="dangerModalOpen = false"
    >
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
              ¿Está seguro que desea eliminar este perfil?
            </div>
          </div>
          <!-- Modal content -->
          <div class="text-sm mb-10">
            <div class="space-y-2">
              <p>Considere que esta acción es irreversible.</p>
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
            @click.stop="deleteUser(item.id); dangerModalOpen=false"
            class="btn-sm bg-rose-500 hover:bg-rose-600 text-white">
              Si, eliminar
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
import {useRouter,useRoute} from 'vue-router';
import EditMenu from "../../components/DropdownEditMenu.vue";
import ModalBasic from "../../components/ModalBasic.vue";
import ModalBlank from '../../components/ModalBlank.vue'

//Composables
import useResources from '../../composables/useResources'
import useAdmins from "../../composables/useAdmins";
import useAuth from "../../composables/useAuth";

//Media
import DefaultImage from '../../images/user-avatar-80.png'

//////////////////////////////////////////
//Variables + Refs Init
//////////////////////////////////////////
//Vue Related Init
const props = defineProps(['item']);
const router = useRouter();
const route = useRoute();
const emits = defineEmits(['edit-profile'])

//Composables Init
const {getImage} = useResources()
const { editUser, loading} = useAuth();
const {deleteUser, initializeAdmins} = useAdmins();

//Refs Init
const basicModalOpen = ref(false);
const roleModalOpen = ref(false);
const dangerModalOpen = ref(false);
const previewImage = ref(DefaultImage);

const isNewUserValid = ref(false);
const itemRef = ref({
  name:props.item.name,
  email:props.item.email,
  phoneNumber: props.item.phoneNumber,
  profileImageUrl: props?.item?.profileImageUrl || '',
  imageUrl : props?.item?.imageUrl || []
});
const newUser = ref({
  
})
  //Edit Modal Errors
const editErrors = ref({
  imageFormat: true,
  imageSize: true,
  name: true,
  mail: true,
  cellphone: true,
})

//////////////////////////////////////////
//Component Functionality 
//////////////////////////////////////////
//Core Actions - CRUD / Specific Actions
const updateUser = async() => {
  newUser.value.name = itemRef.value.name
  newUser.value.email = itemRef.value.email
  newUser.value.phoneNumber = itemRef.value.phoneNumber
  await editUser(newUser?.value, props?.item?.id);

  basicModalOpen.value = false;
  emits('edit-profile');

  await initializeAdmins();
}

const resetErrors = () => {
  editErrors.value.imageFormat = false;
  editErrors.value.imageSize = false;
  editErrors.value.name = false;
  editErrors.value.mail = false;
  editErrors.value.cellphone = false;
}

const checkValidUser = () => {
  isNewUserValid.value = false;

  if(loading.value) {
    isNewUserValid.value = false
    return;
  };

  let valid = true;
  Object.entries(editErrors.value).forEach(([key, value]) => {
    if(!value && key != "imageFormat" && key != "imageSize") {
      valid = false;
      return;
    }
  });

  if(valid) isNewUserValid.value = true;

}

// Edit Form Validation
const phoneNumberRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
watch(itemRef.value, (currentValue) => {
    (currentValue.name.length > 0) ? editErrors.value.name = true : editErrors.value.name = false;
    (phoneNumberRegex.exec(currentValue.phoneNumber)!=null) ? editErrors.value.cellphone = true : editErrors.value.cellphone = false;
    (emailRegex.exec(currentValue.email)!=null) ? editErrors.value.mail = true : editErrors.value.mail = false;
    checkValidUser();
  }
);


//Utils - UI / Parsing / Any Other Un-Specific Component Action
const clickInput = () => {
  let input = document.querySelector(`#image-input-${props.item.id}`)
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
      editErrors.value.imageFormat = true;
      
      if(imageSize < 1.5) {
        editErrors.value.imageSize = true;  
        newUser.value.file = e.target.files[0];
        itemRef.value.profileImageUrl = null;
        props.customer.profileImageUrl = null;
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = e =>{
          previewImage.value = e.target.result;
        };
      }  
      else {
        editErrors.value.imageSize = false;
      }
      
    }
    else {
      editErrors.value.imageFormat = false;
    }
    
  }
  
}




</script>