<template>
  <tr class="w-full">
    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-12 ">
      <div class="font-medium text-sky-500 w-12 text-ellipsis overflow-hidden">{{post.id}}</div>
    </td>
    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-36">
      <div class="font-medium w-36 text-ellipsis overflow-hidden" :class="totalColor(post.status)">{{post.title}}</div>
    </td>
    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-1/5">
      <div @click="changeStatus(post.id, post.status)"
        class="inline-flex font-medium rounded-full text-center px-2.5 py-0.5 capitalize"
        :class="statusColor(post.status)">{{post.status}}</div>
    </td>
    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-1/5">
      <div class="font-medium text-slate-800">{{post.ro}}</div>
    </td>
    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-1/5">
      <div class="font-medium w-auto text-ellipsis overflow-hidden">{{convertDate(post.createdAt)}}</div>
    </td>
    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
      <div class="font-medium w-auto text-ellipsis overflow-hidden">{{convertDate(post.updatedAt)}}</div>
    </td>
    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
      <div class="flex items-center">
        <div>{{post.type_reform}}</div>
      </div>
    </td>
    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
      <div class="space-x-1">
        <button @click.stop="openEdit()" class="text-slate-400 hover:text-slate-500 rounded-full">
          <span class="sr-only">Editar</span>
          <svg class="w-8 h-8 fill-current" viewBox="0 0 32 32">
            <path
              d="M19.7 8.3c-.4-.4-1-.4-1.4 0l-10 10c-.2.2-.3.4-.3.7v4c0 .6.4 1 1 1h4c.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4l-4-4zM12.6 22H10v-2.6l6-6 2.6 2.6-6 6zm7.4-7.4L17.4 12l1.6-1.6 2.6 2.6-1.6 1.6z" />
          </svg>
        </button>
        <button @click.stop="download(getImage(post.file_url))" class="text-slate-400 hover:text-slate-500 rounded-full">
          <span class="sr-only">Descargar</span>
          <svg class="w-8 h-8 fill-current" viewBox="0 0 32 32">
            <path
              d="M16 20c.3 0 .5-.1.7-.3l5.7-5.7-1.4-1.4-4 4V8h-2v8.6l-4-4L9.6 14l5.7 5.7c.2.2.4.3.7.3zM9 22h14v2H9z" />
          </svg>
        </button>
        <button class="text-rose-500 hover:text-rose-600 rounded-full" @click="openDelete()">
          <span class="sr-only">Borrar</span>
          <svg class="w-8 h-8 fill-current" viewBox="0 0 32 32">
            <path d="M13 15h2v6h-2zM17 15h2v6h-2z" />
            <path
              d="M20 9c0-.6-.4-1-1-1h-6c-.6 0-1 .4-1 1v2H8v2h1v10c0 .6.4 1 1 1h12c.6 0 1-.4 1-1V13h1v-2h-4V9zm-6 1h4v1h-4v-1zm7 3v9H11v-9h10z" />
          </svg>
        </button>
      </div>
    </td>
   
       <!-- Edit Post -->
    <ModalBasic
      :modalOpen="editPostModalOpen"
      @close-modal="closeEditModal()"
      title="Editar Publicación"
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
              <label class="block text-sm font-medium mb-1 mt-4" for="edit-title"
                >Nombre de Norma</label
              >
              <input id="edit-title" class="form-input w-full" type="text" v-model="newPost.title"/>
            </div>
            <!-- Start -->
            <div>
              <label class="block text-sm font-medium mb-1 mt-2" for="edit-ronumber"
                >Número de R.O.</label
              >
              <input id="edit-ronumber" class="form-input w-full" type="text" v-model="newPost.ro" />
            </div>

             <!-- Select -->
             <div>
              <label class="block text-sm font-medium mb-1" for="edit-legalnorm"
                >Tipo de Norma</label>
              <select id="edit-legalnorm" class="form-select w-full" v-model="newPost.type_reform">
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
              <label class="block text-sm font-medium mb-1" for="edit-legalnorm"
                >Tipo de Norma</label
              >
              <input id="edit-legalnorm" class="form-input w-full" type="text" v-model="newPost.type_reform" />
            </div> -->
            <!-- Start -->
            <div>
              <label class="block text-sm font-medium mb-1" for="edit-normnum"
                >No. de Norma</label
              >
              <input id="edit-normnum" class="form-input w-full" type="text" v-model="newPost.number" />
            </div>
            <!-- Start -->
             <!-- Select -->
             <div>
              <label class="block text-sm font-medium mb-1" for="edit-type"
                >Tipo de R.O.</label>
              <select v-if="newPost.type_reform === 'Suplemento'" id="edit-type" class="form-select w-full" v-model="newPost.legal_regulation">
                <option :value="'Primero'">
                  Primero
                </option>
                <option :value="'Segundo'">
                  Segundo
                </option>
                <option :value="'Tercero'">
                  Tercero
                </option>
              </select>
              <input v-else id="edit-type" class="form-input w-full" type="text" v-model="disabledInput" disabled/>
            </div>

            <!-- <div>
              <label class="block text-sm font-medium mb-1" for="edit-reformtype"
                >Tipo de R.O.</label
              >
              <input id="edit-reformtype" class="form-input w-full" type="text" v-model="newPost.type"/>
            </div> -->
           
            
             <!-- Select -->
            <div>
              <label class="block text-sm font-medium mb-1" for="edit-reference"
                >Órgano Emisor</label>
              <select id="edit-reference" class="form-select w-full" v-model="newPost.reference">
                <option :value="'www.sri.gob.ec'">
                  SRI
                </option>
                <option :value="'www.supercias.gob.ec'">
                  Supercias
                </option>
                <option :value="'www.trabajo.gob.ec'">
                  Ministerio de Trabajo
                </option>
                <option :value="'www.iess.gob.ec'">
                  IESS
                </option>
              </select>
            </div>

             <!-- Start -->
             <div class="sm:col-span-2">
              <label class="block text-sm font-medium mb-1" for="edit-description"
                >Descripción</label
              >
              <textarea id="edit-description" class="form-input w-full h-max" v-model="newPost.content">
                
              </textarea>
            </div>
            
            <!-- Start -->
            <div class="sm:col-span-2">
              <label class="block text-sm font-medium mb-1" for="edit-file"
                >Archivo Adjunto</label
              >
              <form class="w-full" ref="form">
                <input id="edit-file" class="form-input w-full" type="file" ref="fileInput" @input="onSelectedFile()" />
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
            @click.stop="closeEditModal()"
          >
            Cancelar
          </button>
          <button @click="editPost(newPost, newPost.category)" :disabled="loading" class="btn-sm disabled:bg-indigo-300 bg-indigo-500 hover:bg-indigo-600 text-white">
            Guardar
          </button>
        </div>
      </div>
    </ModalBasic>
  
    <ModalBlank id="delete-post-modal" :modalOpen="deletePostModalOpen" @close-modal="deletePostModalOpen = false">
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
            <div class="text-lg font-semibold text-slate-800">¿Está seguro que desea borrar: <br/>"{{post.title}}"?</div>
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
              @click.stop="deletePostModalOpen = false">Cancelar</button>
            <button class="btn-sm bg-rose-500 hover:bg-rose-600 text-white" @click.stop="deletePost(post.id, $route.params.categoryId)">Confirmar</button>
          </div>
        </div>
      </div>
    </ModalBlank>
  </tr>
