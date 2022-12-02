<template>
  <div class="flex h-screen overflow-hidden">

    <!-- Sidebar -->
    <Sidebar :sidebarOpen="sidebarOpen" @close-sidebar="sidebarOpen = false" />

    <!-- Content area -->
    <div class="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
      
      <!-- Site header -->
      <Header :sidebarOpen="sidebarOpen" @toggle-sidebar="sidebarOpen = !sidebarOpen" />
      <Toast :type="'error'" :open="error" @close-toast="error=null; successtoast=false" class="fixed z-40 mt-16 w-1/3">{{error?.response?.data.message}}</Toast>
      <Toast :type="'success'" :open="successtoast && !error && !loading" @close-toast="successtoast = false" class="fixed z-50 mt-16 w-1/3">Vista Creada Exitosamente</Toast>
    
      <main>
        <div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

          <!-- Page header -->
          <div class="mb-5">

            <!-- Title -->
            <h1 class="text-2xl md:text-3xl text-slate-800 font-bold">Vistas 💡</h1>

          </div>

          <div class="flex grid grid-cols-1 sm:grid-cols-2">
            
            <!-- Search form -->
            <div class="min-w-xl mb-5">
              <form class="relative w-">
                <label for="app-search" class="sr-only">Search</label>
                <input id="app-search" v-model="query" @input="updateQueriedViews()" class="form-input w-full pl-9 py-3 focus:border-slate-300" type="search" placeholder="Search…" />
                <button class="absolute inset-0 right-auto group" disabled aria-disabled="true" aria-label="Search">
                  <svg class="w-4 h-4 shrink-0 fill-current text-slate-400 group-hover:text-slate-500 ml-3 mr-2" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z" />
                    <path d="M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z" />
                  </svg>
                </button>
              </form>
            </div>

            <!-- Buttons box -->
            <div class="flex justify-between gap-2 justify-self-start sm:justify-self-end">
                <!-- Edit views -->
              <button 
              v-if="!edittingviews"
              @click.stop="edittingviews = true"
              class="btn bg-white border-slate-200 hover:bg-slate-100 hover:border-slate-300 text-indigo-500 mb-6">
                <svg class="w-8  fill-current shrink-0" viewBox="0 0 32 32">
                  <path
                    d="M19.7 8.3c-.4-.4-1-.4-1.4 0l-10 10c-.2.2-.3.4-.3.7v4c0 .6.4 1 1 1h4c.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4l-4-4zM12.6 22H10v-2.6l6-6 2.6 2.6-6 6zm7.4-7.4L17.4 12l1.6-1.6 2.6 2.6-1.6 1.6z" />
                </svg>
                <span class="hidden xs:block ml-2">Editar Vistas</span>
              </button>
              <button 
              v-else              
              @click.stop="edittingviews = false"
              class="btn bg-white border-slate-200 hover:bg-slate-100 hover:border-slate-300 text-indigo-500 mb-6">
                <svg class="w-4 h-4 fill-current shrink-0 rotate-45" viewBox="0 0 16 16">
                  <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                </svg>
                <span class="hidden xs:block ml-2">Dejar de Editar</span>
              </button>
              <!-- Add order button -->
              <button 
              @click.stop="createModalOpen = true"
              class="btn bg-indigo-500 hover:bg-indigo-600 
              text-white mb-6">
                <svg class="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
                  <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                </svg>
                <span class="hidden xs:block ml-2">Nueva Vista</span>
              </button>
            </div>
            
          </div>

          <!-- Page content -->
          <div>


            <div class="mt-8">
              <div class="grid grid-cols-12 gap-6">
                <ViewCards v-if="!loading"
                
                @open-edit="openEdit"
                @open-delete="openDelete"
                :editting="edittingviews" :xviews="queriedViews" @update-list="initializeViews()" :key="loading + queriedViews?.length"/>
                <div v-else-if="loading" class="col-span-12 mx-auto flex flex-col gap-4 py-12 justify-center items-center inset-0">
                      <svg class="animate-spin inline-block h-24 w-24 mt-10 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg> 
                    <span class="text-xl font-bold w-full text-center">Actualizando información</span>
                </div>
              </div>
            </div>




          </div>
          
          <!-- Pagination -->
          <div class="mt-6">
            <PaginationClassic :items="views.length" :results="results" :type="'views'"/>
          </div>

        </div>        
      </main>

    </div> 
    
    <!-- Create View-->
    <ModalBasic
      :modalOpen="createModalOpen"
      @close-modal="createModalOpen = false"
      title="Crear Vista"
    >
      <!-- Modal content -->
      <div class="px-5 pt-4 pb-1">
        <div class="text-sm">
          <div class="font-medium text-slate-800 mb-2">
            Haga click sobre la foto para cambiarla.
          </div>
          <div class="space-y-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div class="flex justify-center sm:col-span-2"
            @click="pickFile()"
             >
             
              <img
                
                class="cursor-pointer hover:brightness-50 ease-in-out duration-300 active:brightness-100 w-44 h-24"
                :src="selectedFile"
                width="120"
                height="80"
                :alt="'Foto de la vista'"
              />
              <form class="hidden" ref="form" action="">
                <input ref="fileInput" type="file" @input="onSelectedFile" />
              </form>
            </div>
            <!-- Start -->
            <div>
              <label class="block text-sm font-medium mb-1 mt-2" for="name" 
                >Nombre</label
              >
              <input id="name" class="form-input w-full" type="text" v-model="newPage.name"/>
            </div>
           
           <!-- Select -->
            <div>
              <label class="block text-sm font-medium mb-1 mt-2" for="status"
                >Estado</label
              >
              <select id="status" class="form-select" v-model="newPage.isVisible">
                <option value="true">Visible</option>
                <option value="false">Invisible</option>
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
            @click.stop="createModalOpen = false"
          >
            Cancelar
          </button>
          <button :disabled="loading" @click="postCreateForm(); triggerSuccess()" class="btn-sm disabled:bg-indigo-300 bg-indigo-500 hover:bg-indigo-600 text-white">
            Guardar
          </button>
        </div>
      </div>
    </ModalBasic>

    <!-- Edit View-->
    <ModalBasic
      :modalOpen="editModalOpen"
      @close-modal="editModalOpen = false"
      :title="`Editar ''${selectedView.name}'' `"
    >
      <!-- Modal content -->
      <div class="px-5 pt-4 pb-1">
        <div class="text-sm">
          <div class="font-medium text-slate-800 mb-2">
            Haga click sobre la foto para cambiarla.
          </div>
          <div class="space-y-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div class="flex justify-center sm:col-span-2"
            @click="pickFile()"
             >
             
              <img
                
                class="cursor-pointer hover:brightness-50 ease-in-out duration-300 active:brightness-100 w-44 h-24"
                :src="selectedFile"
                width="120"
                height="80"
                :alt="'Foto de la vista'"
              />
              <form class="hidden" ref="form" action="">
                <input ref="fileInput" type="file" @input="onSelectedFile" />
              </form>
            </div>
            <!-- Start -->
            <div>
              <label class="block text-sm font-medium mb-1 mt-2" for="edit-name" 
                >Nombre</label
              >
              <input id="edit-name" class="form-input w-full" type="text" v-model="newPage.name"/>
            </div>
           
           <!-- Select -->
            <div>
              <label class="block text-sm font-medium mb-1 mt-2" for="edit-status"
                >Estado</label
              >
              <select id="edit-status" class="form-select" v-model="newPage.isVisible">
                <option value="true">Visible</option>
                <option value="false">Invisible</option>
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
            @click.stop="editModalOpen = false"
          >
            Cancelar
          </button>
          <button :disabled="loading" @click="viewEditForm() ;triggerSuccess()" class="btn-sm disabled:bg-indigo-300 bg-indigo-500 hover:bg-indigo-600 text-white">
            Guardar
          </button>
        </div>
      </div>
    </ModalBasic>

    <!-- Delete View -->
    <ModalBlank id="delete-view-modal" :modalOpen="deleteViewModalOpen" @close-modal="deleteViewModalOpen = false">
      <div class="p-5 flex space-x-4">
        <!-- Icon -->
        <div class="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-rose-100">
          <svg class="w-4 h-4 shrink-0 fill-current text-rose-500" viewBox="0 0 16 16">
            <path
              d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 12c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zm1-3H7V4h2v5z" />
          </svg>
        </div>
        <!-- Content -->
        <div>
          <!-- Modal header -->
          <div class="mb-2">
            <div class="text-lg font-semibold text-slate-800">¿Está seguro que desea borrar: <br/>"{{selectedView.name}}"?</div>
          </div>
          <!-- Modal content -->
          <div class="text-sm mb-10">
            <div class="space-y-2">
              <p>
                Considere que esta acción es irreversible y una vez realizada tanto la publicación como el archivo asociado serán eliminados.
              </p>
            </div>
          </div>
          <!-- Modal footer -->
          <div class="flex flex-wrap justify-end space-x-2">
            <button class="btn-sm border-slate-200 hover:border-slate-300 text-slate-600"
              @click.stop="deleteViewModalOpen = false">Cancelar</button>
            <button class="btn-sm bg-rose-500 hover:bg-rose-600 text-white" @click="deleteSelected(selectedView.id) ">Confirmar</button>
          </div>
        </div>
      </div>
    </ModalBlank>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import Sidebar from '../../partials/Sidebar.vue'
