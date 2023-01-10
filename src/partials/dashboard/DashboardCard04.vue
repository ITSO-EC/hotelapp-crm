<template>
  <div class="flex flex-col col-span-full sm:col-span-6 bg-white shadow-lg rounded-sm border border-slate-200">
    <header class="px-5 py-4 border-b border-slate-100">
      <h2 class="font-semibold text-slate-800">Usuarios Con Review/ Sin Review</h2>
    </header>
    <!-- Chart built with Chart.js 3 -->
    <!-- Change the height attribute to adjust the chart height -->
   
    <BarChart :data="chartData" width="595" height="248" />
  </div>
</template>

<script setup>
import BarChart from '../../charts/BarChart01.vue'
import { ref } from 'vue';
// Import utilities
import { tailwindConfig } from '../../utils/Utils'


const props = defineProps(['review','notreview']);

let today = new Date();
const convertDate = (date) => {
  console.log(date)
  const monthNames = ["01", "02", "03", "04", "05", "06",
  "07", "08", "09", "10", "11", "12", "12"
];

  date = new Date(date)
  let dd = date.getDate(); 
  let mm = date.getMonth();
  let yyyy = date.getFullYear(); 

  if(dd<10){dd='0'+dd} 
  let result = dd+'-'+monthNames[mm]+'-'+yyyy
  console.log(result)
  return result
}
 const chartData = ref({
    labels: [
      convertDate(today)
    ],
    datasets: [
      // Light blue bars
      {
        label: 'Sin Review',
        data: [
          props.notreview
        ],
        backgroundColor: tailwindConfig().theme.colors.blue[400],
        hoverBackgroundColor: tailwindConfig().theme.colors.blue[500],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
      // Blue bars
      {
        label: 'Con Review',
        data: [
          props.review        
        ],
        backgroundColor: tailwindConfig().theme.colors.indigo[500],
        hoverBackgroundColor: tailwindConfig().theme.colors.indigo[600],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
    ],
  })

  
</script>