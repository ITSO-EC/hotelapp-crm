<template>
  <div class="grid sm:grid-cols-2 ">
    <button 
      @click.stop="basicGalleryModalOpen = true"
      class="btn bg-indigo-500 hover:bg-indigo-600 text-white mb-2"><svg class="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16"><path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z"></path></svg>
      <span class="hidden xs:block ml-2">Añadir Foto</span>
    </button>
    <div  v-if="gallery?.length">
      <button @click="prevPics(offset)" 
      :disabled="start<=0"
      :class="start<= 0? 'btn bg-white border border-slate-200 text-slate-300' : 'btn bg-white border-slate-200 hover:border-slate-308 text-indigo-500'"
      
      class="btn bg-white border border-slate-200 text-slate-300"><span class="sr-only">Anterior</span><wbr><svg class="h-4 w-4 fill-current" viewBox="0 0 16 16"><path d="M9.4 13.4l1.4-1.4-4-4 4-4-1.4-1.4L4 8z"></path></svg></button>
      <span class="mx-4">{{finish < gallery.length? finish: gallery.length}} de {{gallery.length}}</span>
      <button @click="nextPics(offset)" 
      :disabled="finish>=gallery.length"
      :class="finish >= gallery.length? 'btn bg-white border border-slate-200 text-slate-300' : 'btn bg-white border-slate-200 hover:border-slate-308 text-indigo-500'"
      class="">
        <span class="sr-only">Siguiente</span>
        <wbr>
        <svg class="h-4 w-4 fill-current" viewBox="0 0 16 16">
        <path d="M6.6 13.4L5.2 12l4-4-4-4 1.4-1.4L12 8z">

        </path>
      </svg>
      </button>
    </div>
    <div v-for="(photo,index) in galleryUser" :key="`photo-${index}`" 
    
    class="m-1 h-40 bg-slate-700 flex items-center justify-center relative">
      <img :src="getImage(photo)" class="object-cover h-36" alt="User Photo">
      <div
      @click.stop="dangerGalleryModalOpen = true;selectedPicture = []; selectedPicture.push(photo)" 
      class="cursor-pointer hover:bg-slate-300 active:bg-slate-50 absolute top-2 right-2 bg-slate-100 rounded-full p-2 text-red-500">
      
        <BaseIcon :name="'trash'"></BaseIcon>
      </div>
    </div>

    <ModalBasic  :modalOpen="basicGalleryModalOpen"
      @close-modal="basicGalleryModalOpen = false"
      title="Subir foto a galería">
     <!-- Modal content -->
     <div class="px-5 pt-4 pb-1">
        <div class="text-sm">
         
          <div class="space-y-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="flex justify-center sm:col-span-2">
              <input :id="`gallery-input-${userid}`" class="hidden" accept="image/jpeg, image/png, image/jpg" type="file" @change.stop="uploadImage">
          
              <img
                @click.stop="clickInput"
                class="rounded-full cursor-pointer hover:grayscale ease-in-out duration-300 active:grayscale-0"
                :src=" `${previewImage}`"
                width="64"
                height="64"
                :alt="'Foto de perfil'"
              />
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
            @click.stop="basicGalleryModalOpen = false"
          >
            Cancelar
          </button>
          <button @click.stop="addImage(newPic, userid)" class="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white">
            Guardar
          </button>
        </div>
      </div>
    </ModalBasic>
    
    
    <!-- Delete Profile -->
    <ModalBlank
      :id="`danger-gallery-modal-gallery`"
      :modalOpen="dangerGalleryModalOpen"
      @close-modal="dangerGalleryModalOpen = false"
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
              ¿Está seguro que desea eliminar esta foto?
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
              @click.stop="dangerGalleryModalOpen = false; selectedPicture = []"
            >
              Cancelar
            </button>
            <button @click.stop="dangerGalleryModalOpen = false; deleteImage(selectedPicture, userid); selectedPicture = []" class="btn-sm bg-rose-500 hover:bg-rose-600 text-white">
              Si, eliminar
            </button>
          </div>
        </div>
      </div>
    </ModalBlank>
  </div>

</template>

<script setup>
import {ref} from 'vue'
import useResources from '../../composables/useResources';
import ModalBlank from '../../components/ModalBlank.vue'
import ModalBasic from '../../components/ModalBasic.vue'
import useUsers from '../../composables/useUsers';
import{ defineProps }from 'vue'
import DefaultImage from '../../images/user-avatar-80.png'
import BaseIcon from '../../components/BaseIcon.vue';

const previewImage = ref(DefaultImage);
const basicGalleryModalOpen = ref(false);
const dangerGalleryModalOpen = ref(false);
const selectedPicture = ref([])
const props = defineProps(['gallery', 'userid']) //user=>id
const {getImage} = useResources();
const {addImage, deleteImage} = useUsers();

const offset = ref(4);
const page = ref(0);
const start = ref(0);
const finish = ref(4);
const nextButton = ref(true);
const prevButton = ref(false);
const galleryUser = ref(props?.gallery?.slice(0,4))
const nextPics = (amount) => {
    let galleryArray = props?.gallery;
    let limit = Math.ceil(galleryArray.length / offset.value);

    if((page.value + 2) < limit)
    {
      page.value++;
      start.value += offset.value *(page.value)
      finish.value += offset.value *(page.value)
      galleryUser.value = galleryArray.slice(start.value, finish.value);
    }
    else
    {
      if(finish.value + (galleryArray.length % offset.value) < galleryArray.length+1){
        start.value += (galleryArray.length % offset.value);
        finish.value += (galleryArray.length % offset.value);
        galleryUser.value = galleryArray.slice(start.value, finish.value);
      }
    }
      
}



const prevPics = (amount) => {
  let galleryArray = props?.gallery;
    let limit = Math.ceil(galleryArray.length / offset.value);

    if(start.value - (offset.value * (limit-page.value)) >= 0)
    {
      limit--;
      start.value -= offset.value *(limit-page.value)
      finish.value -= offset.value *(limit-page.value)
      galleryUser.value = galleryArray.slice(start.value, finish.value);
      
      page.value--;
    }
    else
    {
      if(start.value -  (galleryArray.length % offset.value)  >= 0)
      {
        start.value -= (galleryArray.length % offset.value);
        finish.value -= (galleryArray.length % offset.value);
        galleryUser.value = galleryArray.slice(start.value, finish.value);
      }
    }
}


const newPic =  ref({
  file:''
})
const clickInput = (e) => {
  const input = document.querySelector(`#gallery-input-${props?.userid}`)
  input.addEventListener('click', event=>{
    event.stopPropagation()
  })
  input.click();
}

const uploadImage = (e) => {
  const image = e.target.files[0];
  previewImage.value= e.target.files[0];
  newPic.value.file = e.target.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(image);
  reader.onload = e =>{
    
  previewImage.value = e.target.result;
  };
}

</script>