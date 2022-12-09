import axios from 'axios';
import { storeToRefs } from 'pinia';
import { Post } from '../interfaces/post';
import { useQueryPostsStore } from '../stores/queryPostsStore'
const PROXY_URL='https://sheltered-dusk-91889.herokuapp.com/'
const BASE_API='https://itso.ga/v1/'

const useQueryPosts = () => {
    const queryPostsStore = useQueryPostsStore();
    
    const {posts, selectedPost, error, loading, results, page, pages} = storeToRefs(queryPostsStore);

    const initializeAllPosts = async()=>{
        loading.value = true;
        queryPostsStore.loadPosts(await axios.get(BASE_API+'posts'))
        loading.value = false;
    };
    const initializeQueriedPosts = async(id: string, page:number=1)=>{
      loading.value = true;

      try {
        queryPostsStore.loadPosts(await axios.get(BASE_API+'posts?byCategory='+id+'&page='+page))
        if(posts.value ==undefined)
        {
          posts.value = [];
          results.value = 0;
        }
        loading.value = false;
      } catch (err) {
        error.value = err;
        loading.value = false;
      } 
        
    };
    const selectPostById = (id: string) => queryPostsStore.getPostById(id);

    const nextPage = async (actualpage:number, catid: string) => {
      await initializeQueriedPosts(catid,actualpage+1);
    }
    const prevPage = async (actualpage:number, catid:string) => {
      await initializeQueriedPosts(catid,actualpage-1);
    }
    const createPost = async ( payload:Post ,categoryid:string) => {
        loading.value = true;
        
        try {  
            await axios.post(BASE_API+'posts',{
              ...payload, 
              category: categoryid,
              type:'pending'
            }, 
            {
              headers: {
                'Content-type':'multipart/form-data'
              }
            })
          loading.value = false;
          await initializeQueriedPosts(categoryid);
        } catch (err) {
          loading.value = false;
          error.value = err;
          //console.log("MIerror",err)
          
        }
        
    };

    const editPost = async ( payload:Post,categoryid:string) => {
      loading.value = true;
      if(payload.type_reform != 'Suplemento') {
        payload.legal_regulation = '---'
      };
      
      try {  
        console.log("payload",payload)
          await axios.patch(BASE_API+'posts/'+payload.id, {
            ...payload, 
            category: categoryid,
            type:'pending'
          }, 
          {
            headers: {
              'Content-type':'multipart/form-data',

            }
          })
        loading.value = false;
        //initializeQueriedPosts(categoryid);

      } catch (err) {
        loading.value = false;
        error.value = err;
       console.log("MIerror",err)
        
      }
      
  };

    const deletePost = async (id:string, catid:string) => {
      loading.value = true;
      
      try {
        await axios.delete(BASE_API+'posts/'+id);
        loading.value = false;
        
        initializeQueriedPosts(catid);

      } catch (error) {
        console.error(error)
        
        error.value = error;
        loading.value = false;
      }
      
      
    }

    return {
        // Properties
        posts,
        selectedPost,
        error,
        loading,
        results,
        page,
        pages,

        //methods
        createPost,
        editPost,
        deletePost,
        nextPage,
        prevPage,
        initializeAllPosts,
        initializeQueriedPosts,
        selectPostById

    }
}
export default useQueryPosts;
