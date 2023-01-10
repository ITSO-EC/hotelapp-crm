<template>
  <tr :key="customer.id" class="text-center">
    
    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
      <div class="first:text-left">{{ customer?.name }}</div>
    </td>
  
    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
      <div class="">{{ customer?.phoneNumber  }}</div>
    </td>
   
    
    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
      <div class=" font-medium text-emerald-500"></div>
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
            >Cambiar Habitación</button
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
          <div class="font-medium text-slate-800 mb-2">
            {{ customer.name }}
          </div>

          <!-- Form Start -->
          <div class="space-y-2 grid grid-cols-1 sm:grid-cols-2 gap-4">

        
          
            <!-- Profile Pic - Image Chooser -->  
            <div class="flex justify-center sm:col-span-2">
              <input :id="`image-input-edit-${customer.id}`" class="hidden" accept="image/jpeg, image/png, image/jpg" type="file" @change="uploadImage">
          
              <img
                class="rounded-full 
                w-[64px]
                h-[64px]
                ease-in-out duration-300 "
                :src="customer.profileImageUrl? `${getImage(customer.profileImageUrl)}`: `${previewImage}`"
                width="64"
                height="64"
                :alt="'Foto de perfil'"
              />
            </div>

            
         
            
            <!-- Room Select + Label -->
            <div v-if="rooms" class="sm:col-span-2">
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
          <button :disabled="!isNewUserValid || loading" @click.stop="editUserLocal()" class="btn-sm disabled:bg-indigo-300 bg-indigo-500 hover:bg-indigo-600 text-white">
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
              ¿Está seguro que desea retirar al huésped de esta habitación?
            </div>
          </div>
          <!-- Modal content -->
          <div class="text-sm mb-10">
            <div class="space-y-2">
              <p>Considere que deberá reasignarlo luego.</p>
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
            <button @click.stop=" dangerModalOpen = false" class="btn-sm bg-rose-500 hover:bg-rose-600 text-white">
              Si, retíralo
            </button>
          </div>
        </div>
      </div>
    </ModalBlank>
  </tr>  
</template>

<script setup>
//////////////////////////////////////////
//Import Component Dependencies
//////////////////////////////////////////

//Vue + Components
import { defineProps, watch, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router'
import EditMenu from "../../components/DropdownEditMenu.vue";
import ViewPictures from '../customers/ViewPictures.vue'
import ModalBasic from "../../components/ModalBasic.vue";
import ModalBlank from '../../components/ModalBlank.vue'

//Composables
import useUsers from '../../composables/useUsers';
import useAuth from '../../composables/useAuth';
import useResources from '../../composables/useResources'
import useRooms from '../../composables/useRooms'

//Media
import DefaultImage from '../../images/user-avatar-80.png'


//////////////////////////////////////////
//Variables + Refs Init
//////////////////////////////////////////

//Vue Related Init
const router = useRouter();
const route = useRoute();
const props = defineProps(['customer', 'value', 'selected'])
const emits = defineEmits(['edit-customer'])

//Composables Init
const { editUser, loading } = useAuth();
const {getImage} = useResources();
const { rooms, initializeRooms, updateRoom } = useRooms();
const { deleteUser,initializeClients } = useUsers();

//Refs Init
const previewImage = ref(DefaultImage);
const basicModalOpen = ref(false);
const dangerModalOpen = ref(false);

const isNewUserValid = ref(false);
const newUser = ref({
  name: props.customer?.name,
  email: props.customer?.email,
  room: props.customer?.room,
  phoneNumber: props.customer?.phoneNumber,
  // notificationApp: props.customer.notificationApp,
  // notificationEmail: props.customer.notificationEmail,
  // notificationWhatsapp: props.customer.notificationWhatsapp,
})
const displayRoom = ref({
  number: props.customer?.room
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
const editUserLocal = async () => {
  if(!rooms.value) await initializeRooms();
  
  //Remove previous room
  if (props.customer.room) {
    let resultRoom = rooms.value.find((roomsel)=>roomsel.id == props?.customer?.room);
    if(resultRoom)
    {
      let usersList = 
      resultRoom.users.map((currentUser)=>  currentUser.id);
      usersList = usersList.filter((currentUserId)=> currentUserId != props.customer.id )
      await updateRoom({users: usersList},resultRoom.id);
  
    }
  }

  await editUser(newUser.value, props?.customer?.id)
  
  //Set new room
  if(newUser.value.room) {
      let resultRoom = rooms.value.find((roomsel)=>roomsel.id == newUser.value.room);
      if(resultRoom)
      {
        let usersList = 
        resultRoom.users.map((currentUser)=> currentUser.id );
        if(!usersList.includes(props?.customer?.id)) usersList.push(props?.customer?.id);
        await updateRoom({users: usersList},resultRoom.id);
    
      }
    }
  
  basicModalOpen.value = false;
  emits('edit-customer');
  await initializeClients();

}

const getCheckout = (roomNumber) => {
  //Assuming rooms is not empty !!CORRECT  

  if(roomNumber == "---") return "---";
  const resultRoom = rooms?.value?.find(item => item.number == roomNumber);
  return convertDate(resultRoom?.checkOutTime);
  //TODO - Get checkout time

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
watch(newUser.value, (currentValue) => {
    (currentValue.name.length > 0) ? editErrors.value.name = true : editErrors.value.name = false;
    (phoneNumberRegex.exec(currentValue.phoneNumber)!=null) ? editErrors.value.cellphone = true : editErrors.value.cellphone = false;
    (emailRegex.exec(currentValue.email)!=null) ? editErrors.value.mail = true : editErrors.value.mail = false;
    checkValidUser();
  }
);
//Utils - UI / Parsing / Any Other Un-Specific Component Action
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
</script>
