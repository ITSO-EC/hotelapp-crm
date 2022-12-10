import useRooms from '../composables/useRooms';
import { faker } from '@faker-js/faker';
import {Room} from '../interfaces/room'

const roomsFactory = () => {
    const {rooms, results, initializeRooms,createRoom, deleteRoom} = useRooms();
    const roomsList = [
        { 
            "name":"Habitacion Simple",
            "description": "Dos Camas, 1 Litera",
            "wifiData":"2123",
            "doorKey":"2131",
            "checkOutTime":"--",
            "number":"112"
          },
          { 
            "name":"Habitacion Simple",
            "description": "Dos Camas, 1 Litera",
            "wifiData":"2123",
            "doorKey":"2131",
            "checkOutTime":"--",
            "number":"113"
          },
          { 
            "name":"Habitacion Simple",
            "description": "Dos Camas, 1 Litera",
            "wifiData":"2123",
            "doorKey":"2131",
            "checkOutTime":"--",
            "number":"114"
          },
          { 
            "name":"Habitacion Simple",
            "description": "Dos Camas, 1 Litera",
            "wifiData":"2123",
            "doorKey":"2131",
            "checkOutTime":"--",
            "number":"115"
          }
    ]
    const generateRooms = async () => {
        for (let i = 0; i < roomsList.length; i++)
        {
            await createRoom(roomsList[i]);
            console.log("Room: "+i);
        }
    } 
    
    const destroyRooms = async () => {
        await initializeRooms();
        let amount = results.value;
        console.log('totalResults= '+ amount)
        for (let index=0; index<rooms.value.length;index++)
        {
            await deleteRoom(rooms.value[index].id||'');
            console.log("Restantes: "+ amount);
                
            
            
        }
    } 
    


    return {
        initializeRooms,
        generateRooms,
        destroyRooms
    }
}

export default roomsFactory;