</template>

<script setup>
import axios from 'axios'
import { computed, ref } from 'vue'
import useQueryPosts from '../../composables/useQueryPosts'
import getImage from '../../composables/useResources'
import { useRoute } from 'vue-router'
import ModalBlank from '../../components/ModalBlank.vue'
import ModalBasic from '../../components/ModalBasic.vue'
const props = defineProps(['post', 'value', 'selected']);

const editPostModalOpen = ref(false);
const deletePostModalOpen = ref(false);

const newPost = ref({...props.post})
const checked = computed(() => props.selected.includes(props.value))
const route = useRoute()
const { error, loading, initializeQueriedPosts, editPost, deletePost } = useQueryPosts();

function openDelete() {
  deletePostModalOpen.value = true;
}

const openEdit = () => {
  editPostModalOpen.value = true;
}


const download = (url) => {
  const a = document.createElement('a')
  a.href = url
  
  document.body.appendChild(a)

  a.download = url.split('/').pop()
  a.click()
  document.body.removeChild(a)
}

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

  


const totalColor = (status) => {
  switch (status) {
    case 'aprobado II':
      return ' text-emerald-600'
    case 'aprobado I':
      return 'text-amber-600'
    case 'corregir':
      return 'text-rose-500'
    default:
      return 'text-slate-500'
  }
}

const statusColor = (status) => {
  switch (status) {
    case 'aprobado II':
      return 'bg-emerald-100 text-emerald-600 ' + (loading.value ? '' : 'cursor-pointer')
    case 'aprobado I':
      return 'bg-amber-100 text-amber-600 ' + (loading.value ? '' : 'cursor-pointer')
    case 'corregir':
      return 'bg-rose-100 text-rose-500 ' + (loading.value ? '' : 'cursor-pointer')
    default:
      return 'bg-slate-100 text-slate-500 ' + (loading.value ? '' : 'cursor-pointer')
  }
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

const closeEditModal=() =>{
  editPostModalOpen.value = false;
}


const changeStatus = (id, status) => {
  if (loading.value) return;
  let newStatus = 'corregir';
  switch (status) {
    case "pendiente":
      newStatus = 'corregir'
      break;
    case "corregir":
      newStatus = 'aprobado I'
      break;
    case "aprobado I":
      newStatus = 'aprobado II'
      break;
    case "aprobado II":
      newStatus = 'pendiente'
      break;

    default:
      newStatus = "pendiente"
      break;
  }
  loading.value = true;
  axios.patch(import.meta.env.VITE_API_URL + 'posts/' + id, { status: newStatus })
    .then((res) => {
      loading.value = false;
      initializeQueriedPosts(route.params.categoryId);
    })
    .catch((error) => {
      loading.value = false;

      error.value = error;
    })
}



</script>