<template>
  <div class="flex h-screen overflow-hidden">

    <!-- Sidebar -->
    <Sidebar :sidebarOpen="sidebarOpen" @close-sidebar="sidebarOpen = false" />

    <!-- Content area -->
    <div class="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
      
      <!-- Site header -->
      <Header :sidebarOpen="sidebarOpen" @toggle-sidebar="sidebarOpen = !sidebarOpen" />

      <main>
        <div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

          <!-- Welcome banner -->
          <WelcomeBanner />
          
        
          <!-- Cards -->
          <div class="grid grid-cols-12 gap-6">
            
           <!-- Card (Recent Activity) -->
            <DashboardCard10 />
            <DashboardCard04 />
            <!-- Claves -->
            <DashboardCard01 />
            <DashboardCardMenu/>
         
          </div>

        </div>
      </main>

    </div> 

  </div>
</template>

<script setup>
import { ref } from 'vue'
import Sidebar from '../partials/Sidebar.vue'
import Header from '../partials/Header.vue'
import WelcomeBanner from '../partials/dashboard/WelcomeBanner.vue'
import FilterButton from '../components/DropdownFilter.vue'
import Datepicker from '../components/Datepicker.vue'

import DashboardCard01 from '../partials/dashboard/DashboardCard01.vue'
import DashboardCardMenu from '../partials/dashboard/DashboardCardMenu.vue'
import DashboardCard02 from '../partials/dashboard/DashboardCard02.vue'
import DashboardCard04 from '../partials/dashboard/DashboardCard04.vue'
import DashboardCard10 from '../partials/dashboard/DashboardCard10.vue'


//import usersFactory from '../factories/userFactory'
//import itemsFactory from '../factories/itemFactory'
//import ordersFactory from '../factories/orderFactory'
//import roomsFactory from '../factories/roomFactory'

const sidebarOpen = ref(false)
//const {generateUsers,initializeUsers,destroyUsers} = usersFactory();
//const {generateItems,initializeItems,destroyItems} = itemsFactory();
//const {generateOrders,initializeAllOrders,destroyOrders} = ordersFactory();
//const {generateRooms,initializeRooms,destroyRooms} = roomsFactory();


//Genera Habs. / Borra Habs.
//generateRooms()
//destroyRooms()

//Genera Usuarios / Borra
//initializeUsers()
//.then((res) => {
//  generateUsers(20);
//  destroyUsers();
//});

//Genera Items / Borra (No olvidar modificar los ids del RooftopOrders)
//initializeItems()
//.then((res) => {
  //generateItems();
  //destroyItems();
//});

//Genera Orders / Borra 
//generateOrders(20);
//destroyOrders()
</script>