<template>
  <tr :key="myorders.length">
    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
      <div class="text-left">{{customer.name}}</div>
    </td>
    
    <!-- <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
      <div class="flex items-center">
        <div class="w-10 h-10 shrink-0 mr-2 sm:mr-3">
          <img class="rounded-full" :src="customer.image" width="40" height="40" :alt="customer.name" />
        </div>
        <div class="font-medium text-slate-800">{{customer.name}}</div>
      </div>
    </td> -->
    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
      <div class="text-left">{{customer.phone_number}}</div>
    </td>
   
    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
      <div class="text-center">{{myorders}}</div>
    </td>
    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
      <div class="text-left font-medium text-sky-500">{{convertDate(customer.updatedAt)}}</div>
    </td>
    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
      <div class="text-left font-medium text-emerald-500">{{myprice}}</div>
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
            
            <!-- Start -->
            <div class="mt-2">
              <label class="block text-sm font-medium mb-1 " :for="`name-${customer.id}`"
                >Nombre Completo</label
              >
              <input :id="`name-${customer.id}`" class="form-input w-full" type="text" v-model="customer.name" />
            </div>
            <!-- Start -->
            <div>
              <label class="block text-sm font-medium mb-1 " :for="`name-${customer.id}`"
                >Correo</label
              >
              <input :id="`name-${customer.id}`" class="form-input w-full" type="text" v-model="customer.email" />
            </div>
            <!-- Start -->
            <div>
              <label class="block text-sm font-medium mb-1 " :for="`name-${customer.id}`"
                >Celular</label
              >
              <input :id="`name-${customer.id}`" class="form-input w-full" type="text" v-model="customer.phone_number" />
            </div>
            <!-- select -->
            <div v-if="customer.role =='member' || customer.role=='user'">
              <label class="block text-sm font-medium mb-1" :for="`role-${customer.id}`" 
                >Rol {{customer.role}}</label
              >
              <select :id="`role-${customer.id}`" class="w-full form-select" v-model="customer.role">
                <option value="user">Usuario</option>
                <option value="member">Miembro</option>
              
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
import useOrders from '../../composables/useOrders';
import useUsers from '../../composables/useUsers';
import EditMenu from "../../components/DropdownEditMenu.vue";
import { defineProps, onMounted,ref } from 'vue';

import ModalBasic from "../../components/ModalBasic.vue";
import ModalBlank from '../../components/ModalBlank.vue'

const {orders, retrieveOrdersByUser} = useOrders();
const { editUser, deleteUser } = useUsers();
const props = defineProps(['customer', 'value', 'selected'])

const basicModalOpen = ref(false);
const dangerModalOpen = ref(false);

const newUser = ref({
  name: null,
  email: null,
  role: null,
  phone_number: null,
  // notificationApp: props.customer.notificationApp,
  // notificationEmail: props.customer.notificationEmail,
  // notificationWhatsapp: props.customer.notificationWhatsapp,
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

//OPTIMIZABLE
//TEMPORAL HASTA QUE SE USE EL QUERY... REMOVER
const myorders = ref(0)
const myprice = ref(0)
const myrefunds = ref(0)
async function filterById() {
  let data = await retrieveOrdersByUser(props.customer.id);
  data = data?.data
  // let neworders = [...results?.value]
  // data.results.filter(order=>order.user==props.customer.id)
  
  let thisorders = data.totalResults;
  let refunds = data.results?.reduce((totalValue, currentOrder)=>currentOrder.type=='refunded'? totalValue + 1 : totalValue, 0)
  let price = data.results?.reduce((totalValue, currentOrder)=>currentOrder.type=='subscribed'? totalValue+currentOrder.price : totalValue, 0)
  
  

  myprice.value = price;
  myorders.value = thisorders-refunds;
  myrefunds.value = refunds;
}

function getRole(role) {
  switch(role) {
    case 'user':
      return "Usuario";
    case 'member':
      return "Miembro";
    default:
      return "Operador";
  }
}

const editUserLocal = () => {
  if (!newUser.value.name) newUser.value.name = props.customer.name;
  if (!newUser.value.email) newUser.value.email = props.customer.email;
  if (!newUser.value.role) newUser.value.role = props.customer.role;
  if (!newUser.value.phone_number) newUser.value.phone_number = props.customer.phone_number;

  editUser(newUser.value, props.customer.id);
  basicModalOpen.value = false;
  emits('edit-customer');

}
onMounted(()=>{
  filterById()

})
</script>