import Header from '../../partials/Header.vue'
import ViewCards from '../../partials/ecommerce/ViewCards.vue'
import ModalBasic from '../../components/ModalBasic.vue'

import ModalBlank from '../../components/ModalBlank.vue'
import Toast from '../../components/Toast.vue'
import PaginationClassic from '../../components/PaginationClassic.vue'
import useViews from '../../composables/useViews';
 

    const newPage = ref({
      name:'',
      isVisible: 'true',
    })

    const editModalOpen = ref(false);
    const selectedView = ref({})
    const edittingviews = ref(false);
    const successtoast = ref(false);
    const sidebarOpen = ref(false)
    const createModalOpen = ref(false);

    const deleteViewModalOpen = ref(false);

    const query = ref('');
    const {views, queriedViews,error, loading, results, page, createView, updateView, deleteView, initializeViews, filterByName} = useViews();


    function resetData() {  
      createModalOpen.value = false;
      newPage.value = {
        name:'',
        isVisible: 'false',
      }
      
      selectedFile.value ='/src/images/applications-image-18.jpg';
    }

    function postCreateForm() {
      createView({image_url: formData, ...newPage.value})
      resetData();
    }

    function viewEditForm() {
      updateView({image_url: formData, ...newPage.value}, selectedView.value.id)
      resetData();
    }
    
     function updateQueriedViews() {
      filterByName(query.value);
     }




    //File selector        
    const selectedFile = ref('/src/images/applications-image-18.jpg');
    const fileInput = ref(null);

    let formData = new FormData()


    const form = ref(null);
    function onSelectedFile() {
      let file = fileInput.value.files;
      
      if (file != null) {
        let reader = new FileReader();
        reader.onload = (e) => {
          selectedFile.value = e.target.result;
          
        };
        reader.readAsDataURL(file[0]);
        
        formData =  file[0]
        
      }
    }

    function openEdit(event) {
      
      selectedView.value = event
      newPage.value.name = event.name;
      newPage.value.isVisible = event.isVisible;
      editModalOpen.value = true;
    }
    function openDelete(event) {
      
      selectedView.value = event
      deleteViewModalOpen.value = true;
    }

    function triggerSuccess() {
      successtoast.value = true;
    }
    function pickFile() {
      fileInput.value.click();
    }

    async function deleteSelected(id) {
      deleteViewModalOpen.value =false; 
      await deleteView(id); 
      selectedView.value = {};
    }

    function deleteFile() {
      selectedFile.value = null;
      form.value.reset();
    }
    onMounted(()=> {
       initializeViews();
    })


</script>