<template>
 
  <div
    v-for="view in views"
    :key="`ViewCard-${view.id}-${busy}`"
    class="
      hover:scale-105
      duration-300
      relative
      col-span-full
      sm:col-span-6
      xl:col-span-3
      bg-white
      shadow-lg
      rounded-sm
      border border-slate-200
      overflow-hidden
    "
  >
    <!-- Image -->
    <img
      class="absolute w-full h-full object-cover"
      :src="getxImage(view?.image_url)"
      width="286"
      height="160"
      alt="Application 17"
    />
    <!-- Gradient -->
    <div
      class="absolute inset-0 bg-gradient-to-t from-slate-800 to-transparent"
      aria-hidden="true"
    ></div>
    <!-- Content -->
    <router-link class="relative h-full p-5 flex flex-col justify-end"
    :to="'/ecommerce/workspace/'+view.id">
      <h3 class="text-lg text-white font-semibold mt-16 mb-0.5">
        {{view.name}}
      </h3>
      <span
        class="text-sm font-medium text-indigo-400 hover:text-indigo-300">
        Ingresar -&gt;
        </span>
    </router-link>
    <div :class="busy? '':'cursor-pointer'" class="m-1.5 absolute right-2 top-2">
      <!-- Start -->
      <div
        v-if="!editting"
        @click="toggleVisibility(view.id)"
        :class="`${view.isVisible ? getVisible : getInvisible}`"
      >
        {{view.isVisible? 'Visible':'Invisible'}}
      </div>
      <div v-else class="space-x-1 bg-white rounded-full px-2">
        <button @click.stop="$emit('open-edit', view)" class="text-slate-400 hover:text-slate-500 rounded-full">
          <span class="sr-only">Editar</span>
          <svg class="w-8 h-8 fill-current" viewBox="0 0 32 32">
            <path
              d="M19.7 8.3c-.4-.4-1-.4-1.4 0l-10 10c-.2.2-.3.4-.3.7v4c0 .6.4 1 1 1h4c.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4l-4-4zM12.6 22H10v-2.6l6-6 2.6 2.6-6 6zm7.4-7.4L17.4 12l1.6-1.6 2.6 2.6-1.6 1.6z" />
          </svg>
        </button>
       
        <button class="text-rose-500 hover:text-rose-600 rounded-full" @click="$emit('open-delete', view)">
          <span class="sr-only">Borrar</span>
          <svg class="w-8 h-8 fill-current" viewBox="0 0 32 32">
            <path d="M13 15h2v6h-2zM17 15h2v6h-2z" />
            <path
              d="M20 9c0-.6-.4-1-1-1h-6c-.6 0-1 .4-1 1v2H8v2h1v10c0 .6.4 1 1 1h12c.6 0 1-.4 1-1V13h1v-2h-4V9zm-6 1h4v1h-4v-1zm7 3v9H11v-9h10z" />
          </svg>
        </button>
      </div>
    </div>
    
  </div>

</template>

<script>
import axios from 'axios'
import getImage from '../../composables/useResources';
import ModalBlank from '../../components/ModalBlank.vue'
const fileURL = "https://itso.ga/v1/posts/file/"
    
export default {
  
  name: "ViewCards",
  props: ['xviews','editting'],
  components: {
    ModalBlank
  },
  data() {
    return {
      views: this.$props.xviews,
      busy: false,
      deleteViewModalOpen: false,
      editViewModalOpen: false
    }
  },
  emits: ['update-list','open-delete', 'open-edit'],
  computed: {
    

    getVisible() {
      return "text-xs inline-flex font-medium bg-emerald-100 text-emerald-600 rounded-full text-center px-2.5 py-1"
    },
    getInvisible() {
      return "text-xs inline-flex font-medium bg-slate-700 text-slate-100 rounded-full text-center px-2.5 py-1"
    }
  },
  methods: {
   
     getxImage(string) {
      
      return getImage(string);
     },
    toggleVisibility(id) {
      let page = this.views?.find(view => view.id === id )
      let name = page.name
      let state = page.isVisible
      if (state)
      {
        state = 'false';
      }
      else {
        state = 'true'
      }
      this.updateVisibility(id,name,state);
    },
    updateVisibility(id, oldname,newStatus){
      this.busy = true;
      axios.patch(import.meta.env.VITE_API_URL+'pages/'+id, 
        {
          name: oldname,
          isVisible: newStatus
        }
      ).then((res)=>{
          const newViews = this.views?.map((view) => {
              let nview = view.id == id ? {...view, isVisible: res.data.isVisible} : view
              return nview
            });
            
          this.views = newViews
          this.$emit('update-list');
          this.busy = false
          
          
        })
        .catch((err)=>{ 
          this.busy = false;
          console.log(err)
          });
    },
    openDelete() {
      this.deleteViewModalOpen = true;
    }
  },
  mounted() {
  }
};
</script>