import useOrders from '../composables/useOrders';
import useItems from '../composables/useItems';
import useUsers from '../composables/useUsers';
import { faker } from '@faker-js/faker';
import {Order} from '../interfaces/order'

const ordersFactory = () => {
    const {orders, results, initializeAllOrders,createOrder, deleteOrder} = useOrders();
    const {users, initializeClients} = useUsers();
    const {items, initializeItems} = useItems();
    

    const generateOrders = async (amount:number) => {
        await initializeAllOrders();
        await initializeItems();
        await initializeClients();

        for (let i = 0; i < amount; i++)
        {
            await createOrder(createRandomOrder());
            console.log("Order: "+i);
        }
        
    } 
    
    const destroyOrders = async () => {
        await initializeAllOrders();
        let amount = results.value;
        console.log('totalResults= '+ amount)
        for (let index=0; index<orders.value.length;index++)
        {
            await deleteOrder(orders.value[index].id||'');
            console.log("Restantes: "+ amount);
                
            
            
        }
    } 
    
    function createRandomOrder(): Order {
        return {
           item: '63945f93c33e836efa9d3c7b',//items?.value[faker.datatype.number(items.value.length-1)]?.id || "",
           user: users?.value[faker.datatype.number(users.value.length-1)]?.id || "",
           status: faker.helpers.arrayElement(['success','pending','finished','rejected']),
        };
      }
    

    return {
        initializeAllOrders,
        generateOrders,
        destroyOrders
    }
}

export default ordersFactory;
