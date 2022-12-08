<template>
  <tbody class="text-sm">
    <!-- Row -->
    <tr>
     
      <td class="px-2 first:pl-5 py-3 whitespace-nowrap hidden md:table-cell">
          
        <span class="font-medium text-sky-500">{{ convertDate(order.createdAt) }}</span>
       
      </td>
      <td class="px-2 py-3 whitespace-nowrap">
        <div>{{ convertTime(order.createdAt) }}</div>
      </td>
      <td class="px-2 pl-6 py-3 whitespace-nowrap">
        <div class="font-medium text-slate-800">{{ user.name }}</div>
      </td>
      <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div class="pl-12 font-medium text-emerald-500">
          112
        </div>
      </td>
      <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap pr-10 w-24">
        <div
          class="inline-flex font-medium rounded-full text-center px-2.5 py-0.5 cursor-pointer"
          :class="statusColor(order.status)"
        >
          {{getStatusText(order.status)}}
        </div>
      </td>
    
    
      <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
        <div class="flex items-center">
          
          <!-- <BaseIcon :name="'trash'" class="cursor-pointer" @click="deleteOrderLocal(order.id)"/> -->
          <button
            class="text-slate-400 hover:text-slate-500 transform"
            :class="descriptionOpen && 'rotate-180'"
            :aria-expanded="descriptionOpen"
            @click.prevent="descriptionOpen = !descriptionOpen"
            :aria-controls="`description-${order.id}`"
          >
            <span class="sr-only">Menu</span>
            <svg class="w-8 h-8 fill-current" viewBox="0 0 32 32">
              <path d="M16 20l-5.4-5.4 1.4-1.4 4 4 4-4 1.4 1.4z" />
            </svg>
          </button>
        </div>
      </td>
    </tr>
    <!--
    Example of content revealing when clicking the button on the right side:
    Note that you must set a "colSpan" attribute on the <td> element,
    and it should match the number of columns in your table
    -->
    <tr
      :id="`description-${order.id}`"
      role="region"
      :class="!descriptionOpen && 'hidden'"
    >
      
      <td colspan="10" class="px-2 first:pl-5 last:pr-5 py-3">

        <div class="flex items-center bg-slate-50 p-3 -mt-3">
          
          <svg class="w-4 h-4 shrink-0 fill-current text-slate-400 mr-2">
            <path
              d="M1 16h3c.3 0 .5-.1.7-.3l11-11c.4-.4.4-1 0-1.4l-3-3c-.4-.4-1-.4-1.4 0l-11 11c-.2.2-.3.4-.3.7v3c0 .6.4 1 1 1zm1-3.6l10-10L13.6 4l-10 10H2v-1.6z"
            />
          </svg>
          
          <div class="italic">
            <h1 class="font-bold">Titulo:</h1>
            Descri
          </div>
        </div>
      </td>
    </tr>
  </tbody>
</template>
<script setup>
  import useOrders from "../../composables/useOrders";
  import useUsers from "../../composables/useUsers";
  import getImage from "../../composables/useResources"
  import BaseIcon from "../../components/BaseIcon.vue";
  import { onMounted } from "vue";

  import { ref } from 'vue'

  const user = ref({});
  const { selectedUser, retrieveUserById, initializeUsers} = useUsers();
  const { deleteOrder } = useOrders();
  onMounted(()=>{
    user.value = retrieveUserById(props.order.user);
    
  })

  

  const props = defineProps(['order', 'value'])
  const convertTime = (date) => {
    date = new Date(date)
    let time = date.toLocaleTimeString();
    return time;
  }


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
  const descriptionOpen = ref(false);

  const statusColor = (status) => {
      switch (status) {
        case "finished":
          return "bg-emerald-100 text-emerald-600";
        case "pending":
          return "bg-amber-100 text-amber-600";
        case "rejected":
          return "bg-red-100 text-red-600";
        default:
          return "bg-slate-100 text-slate-600";
      }
  };

  const getStatusText = (status) => {
      switch (status) {
        case "finished":
          return "Resuelto";
        case "pending":
          return "En Proceso";
        case "rejected":
          return "Cancelado";
        default:
          return "Pendiente";
      }
  };

    
  const getFileType = () => {
    let arr = props.order.file_url?.split('.')
      return arr[arr.length-1]
  }

    function deleteOrderLocal(id) {
      deleteOrder(id);
    }

</script>
