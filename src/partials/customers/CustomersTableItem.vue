<template>
  <tr :key="customer.id" class="text-center">
    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
      <div class="first:text-left">{{customer.name}}</div>
    </td>
  
    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
      <div class="">{{customer.phoneNumber || '---'}}</div>
    </td>
   
    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
      <div class="text-center">{{customer.email}}</div>
    </td>
    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
      <div class=" font-medium text-sky-500">{{convertDate(customer.updatedAt)}}</div>
    </td>
    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
      <div class=" font-medium text-emerald-500">{{customer.room?.number || '---'  }}</div>
    </td>
    
    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
      <!-- Menu button -->
      <EditMenu align="right" class="absolute -mt-4 -ml-4">
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
                >Editar Cliente</button
              >
            </li>
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
    </td>

    <!-- Edit Customer -->
    <ModalBasic
      :modalOpen="basicModalOpen"
      @close-modal="basicModalOpen = false"
      title="Editar datos de cliente"
    >
      <!-- Modal content -->
      <div class="px-5 pt-4 pb-1">
        <div class="text-sm">
         
          <div class="space-y-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="flex justify-center sm:col-span-2">
              <input :id="`image-input-edit-${customer.id}`" class="hidden" accept="image/jpeg, image/png, image/jpg" type="file" @change="uploadImage">
          
              <img
                @click="clickInput"
                class="rounded-full cursor-pointer hover:grayscale ease-in-out duration-300 active:grayscale-0"
                :src="customer.profileImageUrl? `${getImage(customer.profileImageUrl)}`: `${previewImage}`"
                width="64"
                height="64"
                :alt="'Foto de perfil'"
              />
            </div>
            <!-- Start -->
            <div class="mt-2">
              <label class="block text-sm font-medium mb-1 " :for="`name-${customer.id}`"
                >Nombre</label
              >
              <input :id="`name-${customer.id}`" class="form-input w-full" type="text" v-model="newUser.name" />
            </div>
            <!-- Start -->
            <div>
              <label class="block text-sm font-medium mb-1 " :for="`email-${customer.id}`"
                >Correo</label
              >
              <input :id="`email-${customer.id}`" class="form-input w-full" type="text" v-model="newUser.email" />
            </div>
            <!-- Start -->
            <div>
              <label class="block text-sm font-medium mb-1 " :for="`cellphone-${customer.id}`"
                >Celular</label
              >
              <input :id="`cellphone-${customer.id}`" class="form-input w-full" type="text" v-model="newUser.phoneNumber" />
            </div>
            <!-- select -->
            <div v-if="rooms">
              <label class="block text-sm font-medium mb-1" :for="`room-${customer.id}`" 
                >Habitación</label
              >
              <select :id="`room-${customer.id}`" class="w-full form-select" v-model="newUser.room">
                <option v-for="room in rooms" :key="`room-${room?.id}`" :value="room.id">{{room?.number}}</option>
                
              
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
          <button @click.stop="editUserLocal()" class="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white">
            Guardar
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
              ¿Está seguro que desea eliminar este cliente?
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
            <button @click.stop="deleteUser(customer.id); dangerModalOpen = false" class="btn-sm bg-rose-500 hover:bg-rose-600 text-white">
              Si, eliminar
            </button>
          </div>
        </div>
      </div>
    </ModalBlank>
  </tr>  
</template>

<script setup>
import useUsers from '../../composables/useUsers';
import useAuth from '../../composables/useAuth';
import EditMenu from "../../components/DropdownEditMenu.vue";
import { defineProps, onMounted,ref } from 'vue';

import ModalBasic from "../../components/ModalBasic.vue";
import ModalBlank from '../../components/ModalBlank.vue'

//Usado para el input de imagenes
import DefaultImage from '../../images/user-avatar-80.png'
import { useRouter, useRoute } from 'vue-router'
import useResources from '../../composables/useResources'
import useRooms from '../../composables/useRooms'
const previewImage = ref(DefaultImage);
const {getImage} = useResources()
const router = useRouter();
const route = useRoute();
////
const {  deleteUser,initializeClients } = useUsers();
const { editUser } = useAuth();
const props = defineProps(['customer', 'value', 'selected'])
const { rooms, initializeRooms, updateRoom } = useRooms();
const basicModalOpen = ref(false);
const dangerModalOpen = ref(false);

const newUser = ref({
  name: props.customer?.name,
  email: props.customer?.email,
  room: props.customer?.room?.id,
  phoneNumber: props.customer?.phoneNumber,
  // notificationApp: props.customer.notificationApp,
  // notificationEmail: props.customer.notificationEmail,
  // notificationWhatsapp: props.customer.notificationWhatsapp,
})
const displayRoom = ref({
  number: props.customer?.room
})

const convertDate = (date) => {
  const monthNames = ["Ene", "Feb", "Mar", "Abr", "May", "Jun",
  "Jul", "Ago", "Sep", "Oct", "Nov", "Dic", "Error"
];

  date = new Date(date)
  let dd = date.getDate(); 
  let mm = date.getMonth();
  let yyyy = date.getFullYear(); 
  if(dd<10){dd='0'+dd} 
  return date = dd+'-'+monthNames[mm]+'-'+yyyy
}

const emits = defineEmits(['edit-customer'])



const editUserLocal = async () => {
  if(!rooms.value) await initializeRooms();

  await editUser(newUser.value, props?.customer?.id)
  if(newUser.value.room) {
      let resultRoom = rooms.value.find((roomsel)=>roomsel.id == newUser.value.room);
      if(resultRoom)
      {
        let usersList = [...resultRoom.users];
        usersList.push(props?.customer?.id);
        
        await updateRoom({users: usersList},resultRoom.id);
    
      }
      }
  
  basicModalOpen.value = false;
  emits('edit-customer');
  await initializeClients();

}


const clickInput = () => {
  const input = document.querySelector(`#image-input-edit-${props.customer.id}`)
  console.log(props.customer.id)
  input.click();
}

const uploadImage = (e) => {
  const image = e.target.files[0];
  newUser.value.file = e.target.files[0];
  props.customer.profileImageUrl = null;

  const reader = new FileReader();
  reader.readAsDataURL(image);
  reader.onload = e =>{
  previewImage.value = e.target.result;
  ;
  };
}

</script>
