<template>
  <div class="flex h-screen overflow-hidden">

    <!-- Sidebar -->
    <Sidebar :sidebarOpen="sidebarOpen" @close-sidebar="sidebarOpen = false" />

    <!-- Content area -->
    <div class="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        
      <!-- Site header -->
      <Header :sidebarOpen="sidebarOpen" @toggle-sidebar="sidebarOpen = !sidebarOpen" />
      <Toast :type="'error'" :open="error && !loading" @close-toast="error=null; successtoast=false" class="fixed z-40 mt-16 w-1/3">{{error?.response?.data ? `Error ${error.response.data?.code}: ${error.response.data.message}`:`Unknown Error`}}</Toast>
      <Toast :type="'success'" :open="successtoast && !error && !loading" @close-toast="successtoast = false" class="fixed z-50 mt-16 w-1/3">Post Creado Exitosamente</Toast>
    
      <main>
        <div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
          <div class=" w-full h-44 absolute overflow-y-hidden -my-8 -mx-4 sm:-mx-6 lg:-mx-8 z-0">
            <img class="w-screen" :src="getImage(selectedView?.image_url)" alt="portada">
            <!-- https://images.unsplash.com/photo-1542435503-956c469947f6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80 -->
          </div>
          <!-- Page header -->
          <div class="sm:flex sm:justify-between sm:items-center mb-8 h-44">
            <!-- Left: Title and subtitle -->
            <div class="-mx-4 sm:-mx-6 lg:-mx-8 px-8 pl-4 rounded sm:mb-4 md:mb-8 z-10 backdrop-blur-md bg-white/30 w-full sm:w-1/2">
              <input type="text" class="w-full h-auto text-2xl md:text-3xl text-slate-900 font-bold bg-transparent 
                appearance-none
                active:ring-0 focus:ring-0 ring-0
                border-none
                " :value="selectedView?.name"/>
                <input type="text" class="block -mt-4 text-lg md:text-xl text-slate-600 font-bold bg-transparent 
                appearance-none
                active:ring-0 focus:ring-0 ring-0
                border-none
                " value="Subtitulo Creativo"/>
                
                <input type="text" disabled class="block text-md md:text-lg text-slate-600 bg-transparent 
                appearance-none
                active:ring-0 focus:ring-0 ring-0
                border-none
                " :value="`Últ.Act.: ${convertDate(selectedView?.updatedAt)}`"/>
                
              <h3 class="text-md md:text-lg text-slate-600 font-bold mt-4"></h3>
            </div>
            <div class="flex z-10 gap-4"> 
              <!-- Edit button -->
              <button class="btn bg-white hover:bg-slate-200 text-black z-10">
                
                <span class="" @click.stop="registerModalOpen = true">Cambiar Foto</span>
              </button>   
            
            </div>
                   

          </div>
          <!-- Page content -->
          <div class="absolute w-full flex flex-col space-y-10 sm:space-x-6 sm:space-y-0 md:flex-col md:space-x-0 md:space-y-10 xl:flex-row xl:space-x-6 xl:space-y-0 mt-2">

            
            <!-- Sidebar -->
            <CategorySidebar class=" pr-7 sm:pr-16 md:pr-12 lg:pr-16 xl:pr-2"/>

            <!-- Content -->
            <div  v-if="$route.params.categoryId" :key="$route.fullPath" class="w-full pr-7 sm:pr-16 md:pr-12 lg:pr-16">

                  
              <!-- More actions -->
              <div  class="sm:flex sm:justify-between sm:items-center mb-5 w-full">
                <!-- Left side -->
                <div class="mb-4 sm:mb-0">
                    <ul class="flex flex-wrap -m-1">
                        <!-- <li class="m-1">
                            <button class="inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-transparent shadow-sm bg-indigo-500 text-white duration-150 ease-in-out">
                              Todas <span class="ml-1 text-indigo-200">{{results}}</span></button>
                        </li> -->
                        <li class="m-1">
                            <button class="inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-slate-200 hover:border-slate-300 shadow-sm bg-white text-slate-500 duration-150 ease-in-out">
                              Todas <span class="ml-1 text-slate-400">{{results}}</span></button>
                        </li>
                        <li class="m-1" v-if="countApprovedII()">
                            <button class="inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-slate-200 hover:border-slate-300 shadow-sm bg-white text-slate-500 duration-150 ease-in-out">
                              Aprobado II <span class="ml-1 text-slate-400">{{countApprovedII()}}</span></button>
                        </li>
                        <li class="m-1" v-if="countApprovedI()">
                            <button class="inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-slate-200 hover:border-slate-300 shadow-sm bg-white text-slate-500 duration-150 ease-in-out">
                              Aprobado I <span class="ml-1 text-slate-400">{{countApprovedI()}}</span></button>
                        </li>
                        <li class="m-1" v-if="countPending()">
                            <button class="inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-slate-200 hover:border-slate-300 shadow-sm bg-white text-slate-500 duration-150 ease-in-out">
                              Pendiente <span class="ml-1 text-slate-400">{{countPending()}}</span></button>
                        </li>
                        <li class="m-1" v-if="countCorrect()">
                            <button class="inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-slate-200 hover:border-slate-300 shadow-sm bg-white text-slate-500 duration-150 ease-in-out">
                              Corregir <span class="ml-1 text-slate-400">{{countCorrect()}}</span></button>
                        </li>
                    </ul>
                </div>
                <!-- Right: Actions  -->
                <div  class="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                  <!-- Search form -->
                  <!-- <SearchForm placeholder="Buscar Publicación" /> -->
                  <!-- Create post button -->
                  <button 
                  @click.stop="createPostButton = true"
                  class="btn bg-indigo-500 hover:bg-indigo-600 text-white">
                    <svg class="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
                      <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                    </svg>
                    <span class="hidden xs:block ml-2">Crear Publicación</span>
                  </button>
                </div>           
              </div>

             
              <!-- Cards 1 (Video Courses) -->
              <div class="sm:-ml-6 md:-ml-0">
                
                <!-- Table -->
                <PostsTable @trigger-success="triggerSuccess()" @close-create="createPostButton = false" @change-selection="updateSelectedItems($event)" :key="createPostButton" :create-button="createPostButton" />

              </div>

              <!-- Pagination -->
              <div class="mt-6">
                <PaginationClassic v-if="results > 9" :items="posts.length" :results="results" :type="'posts'"/>
              </div>

            </div>

          </div>

        </div>        
      </main>

    </div> 
    
   

    
    
  </div>
