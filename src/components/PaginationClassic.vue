<template>
  <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
    <nav class="mb-4 sm:mb-0 sm:order-1" role="navigation" aria-label="Navigation">
      <ul class="flex justify-center">
        <li class="ml-3 first:ml-0">
          <button class="btn bg-white border-slate-200" 
          :class="availableprev ? `hover:border-slate-300 text-indigo-500`:`text-slate-300`"
          :disabled="!availableprev"
          @click="prevPageLocal()">
          &lt;- Previo</button>
        </li>
        <li class="ml-3 first:ml-0">
          <button class="btn bg-white border-slate-200"  
          :class="availablenext? `hover:border-slate-300 text-indigo-500`:`text-slate-300`"
          :disabled="!availablenext"
          @click="nextPageLocal()">Siguiente -&gt;</button>
        </li>
      </ul>
    </nav>
    <div class="text-sm text-slate-500 text-center sm:text-left">
      Mostrando del <span class="font-medium text-slate-600">{{items > 0 ? 1+(10*(localpage-1)) : '0'}}
      </span> al <span class="font-medium text-slate-600">
        {{items +(10*(localpage-1))}}</span> de entre 
        <span class="font-medium text-slate-600">
          {{results}}</span> resultados
    </div>
  </div>
</template>

<script setup>
  import { defineProps, onMounted, ref } from 'vue';
  import useOrders from '../composables/useOrders';
  import useUsers from '../composables/useUsers';
  import useCategories from '../composables/useCategories';
  import useViews from '../composables/useViews';
  import useQueryPosts from '../composables/useQueryPosts';
  const props = defineProps(['items','results', 'type'])

  const localpage = ref(1);
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
        localpage.value = page.value + 1;
        nextPage(page.value);
        if(localpage.value+1 > pages.value){ 
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
        localpage.value = page.value + 1;
        nextPage(page.value);
        if(localpage.value+1 > pages.value){ 
          availablenext.value=false;
        }
      }
      
      return;
    }  
    if (props.type == 'posts')
    {    
      const {posts,loading, pages,page,nextPage} = useQueryPosts();
      if(page.value < pages.value) 
      {
        
        availableprev.value = true;
        localpage.value = page.value + 1;
        nextPage(page.value, posts.value[0].category);
        if(localpage.value+1 > pages.value){ 
          availablenext.value=false;
        }
      }
      
      return;
    }
    if (props.type == 'categories')
    {    
      const {categories,loading, pages,page,nextPage} = useCategories();
      if(page.value < pages.value) 
      {
        
        availableprev.value = true;
        localpage.value = page.value + 1;
        nextPage(categories.value[0].page ,page.value);
        if(localpage.value+1 > pages.value){ 
          availablenext.value=false;
        }
      }
      
      return;
    }  
    if (props.type == 'views')
    {    
      const {loading, pages,page,nextPage} = useViews();
      console.log('page', page.value, 'pages', pages.value)
      if(page.value < pages.value) 
      {
        
        availableprev.value = true;
        localpage.value = page.value + 1;
        nextPage(page.value);
        if(localpage.value+1 > pages.value){ 
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
        localpage.value = page.value - 1;
        prevPage(page.value);
        if(localpage.value-1 < 1){ 
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
        localpage.value = page.value - 1;
        prevPage(page.value);
        if(localpage.value-1 < 1){ 
          availableprev.value=false;
        }
      }
      
      return;
    }  
    if (props.type == 'posts')
    {    
      const {loading, page,prevPage} = useQueryPosts();
      if(page.value > 1) 
      {
        availablenext.value = true;
        localpage.value = page.value - 1;
        prevPage(page.value, posts.value[0].category);
        if(localpage.value-1 < 1){ 
          availableprev.value=false;
        }
      }
      
      return;
    }
    if (props.type == 'categories')
    {    
      const {categories,loading, page,prevPage} = useCategories();
      if(page.value > 1) 
      {
        availablenext.value = true;
        localpage.value = page.value - 1;
        prevPage(categories.value[0].page,page.value);
        if(localpage.value-1 < 1){ 
          availableprev.value=false;
        }
      }
      
      return;
    }  
    if (props.type == 'views')
    {    
      const {loading, page,prevPage} = useViews();
      if(page.value > 1) 
      {
        availablenext.value = true;
        localpage.value = page.value - 1;
        prevPage(page.value);
        if(localpage.value-1 < 1){ 
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
    console.log(props.type,props?.results)
    if(props?.results > maxResults.value) {
      availablenext.value = true;
    }
    
    if(localpage.value == 1) {
      availableprev.value = false;
    }
  })
</script>