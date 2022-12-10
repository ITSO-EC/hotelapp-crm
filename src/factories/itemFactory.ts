import useItems from '../composables/useItems';
import { faker } from '@faker-js/faker';
import {Item} from '../interfaces/item'

const itemsFactory = () => {
    const {items, results, initializeItems,createItem, deleteItem} = useItems();
    
    const itemsList = [
        { 
            "name": "Desayuno",
            "description": "El desayuno del día trae desayuno",
            "price": 0,
            "schedule": "adsadas",
            "reclaimable": true,
            "isVisible": true
        },
        { 
            "name": "Té Verde",
            "description": "---",
            "price": 0,
            "schedule": "---",
            "reclaimable": true,
            "isVisible": true
        },
        { 
            "name": "Té Negro",
            "description": "---",
            "price": 0,
            "schedule": "---",
            "reclaimable": true,
            "isVisible": true
        },
        { 
            "name": "Té de Frutos Rojos",
            "description": "---",
            "price": 0,
            "schedule": "---",
            "reclaimable": true,
            "isVisible": true
        },
        { 
            "name": "Copas de Cristal",
            "description": "---",
            "price": 0,
            "schedule": "---",
            "reclaimable": true,
            "isVisible": true
        },
        { 
            "name": "Té de Coca",
            "description": "---",
            "price": 0,
            "schedule": "---",
            "reclaimable": true,
            "isVisible": true
        },
        { 
            "name": "Vasos de Cristal",
            "description": "---",
            "price": 0,
            "schedule": "---",
            "reclaimable": true,
            "isVisible": true
        },
        { 
            "name": "Sacacorchos",
            "description": "---",
            "price": 0,
            "schedule": "---",
            "reclaimable": true,
            "isVisible": true
        },
        { 
            "name": "Jabón",
            "description": "---",
            "price": 0,
            "schedule": "---",
            "reclaimable": true,
            "isVisible": true
        },
        { 
            "name": "Shampoo",
            "description": "---",
            "price": 0,
            "schedule": "---",
            "reclaimable": true,
            "isVisible": true
        },
        { 
            "name": "Calefactor",
            "description": "---",
            "price": 0,
            "schedule": "---",
            "reclaimable": true,
            "isVisible": true
        },
        { 
            "name": "Toalla de Manos",
            "description": "---",
            "price": 0,
            "schedule": "---",
            "reclaimable": true,
            "isVisible": true
        },
        { 
            "name": "Toalla de Pies",
            "description": "---",
            "price": 0,
            "schedule": "---",
            "reclaimable": true,
            "isVisible": true
        },
        { 
            "name": "Toalla Grande",
            "description": "---",
            "price": 0,
            "schedule": "---",
            "reclaimable": true,
            "isVisible": true
        },
        { 
            "name": "Termo de Agua Caliente",
            "description": "---",
            "price": 0,
            "schedule": "---",
            "reclaimable": true,
            "isVisible": true
        },
        { 
            "name": "Control Remoto",
            "description": "---",
            "price": 0,
            "schedule": "---",
            "reclaimable": true,
            "isVisible": true
        },
        { 
            "name": "Secador de Cabello",
            "description": "---",
            "price": 0,
            "schedule": "---",
            "reclaimable": true,
            "isVisible": true
        },
        { 
            "name": "Plancha de Ropa",
            "description": "---",
            "price": 0,
            "schedule": "---",
            "reclaimable": true,
            "isVisible": true
        },
        { 
            "name": "Cobija",
            "description": "---",
            "price": 0,
            "schedule": "---",
            "reclaimable": true,
            "isVisible": true
        },
        { 
            "name": "Almohada Suave y Baja",
            "description": "---",
            "price": 0,
            "schedule": "---",
            "reclaimable": true,
            "isVisible": true
        },
        { 
            "name": "Almohada Dura y Alta",
            "description": "---",
            "price": 0,
            "schedule": "---",
            "reclaimable": true,
            "isVisible": true
        },
        { 
            "name": "Guardado de Equipaje (Gratis)",
            "description": "---",
            "price": 0,
            "schedule": "---",
            "reclaimable": true,
            "isVisible": true
        },
        { 
            "name": "Lavandería",
            "description": "---",
            "price": 0,
            "schedule": "---",
            "reclaimable": true,
            "isVisible": true
        },
        { 
            "name": "Papel Higiénico",
            "description": "---",
            "price": 0,
            "schedule": "---",
            "reclaimable": true,
            "isVisible": true
        },
        { 
            "name": "WifiCode",
            "description": "123123123",
            "price": 0,
            "schedule": "adsadas",
            "reclaimable": true,
            "isVisible": true          
        },
        { 
            "name": "DoorKey",
            "description": "123123123",
            "price": 0,
            "schedule": "adsadas",
            "reclaimable": true,
            "isVisible": true
          }

    ]

    const generateItems = async () => {
        await initializeItems();

        for (let i = 0; i < itemsList.length; i++)
        {
            await createItem(itemsList[i]);
            console.log("Item: "+i);
        }
        
    } 
    
    const destroyItems = async () => {
        await initializeItems();
        let amount = results.value;
        console.log('totalResults= '+ amount)
        for (let index=0; index<items.value.length;index++)
        {
            await deleteItem(items.value[index].id||'');
            console.log("Restantes: "+ amount);
                
            
            
        }
    } 
    

    

    return {
        initializeItems,
        generateItems,
        destroyItems
    }
}

export default itemsFactory;
