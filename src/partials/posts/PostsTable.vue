<template>
  <div :key="loading" class="bg-white shadow-lg w-full rounded-sm border border-slate-200 relative">
      
    <header class="px-5 py-4">
      <h2 class="font-semibold text-slate-800">Publicaciones <span class="text-slate-400 font-medium">{{results}}</span></h2>
    </header>
    <div v-if="!loading">

      <!-- Table -->
      <div class="overflow-x-auto">
        
        <table class="table-auto w-full">
          <!-- Table header -->
          <thead class="text-xs font-semibold uppercase text-slate-500 bg-slate-50 border-t border-b border-slate-200">
            <tr>
              <!-- <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
                <div class="flex items-center">
                  <label class="inline-flex">
                    <span class="sr-only">Todos</span>
                    <input class="form-checkbox" type="checkbox" v-model="selectAll" @click="checkAll" />
                  </label>
                </div>
              </th> -->
              <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div class="font-semibold text-left">Post</div>
              </th>
              <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div class="font-semibold text-left">Título</div>
              </th>
              <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div class="font-semibold text-left">Estado</div>
              </th>
              <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div class="font-semibold text-left">R.O.#</div>
              </th>
              <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div class="font-semibold text-left">Fecha Registro</div>
              </th>
              <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div class="font-semibold text-left">Fecha Actualización</div>
              </th>
              <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div class="font-semibold text-left">Tipo Reforma</div>
              </th>
              <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div class="font-semibold text-left">Acciones</div>
              </th>
            </tr>
          </thead>
          <!-- Table body -->
          <tbody class="text-sm divide-y divide-slate-200" :key="results " >
            <Post
              @edit-post="editPostModalOpen=true"
              v-for="post of posts"
              :key="post.id"
              :post="post"
              v-model:selected="selected"
              :value="post.id"
            />
            
            <div v-if="results==0" class="p-5 py-8 w-12">
              <span class="absolute -mt-2">No hay posts registrados aún en esta categoría.</span>
            </div>
          </tbody>
        </table>

      </div>
    </div>
    <div v-else class="md:col-span-2 xl:col-span-1">
        <svg class="animate-spin block h-24 w-24 mt-10 mx-auto text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg> 
        <span class="inline-block text-xl font-bold w-full my-4 mt-6 mx-auto text-center mb-10">Actualizando</span>
    </div>
     <!-- Create Post -->
     <ModalBasic
      :modalOpen="createPostModalOpen"
      @close-modal="closeCreateModal()"
      title="Crear Publicación"
    >
      <!-- Modal content -->
      <div class="px-5 pt-4 pb-1">
        <div class="text-sm">
          <div class="font-medium text-slate-800 mb-2">
            Haga click sobre el círculo y elija una foto apropiada.
          </div>
          <div class="space-y-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <!-- Start -->
            <div>
              <label class="block text-sm font-medium mb-1 mt-4" for="title"
                >Nombre de Norma</label
              >
              <input id="title" class="form-input w-full" type="text" v-model="newPost.title"/>
            </div>
            <!-- Start -->
            <div>
              <label class="block text-sm font-medium mb-1 mt-2" for="ronumber"
                >Número de R.O.</label
              >
              <input id="ronumber" class="form-input w-full" type="text" v-model="newPost.ro" />
            </div>

             <!-- Select -->
             <div>
              <label class="block text-sm font-medium mb-1" for="legalnorm"
                >Tipo de Norma</label>
              <select id="legalnorm" class="form-select w-full" v-model="newPost.type_reform">
                <option :value="'Registro Oficial'">
                  Registro Oficial
                </option>
                <option :value="'Suplemento'">
                  Suplemento
                </option>
                <option :value="'Edición Especial'">
                  Edición Especial
                </option>
                <option :value="'Reforma'">
                  Reforma
                </option>
                <option :value="'Boletín'">
                  Boletín
                </option>

              </select>
            </div>

            <!-- Start -->
            <!-- <div>
              <label class="block text-sm font-medium mb-1" for="legalnorm"
                >Tipo de Norma</label
              >
              <input id="legalnorm" class="form-input w-full" type="text" v-model="newPost.type_reform" />
            </div> -->
            <!-- Start -->
            <div>
              <label class="block text-sm font-medium mb-1" for="normnum"
                >No. de Norma</label
              >
              <input id="normnum" class="form-input w-full" type="text" v-model="newPost.number" />
            </div>
            <!-- Start -->
             <!-- Select -->
             <div>
              <label class="block text-sm font-medium mb-1" for="type"
                >Tipo de R.O.</label>
              <select id="type" class="form-select w-full" v-model="newPost.legal_regulation">
                <option v-for="rotype in rotypes" :value="rotype.value">
                  {{rotype.name}}
                </option>
                
              </select>
              
            </div>

            <!-- <div>
              <label class="block text-sm font-medium mb-1" for="reformtype"
                >Tipo de R.O.</label
              >
              <input id="reformtype" class="form-input w-full" type="text" v-model="newPost.type"/>
            </div> -->
           
            
             <!-- Select -->
            <div>
              <label class="block text-sm font-medium mb-1" for="reference"
                >Órgano Emisor</label>
              <select id="reference" class="form-select w-full" v-model="newPost.reference">
                <option v-for="inst in institutions" :value="inst.value">
                  {{inst.name}}
                </option>
                
              </select>
            </div>

             <!-- Start -->
             <div class="sm:col-span-2">
              <label class="block text-sm font-medium mb-1" for="description"
                >Descripción</label
              >
              <textarea id="description" class="form-input w-full h-max" v-model="newPost.content">
                
              </textarea>
            </div>
            
            <!-- Start -->
            <div class="sm:col-span-2">
              <label class="block text-sm font-medium mb-1" for="file"
                >Archivo Adjunto</label
              >
              <form class="w-full" ref="form">
                <input id="file" class="form-input w-full" type="file" ref="fileInput" @input="onSelectedFile()" />
              </form>
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
            @click.stop="closeCreateModal()"
          >
            Cancelar
          </button>
          <button @click=" triggerSuccess() ;createPost({ ...newPost}, $route.params.categoryId);resetData()" :disabled="submitting" class="btn-sm disabled:bg-indigo-300 bg-indigo-500 hover:bg-indigo-600 text-white">
            Guardar
          </button>
        </div>
      </div>
    </ModalBasic>
    
     
 
  </div>
