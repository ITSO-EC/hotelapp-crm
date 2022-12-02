<template>
  <div class="col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-sm border border-slate-200">
    <div class="px-5 pt-5 flex flex-col h-full">
      <header class="flex justify-between items-start mb-2">
        <!-- Icon -->
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
      </svg>

        <EditMenu align="right" class="relative inline-flex">
          <li>
            <a class="font-medium text-sm text-slate-600 hover:text-slate-800 flex py-1 px-3" href="#0">Cambiar wifi</a>
          </li>
          <li>
            <a class="font-medium text-sm text-slate-600 hover:text-slate-800 flex py-1 px-3" href="#0">Cambiar Clave Puerta</a>
          </li>
          
        </EditMenu>
      </header>
      <div class="my-4">
        <h2 class="text-lg font-semibold text-slate-800 mb-2">Clave del Wifi</h2>
        <div class="text-xs font-semibold text-slate-400 uppercase mb-1">12345678</div>
        <h2 class="text-lg font-semibold text-slate-800 mb-2">Clave de la Puerta Exterior</h2>
        <div class="text-xs font-semibold text-slate-400 uppercase mb-1">abcdefgh</div>
      </div>
      
     
    </div>
   
  </div>
</template>

<script>
import { ref } from 'vue'
import LineChart from '../../charts/LineChart01.vue'
import EditMenu from '../../components/DropdownEditMenu.vue'

// Import utilities
import { tailwindConfig, hexToRGB } from '../../utils/Utils'

export default {
  name: 'DashboardCard01',
  components: {
    LineChart,
    EditMenu,
  },
  setup() {
    const chartData = ref({
      labels: [
        '12-01-2020', '01-01-2021', '02-01-2021',
        '03-01-2021', '04-01-2021', '05-01-2021',
        '06-01-2021', '07-01-2021', '08-01-2021',
        '09-01-2021', '10-01-2021', '11-01-2021',
        '12-01-2021', '01-01-2022', '02-01-2022',
        '03-01-2022', '04-01-2022', '05-01-2022',
        '06-01-2022', '07-01-2022', '08-01-2022',
        '09-01-2022', '10-01-2022', '11-01-2022',
        '12-01-2022', '01-01-2023',
      ],
      datasets: [
        // Indigo line
        {
          data: [
            732, 610, 610, 504, 504, 504, 349,
            349, 504, 342, 504, 610, 391, 192,
            154, 273, 191, 191, 126, 263, 349,
            252, 423, 622, 470, 532,
          ],
          fill: true,
          backgroundColor: `rgba(${hexToRGB(tailwindConfig().theme.colors.blue[500])}, 0.08)`,
          borderColor: tailwindConfig().theme.colors.indigo[500],
          borderWidth: 2,
          tension: 0,
          pointRadius: 0,
          pointHoverRadius: 3,
          pointBackgroundColor: tailwindConfig().theme.colors.indigo[500],
          clip: 20,
        },
        // Gray line
        {
          data: [
            532, 532, 532, 404, 404, 314, 314,
            314, 314, 314, 234, 314, 234, 234,
            314, 314, 314, 388, 314, 202, 202,
            202, 202, 314, 720, 642,
          ],
          borderColor: tailwindConfig().theme.colors.slate[300],
          borderWidth: 2,
          tension: 0,
          pointRadius: 0,
          pointHoverRadius: 3,
          pointBackgroundColor: tailwindConfig().theme.colors.slate[300],
          clip: 20,
        },
      ],
    })

    return {
      chartData,
    } 
  }
}
</script>