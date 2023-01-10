<template>
  <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
    <nav class="mb-4 sm:mb-0 sm:order-1" role="navigation" aria-label="Navigation">
      <ul class="flex justify-center">
        <li class="ml-3 first:ml-0">
          <button class="btn bg-white border-slate-200" 
          :class="localpage > 1 ? `hover:border-slate-300 text-indigo-500`:`text-slate-300`"
          :disabled="localpage <= 1"
          @click="prevPageLocal()">
          &lt;- Previo</button>
        </li>
        <li class="ml-3 first:ml-0">
          <button class="btn bg-white border-slate-200"  
          :class="localpage < Math.ceil(results/10)? `hover:border-slate-300 text-indigo-500`:`text-slate-300`"
          :disabled="localpage >= Math.ceil(results/10)"
          @click="nextPageLocal()">  Siguiente -&gt;</button>
        </li>
      </ul>
    </nav>
    <div class="text-sm text-slate-500 text-center sm:text-left">
      
      Mostrando del <span class="font-medium text-slate-600">{{items > 0 ? 1+(10*(props?.localpage-1)) : '0'}}
      </span> al <span class="font-medium text-slate-600">
        {{items +(10*(props?.localpage-1))}}</span> de entre 
        <span class="font-medium text-slate-600">
          {{results}}</span> resultados
    </div>
  </div>
</template>

<script setup>
  import { defineProps, onMounted, ref } from 'vue';
  import useOrders from '../composables/useOrders';
  import useRooftopOrders from '../composables/useRooftopOrders';
  import useUsers from '../composables/useUsers';
  import useItems from '../composables/useItems';
  const props = defineProps(['items','results', 'type', 'localpage'])

  //const localpage = ref(1);
  const availablenext= ref(true);
  const availableprev= ref(true);
  const maxResults = ref(10);
  
  function nextPageLocal() {
    
    if (props.type == 'orders')
    {  
      const {loading, pages,page,nextPage} = useOrders();
      if(page.value < pages.value) 
      {
        
        availableprev.value = true;
       
        nextPage(page.value);
        if(props.localpage + 1 > pages.value){ 
          availablenext.value=false;
        }
      }
      
      return;
    }
    if (props.type == 'rooftop')
    {  
      const {loading, pages,page,nextPage} = useRooftopOrders();
      if(page.value < pages.value) 
      {
        
        availableprev.value = true;
       
        nextPage(page.value);
        if(props.localpage+1 > pages.value){ 
          availablenext.value=false;
        }
      }
      
      return;
    }
    if (props.type == 'users')
    {    
      const {loading, pages,page,nextPage} = useUsers();
      if(page.value < pages.value) 
      {
        
        availableprev.value = true;
       
        nextPage(page.value);
        if(props.localpage+1 > pages.value){ 
          availablenext.value=false;
        }
      }
      
      return;
    }  
    
  }
  function prevPageLocal() {
    
    if (props.type == 'orders')
    {  
      const {loading, page,prevPage} = useOrders();
      if(page.value > 1) 
      {
        availablenext.value = true;
       
        prevPage(page.value);
        if(props.localpage-1 < 1){ 
          availableprev.value=false;
        }
      }
      
      return;
    }
    if (props.type == 'users')
    {    
      const {loading, page,prevPage} = useUsers();
      if(page.value > 1) 
      {
        availablenext.value = true;
       
        prevPage(page.value);
        if(props.localpage-1 < 1){ 
          availableprev.value=false;
        }
      }
      
      return;
    }   
    if (props.type == 'rooftop')
    {    
      const {loading, page,prevPage} = useRooftopOrders();
      if(page.value > 1) 
      {
        availablenext.value = true;
       
        prevPage(page.value);
        if(props.localpage-1 < 1){ 
          availableprev.value=false;
        }
      }
      
      return;
    }  
    
  }
  onMounted(()=>{
    if(props.type=='views') {
      maxResults.value = 6

    }
    if(props?.results > maxResults.value) {
      availablenext.value = true;
    }
    
    if(props.localpage == 1) {
      availableprev.value = false;
    }
  })
</script>