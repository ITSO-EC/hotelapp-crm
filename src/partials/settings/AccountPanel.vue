<template>
  <div class="grow">
    <!-- Panel body -->
    <div class="p-6 space-y-6">
      <h2 class="text-2xl text-slate-800 font-bold mb-5">Cuenta</h2>
      <!-- Picture -->
      <section>
        <div class="flex items-center">
          <div class="mr-4">
            <img class="w-20 h-20 rounded-full" 
            :src="`${user?.imageUrl.length >0 ? getImage(user.profileImageUrl): previewImage}`" width="80" height="80" alt="User upload" />
          </div>
          <input id="image-input" class="hidden" accept="image/jpeg, image/png, image/jpg" type="file" @change="uploadImage">
          <button @click="clickInput" class="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white">Cambiar Foto</button>
        </div>
      </section>
      <!-- Business Profile -->
      <section>
        <h3 class="text-xl leading-snug text-slate-800 font-bold mb-1">Perfil</h3>
        <div class="text-sm">Ingrese su nombre y una breve descripción de su persona.</div>
        <div class="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
          <div class="sm:w-1/3">
            <label class="block text-sm font-medium mb-1" for="name">Nombre</label>
            <input id="name" class="form-input w-full" type="text" v-model="newUser.name"/>
          </div>
          
          <div class="sm:w-1/3">
            <label class="block text-sm font-medium mb-1" for="location">Rol</label>
            <input id="location" class="form-input w-full" type="text" value="Administrador" disabled/>
          </div>
        </div>
      </section>

       
      <!-- Cellphone -->
      <section>
        <h3 class="text-xl leading-snug text-slate-800 font-bold mb-1">Celular</h3>
        <div class="text-sm">Ingrese el nuevo número celular que desee usar.</div>
        <div class="flex flex-wrap mt-5">
          <div class="mr-2">
            <label class="sr-only" for="phonenumber"  >Celular</label>
            <input id="phonenumber" class="form-input" type="text" v-model="newUser.phoneNumber"/>
          </div>
          </div>
      </section> 
      <!-- Email -->
      <section>
        <h3 class="text-xl leading-snug text-slate-800 font-bold mb-1">Correo</h3>
        <div class="text-sm">Ingrese el nuevo correo que desea usar.</div>
        <div class="flex flex-wrap mt-5">
          <div class="mr-2">
            <label class="sr-only" for="email">Correo</label>
            <input id="email" class="form-input" type="email" v-model="newUser.email"/>
          </div>
           </div>
      </section>
      <!-- Password -->
      <section>
        <h3 class="text-xl leading-snug text-slate-800 font-bold mb-1">Contraseña</h3>
        <div class="text-sm">Puede cambiar su contraseña haciendo click en el siguiente botón.</div>
        <div class="mt-5">
          <button class="btn border-slate-200 shadow-sm text-indigo-500">Cambiar Contraseña</button>
        </div>
      </section>
      
    </div>
    <!-- Panel footer -->
    <footer>
      <div class="flex flex-col px-6 py-5 border-t border-slate-200">
        <div class="flex self-end">
          <button class="btn border-slate-200 hover:border-slate-300 text-slate-600">Cancel</button>
          <button class="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-3"
          @click="updateUser()">Guardar</button>
        </div>
      </div>
    </footer>
  </div>  
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import useAuth from '../../composables/useAuth';
import DefaultImage from '../../images/user-avatar-80.png'
import useResources from '../../composables/useResources'

const sync =ref('Off')
const previewImage = ref(DefaultImage);

const router = useRouter();
const {getImage} = useResources()
const {user,editUser}= useAuth();
const newUser = ref({
  name: user?.value.name,
  phoneNumber: user?.value.phoneNumber, 
  email: user?.value.email,
  
})
const updateUser = async() => {
  
  await editUser(newUser.value, user?.value?.id);
  router.push('/')
}

const clickInput = () => {
  const input = document.querySelector('#image-input')
  input.click();
}

const uploadImage = (e) => {
  const image = e.target.files[0];
  newUser.value.file = e.target.files[0]
  user.value.imageUrl = [];


  const reader = new FileReader();
  reader.readAsDataURL(image);
  reader.onload = e =>{
  previewImage.value = e.target.result;
  ;
  };
}

</script>