</template>

<script setup>
import { onMounted, defineProps, defineEmits, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import Post from './PostTableItem.vue'
import ModalBasic from '../../components/ModalBasic.vue'
import axios from 'axios'
import useCategories from '../../composables/useCategories';
import useQueryPosts from '../../composables/useQueryPosts';

const { categories} = useCategories();
const { posts, selectedPost, error, loading, results, page, initializeAllPosts, createPost, initializeQueriedPosts} = useQueryPosts();
const submitting = ref(false);
const route = useRoute();
const props = defineProps(['selectedItems', 'create-button', 'editButton'])
const emit = defineEmits(['change-selection','close-create','trigger-success'])
const selectAll = ref(false)
const selected = ref([])

const newPost = ref({
  status: "user",
  type: "",
  number: "",
  title: "",
  content: "",
  legal_regulation: "",//Comodin
  
  file_url:'',
  status:"pending",
  type_reform: "Registro Oficial",
  reference: "www.sri.gob.ec",
      //reference: "6309e58b6310870021f66e05",
  ro: ""
})

const institutions = ref(
  [
    {
      value: 'www.sri.gob.ec',
      name: 'SRI'
    },
    {
      value: 'www.supercias.gob.ec',
      name: 'Supercias'
    },
    {
      value: 'www.trabajo.gob.ec',
      name: 'Ministerio de Trabajo'
    },
    {
      value: 'www.iess.gob.ec',
      name: 'IESS'
    },
    {
      value: 'www.aduana.gob.ec',
      name: 'SENAE'
    },
    {
      value: 'www.jprf.gob.ec',
      name: 'JPRF'
    },
    {
      value: 'www.produccion.gob.ec',
      name: 'Ministerio de Producción, Comercio Exterior, Inversiones y Pesca'
    },
    {
      value: 'www.telecomunicaciones.gob.ec',
      name: 'Ministerio de Telecomunicaciones y de la Sociedad de la Información'
    },
    {
      value: 'www.presidencia.gob.ec',
      name: 'Presidencia de la República del Ecuador'
    },
    {
      value: 'www.superbancos.gob.ec',
      name: 'Superintendencia de Bancos'
    },
    {
      value: 'www.gestionderiesgos.gob.ec',
      name: 'Servicio Nacional de Gestión de Riesgos y Emergencias'
    },
    {
      value: 'www.obraspublicas.gob.ec',
      name: 'Ministerio de Transporte y Obras Públicas'
    },
    {
      value: 'www.produccion.gob.ec/comex',
      name: 'Comité de Comercio Exterior'
    },
    {
      value: 'www.cfn.fin.ec',
      name: 'Corporación Financiera Nacional'
    },
    {
      value: 'www.asambleanacional.gob.ec/es',
      name: 'Asamblea Nacional'
    },
    {
      value: 'www.seps.gob.ec',
      name: 'Superintendencia de Economía Popular y Solidaria'
    },
    {
      value: 'www.bce.fin.ec',
      name: 'Banco Central del Ecuador'
    },
    {
      value: 'www.registrospublicos.gob.ec',
      name: 'Dirección Nacional de Registros Públicos'
    },
    {
      value: 'www.bioseguridadgalapagos.gob.ec',
      name: 'Agencia de Bioseguridad Galápagos'
    },
    {
      value: 'www.observatorioplanificacion.cepal.org/es/instituciones/gobiernos-autonomos-descentralizados-de-ecuador',
      name: 'Gobiernos Autónomos Descentralizados'
    },
    {
      value: 'www.economiasolidaria.gob.ec',
      name: 'Instituto Nacional de Economía Popular y Solidaria'
    },
    {
      value: 'www.agricultura.gob.ec',
      name: 'Ministerio de Agricultura y Ganadería'
    },
    {
      value: 'www.uafe.gob.ec',
      name: 'Unidad de Análisis Financiero y Económico'
    },
    {
      value: 'www.ces.gob.ec',
      name: 'Consejo de Educación Superior'
    },
    {
      value: 'www.agrocalidad.gob.ec',
      name: 'AGROCALIDAD'
    },
    {
      value: 'www.finanzaspopulares.gob.ec',
      name: 'Corporación Nacional de Finanzas Populares'
    },
    {
      value: 'www.gob.ec/ant?page=6',
      name: 'Agencia Nacional de Tránsito'
    }
  ])
  
const rotypes = ref([
  {
    value: 'Suplemento',
    name: 'Suplemento'
  },
  {
    value: 'Segundo Suplemento',
    name: 'Segundo Suplemento'
  },
  {
    value: 'Tercer Suplemento',
    name: 'Tercer Suplemento'
  },
  {
    value: 'Cuarto Suplemento',
    name: 'Cuarto Suplemento'
  },
  {
    value: 'Quinto Suplemento',
    name: 'Quinto Suplemento'
  },
  {
    value: 'Registro Oficial',
    name: 'Registro Oficial'
  },
  {
    value: 'Edición Especial',
    name: 'Edición Especial'
  },
  {
    value: 'Boletín',
    name: 'Boletín'
  },
  {
    value: 'Reforma',
    name: 'Reforma'
  }


  ])

const disabledInput = ref("---");

//File selector        
const selectedFile = ref(null);
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
        
        newPost.value.file_url =  file[0]
      }
    }

  


  function deleteFile() {
  selectedFile.value = null;
  form.value.reset();
  }

  const resetData = () => {  
      closeCreateModal();
      newPost.value = {
        status: "",
        type: "",
        number: "",
        title: "",
        content: "",
        legal_regulation: "",//Comodin
        file_url:"",
       
        status:"pendiente",
        type_reform: "Registro Oficial",
        reference: "www.sri.gob.ec",
            //reference: "6309e58b6310870021f66e05",
        ro: ""
      }
      
      selectedFile.value ='/src/images/applications-image-18.jpg';
    }
const createPostModalOpen = ref(props.createButton);
    

function triggerSuccess() {
  emit('trigger-success')
}

    //const posts = ref(props.posts);
function closeCreateModal() {
  emit('close-create');
}
function closeEditModal() {
  emit('close-edit');
}
   
    
    

initializeQueriedPosts(route.params.categoryId)
    
   
</script>