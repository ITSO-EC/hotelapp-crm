<template>
  <tbody class="text-sm">
    <!-- Row -->
    <tr>
     
      <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div class="flex items-center text-slate-800">
          
          <div class="font-medium text-sky-500 overflow-hidden text-ellipsis w-24">{{ order.id }}</div>
        </div>
      </td>
      <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div>{{ convertDate(order.createdAt) }}</div>
      </td>
      <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div class="font-medium text-slate-800">{{ user.name }}</div>
      </td>
      <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div class="text-left font-medium text-emerald-500">
          {{order.price}}
        </div>
      </td>
      <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap pr-10 w-24">
        <div
          class="inline-flex font-medium rounded-full text-center px-2.5 py-0.5 cursor-pointer"
          :class="statusColor(order.status)"
        >
          Pendiente
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
            <h1 class="font-bold">{{order.title}}:</h1>
            {{ order.description }}
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
        case "Resuelta":
          return "bg-emerald-100 text-emerald-600";
        case "Anulada":
          return "bg-amber-100 text-amber-600";
        default:
          return "bg-slate-100 text-slate-500";
      }
    };

    const typeIcon = (type) => {
      switch (type) {
        case "subscribed":
          return `<svg class="w-4 h-4 fill-current text-slate-400 shrink-0 mr-2" viewBox="0 0 16 16">
              <path d="M4.3 4.5c1.9-1.9 5.1-1.9 7 0 .7.7 1.2 1.7 1.4 2.7l2-.3c-.2-1.5-.9-2.8-1.9-3.8C10.1.4 5.7.4 2.9 3.1L.7.9 0 7.3l6.4-.7-2.1-2.1zM15.6 8.7l-6.4.7 2.1 2.1c-1.9 1.9-5.1 1.9-7 0-.7-.7-1.2-1.7-1.4-2.7l-2 .3c.2 1.5.9 2.8 1.9 3.8 1.4 1.4 3.1 2 4.9 2 1.8 0 3.6-.7 4.9-2l2.2 2.2.8-6.4z" />
            </svg>`;
        default:
          return `<svg class="w-4 h-4 fill-current text-slate-400 shrink-0 mr-2" viewBox="0 0 16 16">
              <path d="M11.4 0L10 1.4l2 2H8.4c-2.8 0-5 2.2-5 5V12l-2-2L0 11.4l3.7 3.7c.2.2.4.3.7.3.3 0 .5-.1.7-.3l3.7-3.7L7.4 10l-2 2V8.4c0-1.7 1.3-3 3-3H12l-2 2 1.4 1.4 3.7-3.7c.4-.4.4-1 0-1.4L11.4 0z" />
            </svg>`;
      }
    };

    const typeText = (type) => {
      switch (type) {
        case "subscribed":
          return "Suscripción"
        case "refunded":
          return "Devolución"
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
