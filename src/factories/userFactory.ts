import useUsers from '../composables/useUsers';
import useRooms from '../composables/useRooms';
import { faker } from '@faker-js/faker';
import {User} from '../interfaces/user'

const usersFactory = () => {
    const {users, results, initializeUsers,createUser, deleteUser} = useUsers();
    const {rooms, initializeRooms} = useRooms();
    const generateUsers = async (amount:number) => {
        await initializeRooms();
        for (let i = 0; i < amount; i++)
        {
            await createUser(createRandomUser());
            console.log("User: "+i);
        }
    } 
    
    const destroyUsers = async () => {
        await initializeUsers();
        let amount = results.value;
        console.log('totalResults= '+ amount)
        for (let index=0; index<users.value.length;index++)
        {
            await deleteUser(users.value[index].id||'');
            console.log("Restantes: "+ amount);
                
            
            
        }
    } 
    

    function createRandomUser(): User {
        return {
            name: faker.name.firstName(),
            role: faker.helpers.arrayElement(['user','admin']), 
            password: 'adminadmin123',
            email: faker.internet.email(),
            phoneNumber:faker.phone.number('+### ###-###-###'),
            room: rooms?.value[faker.datatype.number(rooms.value.length-1)]?.id || "",
        };
      }

    return {
        initializeUsers,
        generateUsers,
        destroyUsers
    }
}

export default usersFactory;
