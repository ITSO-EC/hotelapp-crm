<template>
  <div>
    <Toast :type="'error'" :open="error" @close-toast="error=null; successtoast=false" class="fixed top-16 z-40 -ml-8 w-1/3">{{error?.response?.data.message}}</Toast>
    <Toast :type="'success'" :open="successtoast && !loading && !error" @close-toast="successtoast = false" class="fixed top-16 z-40 -ml-8 w-1/3">Categoría creada con éxito</Toast>
      
    <div class="flex w-full items-center justify-between">
      <!-- Add category button -->
      <button :disabled="loading" @click.stop="createCategoryModalOpen = true"
        class="btn bg-indigo-500 hover:bg-indigo-600 text-white z-10">
        <svg class="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
          <path
            d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
        </svg>
        <span class="block ml-2">Agregar Categoría</span>
      </button>
      <button v-if="!editting" @click.stop="editting = true"
        class="btn bg-white border-slate-200 hover:bg-slate-100 hover:border-slate-300 text-indigo-500 overflow-hidden h-10 z-10">
        <svg class="w-8 h-8 fill-current shrink-0" viewBox="0 0 32 32">
          <path
            d="M19.7 8.3c-.4-.4-1-.4-1.4 0l-10 10c-.2.2-.3.4-.3.7v4c0 .6.4 1 1 1h4c.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4l-4-4zM12.6 22H10v-2.6l6-6 2.6 2.6-6 6zm7.4-7.4L17.4 12l1.6-1.6 2.6 2.6-1.6 1.6z" />
        </svg>
      </button>
      <button v-else @click.stop="editting = false"
        class="btn bg-white border-slate-200 hover:bg-slate-100 hover:border-slate-300 text-indigo-500 overflow-hidden h-10 z-10">
        <svg class="w-8 h-4 fill-current shrink-0 rotate-45" viewBox="0 0 16 16">
          <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
        </svg>
      </button>
    </div>
    
    <div class="bg-white shadow-lg rounded-sm border border-slate-200 p-5 mt-5 min-w-60">

      <div v-if="!loading" class="grid md:grid-cols-2 xl:grid-cols-1 gap-6">
        <!-- Group 1 -->
        <div class="md:col-span-2 xl:col-span-1">

          <div class="text-sm text-slate-800 font-semibold mb-3">Categorías</div>
          <ul class="text-sm font-medium space-y-2">
            <li v-for="category in categories" :key="'CategoryId-'+category?.id" class="flex justify-between items-center 
            w-full">

              <router-link
                :class="$route.params.categoryId != null && $route.params.categoryId == category?.id ? ' font-bold text-sky-500': ''"
                class="inline-block text-slate-600 hover:text-slate-700 w-full h-10 flex items-center"
                :to="{name:'Workspace', params:{id: $route.params.id, categoryId: category?.id}}">
                {{category?.name}}</router-link>

              <button v-if="!editting" class="text-emerald-600">
                
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>

              </button>
              <div v-if="editting" class="flex bg-white border rounded-full justify-between items-center">
                <button @click.stop="openEdit(category)">
                  <svg class="w-8 h-8 fill-current shrink-0" viewBox="0 0 32 32">
                    <path
                    d="M19.7 8.3c-.4-.4-1-.4-1.4 0l-10 10c-.2.2-.3.4-.3.7v4c0 .6.4 1 1 1h4c.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4l-4-4zM12.6 22H10v-2.6l6-6 2.6 2.6-6 6zm7.4-7.4L17.4 12l1.6-1.6 2.6 2.6-1.6 1.6z" />
                  </svg>
                </button>
                <button class="text-rose-500 hover:text-rose-600" @click.stop="openDelete(category)">
                  <span class="sr-only">Borrar</span>
                  <svg class="w-8 h-8 fill-current" viewBox="0 0 32 32">
                    <path d="M13 15h2v6h-2zM17 15h2v6h-2z" />
                    <path
                      d="M20 9c0-.6-.4-1-1-1h-6c-.6 0-1 .4-1 1v2H8v2h1v10c0 .6.4 1 1 1h12c.6 0 1-.4 1-1V13h1v-2h-4V9zm-6 1h4v1h-4v-1zm7 3v9H11v-9h10z" />
                  </svg>
                </button>
              </div>
              
            </li>
            <li v-if="categories== null">
              Sin categorias aún
            </li>

          </ul>
        </div>
      </div>

      <div v-else class="md:col-span-2 xl:col-span-1">
        <svg class="animate-spin block h-12 w-12 mt-10 mx-auto text-blue-600" xmlns="http://www.w3.org/2000/svg"
          fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
          </path>
        </svg>
        <span class="inline-block text-xl font-bold w-full my-4 mt-6 mx-auto text-center">Actualizando</span>
      </div>

    </div>



    <!-- Create Category Modal -->
    <ModalBasic :modalOpen="createCategoryModalOpen" @close-modal="closeModals()"
      title="Crear Categoría">
      <!-- Modal content -->
      <div class="px-5 pt-4 pb-1">
        <div class="text-sm">
          <h1 class="my-4">
            Escriba el nombre de la categoría para registrar en esta vista.
          </h1>
          <div class="space-y-2 grid grid-cols-1 sm:grid-cols-2 gap-4">

            <!-- Start -->
            <div class="sm:col-span-2">
              <label class="block text-sm font-medium mb-1 mt-2" for="cc-name">Nombre:</label>
              <input id="cc-name" class="form-input w-full" type="text" v-model="newCategory.name" />
            </div>
        

          </div>
        </div>
      </div>
      <!-- Modal footer -->
      <div class="px-5 py-4">
        <div class="flex flex-wrap justify-end space-x-2">
          <button class="
              btn-sm
              border-slate-200
              hover:border-slate-300
              text-slate-600
            " @click.stop="closeModals()">
            Cancelar
          </button>
          <button @click.stop="createCategory(newCategory); createCategoryModalOpen = false; triggerSuccess()"
            class="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white">
            Guardar
          </button>
        </div>
      </div>
    </ModalBasic>

    <!-- Edit Category -->
    <ModalBasic :modalOpen="editCategoryModalOpen" @close-modal="closeModals()" title="Editar Categoría">
      <!-- Modal content -->
      <div class="px-5 pt-4 pb-1">
          <h1 class="my-4">
            Escriba el nuevo nombre de esta categoría.
          </h1>
          <div class="space-y-2 grid grid-cols-1 sm:grid-cols-2 gap-4">

            <!-- Start -->
            <div class="sm:col-span-2">
              <label class="block text-sm font-medium mb-1 mt-2" for="cc-name">Nombre:</label>
              <input id="cc-name" class="form-input w-full" type="text" v-model="newCategory.name" />
            </div>
        

          </div>
        </div>

       <!-- Modal footer -->
       <div class="px-5 py-4">
        <div class="flex flex-wrap justify-end space-x-2">
          <button class="
              btn-sm
              border-slate-200
              hover:border-slate-300
              text-slate-600
            " @click.stop="closeModals()">
            Cancelar
          </button>
          <button @click.stop="updateCategory({name: newCategory.name}, selected.id); triggerSuccess()"
            class="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white">
            Guardar
          </button>
        </div>
      </div>
    </ModalBasic>

    <!-- Delete Category -->
     <ModalBlank id="delete-cat-modal" :modalOpen="deleteModalOpen" @close-modal="closeModals()">
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
            <div class="text-lg font-semibold text-slate-800">¿Está seguro que desea borrar: <br/>"{{selected.name}}"?</div>
          </div>
          <!-- Modal content -->
          <div class="text-sm mb-10">
            <div class="space-y-2">
              <p>
                Considere que esta acción es irreversible y toda la información así como su contenido relacionado serán eliminados.
              </p>
            </div>
          </div>
          <!-- Modal footer -->
          <div class="flex flex-wrap justify-end space-x-2">
            <button class="btn-sm border-slate-200 hover:border-slate-300 text-slate-600"
              @click.stop="closeModals()">Cancelar</button>
            <button class="btn-sm bg-rose-500 hover:bg-rose-600 text-white" @click.stop="deleteCategory(selected.id, $route.params.id); closeModals();">Confirmar</button>
          </div>
        </div>
      </div>
    </ModalBlank>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import useCategories from '../../composables/useCategories';
import ModalBasic from '../../components/ModalBasic.vue'
import ModalBlank from '../../components/ModalBlank.vue'
import Toast from '../../components/Toast.vue'

const { categories, selectedCategory, error, loading, results, page, initializeCategories, createCategory, updateCategory, deleteCategory, getCategoryById } = useCategories();
//const props = defineProps(['categories'])
const route = useRoute()
const editting = ref(false);
const successtoast = ref(false);
const createCategoryModalOpen = ref(false);
const editCategoryModalOpen = ref(false);
const deleteModalOpen = ref(false);
const newCategory = ref({
  name: "",
  page: route.params.id
})

const selected = ref({})

function openEdit(category) {
  editCategoryModalOpen.value = true;
  selected.value = category;
  newCategory.value.name = category.name
  newCategory.value.page = category.page
}

function openDelete(category) {
  deleteModalOpen.value = true;
  selected.value = category;
  
}

function triggerSuccess() {
  successtoast.value = true;
}
function closeModals() {
  createCategoryModalOpen.value = false;
  editCategoryModalOpen.value = false;
  deleteModalOpen.value = false;
  selected.value = {};
  newCategory.value.name = ''
  newCategory.value.page = route.params.id 
}
initializeCategories(route.params.id);
</script>