</template>

<script setup>
  import Toast from '../../components/Toast.vue'
import { onMounted, ref, watch } from 'vue'
import Sidebar from '../../partials/Sidebar.vue'
import SearchForm from '../../components/SearchForm.vue'
import Header from '../../partials/Header.vue'
import CategorySidebar from '../../partials/ecommerce/CategorySidebar.vue'
import ShopCards07 from '../../partials/ecommerce/ShopCards07.vue'
import PostsTable from '../../partials/posts/PostsTable.vue'
import PaginationClassic from '../../components/PaginationClassic.vue'
import axios from 'axios'
import ModalBasic from '../../components/ModalBasic.vue'
import { useRouter, useRoute } from 'vue-router'
import useViews from '../../composables/useViews';

import getImage from '../../composables/useResources';
import useQueryPosts from '../../composables/useQueryPosts';

const { posts, selectedPost, error, loading, results, 
  page, initializeAllPosts, createPost, initializeQueriedPosts} = useQueryPosts();
 
  const successtoast = ref(false);
    const createPostButton = ref(false);
    const editPostButton = ref(false);
    
    const {views, selectedView, initializeViews,getViewById} = useViews();
    const router = useRouter()
    const route = useRoute()
    
   
    
    const sidebarOpen = ref(false)
    const selectedItems = ref([])

    
    const updateSelectedItems = (selected) => {
      selectedItems.value = selected
    }
    function triggerSuccess() {
      successtoast.value = true;
    }
  const countApprovedII = () => {
    let initialValue = 0;
    let totalResult = 0;
    if(posts.value) {
      totalResult = posts?.value?.reduce(
      (total, currentValue, currentIndex, posts) => {
          if(currentValue.status =='aprobado II') 
          {  
            return total+1;
          }
          else 
          {
            return total      
          }
        },
      initialValue
      );
    }
    
    return totalResult;
  }
  const countApprovedI = () => {
    let initialValue = 0;
    let totalResult = 0;
    
    if(posts.value) 
    {
      totalResult = posts.value.reduce(
      (total, currentValue, currentIndex, posts) => {
        
        
        if(currentValue.status =='aprobado I') 
        {  
          return total+1;
        }
        else 
        {
          return total      
        }
      },
      initialValue
      );
    }
    return totalResult;
  
  }
  const countPending = () => {
    let initialValue = 0;
    let totalResult = 0;
    if(posts.value)
    {
      totalResult = posts.value.reduce(
      (total, currentValue, currentIndex, posts) => {
        
        
        if(currentValue.status =='pendiente') 
        {  
          return total+1;
        }
        else 
        {
          return total      
        }
      },
      initialValue
      );
  }
    return totalResult;
  
  }
  const countCorrect = () => {
    let initialValue = 0;
    let totalResult = 0;
    if(posts.value)
    {
      totalResult = posts.value.reduce(
      (total, currentValue, currentIndex, posts) => {
        
        
        if(currentValue.status =='corregir') 
        {  
          return total+1;
        }
        else 
        {
          return total      
        }
      },
      initialValue
      );
    }
    return totalResult;
  
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
    
    watch(
      views, ()=>{
        getViewById(route.params.id)
      }
    )
    initializeViews();

</script>