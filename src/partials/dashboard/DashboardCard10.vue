<template>
  <div class="col-span-full xl:col-span-6 bg-white shadow-lg rounded-sm border border-slate-200">
    <header class="px-5 py-4 border-b border-slate-100">
      <h2 class="font-semibold text-slate-800">Actividad Reciente</h2>
    </header>
    <div class="p-3">

      <!-- Card content -->
      <!-- "Today" group -->
      <div>
        <header class="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm font-semibold p-2">Hoy</header>
        <ul class="my-1">
          <!-- Item -->
          <li class="flex px-2">
            <div class="w-9 h-9 rounded-full shrink-0 bg-emerald-500 my-2 mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 28 28" stroke-width="1.5" stroke="currentColor" class="text-rose-50 w-9 h-9 ml-[1px] mt-[1px]">
                <path stroke-linecap="round" stroke-linejoin="round" d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 01-.657.643 48.39 48.39 0 01-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 01-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 00-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 01-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 00.657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 01-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 005.427-.63 48.05 48.05 0 00.582-4.717.532.532 0 00-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 00.658-.663 48.422 48.422 0 00-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 01-.61-.58v0z" />
              </svg>

            </div>
            <div class="grow flex items-center border-b border-slate-100 text-sm py-2">
              <div class="grow flex justify-between">
                <div class="self-center"><a class="font-medium text-slate-800 hover:text-slate-900" href="#0">Alfonso</a> dejó una nueva review.</div>
                <div class="shrink-0 self-end ml-2">
                  <a class="font-medium text-indigo-500 hover:text-indigo-600" href="#0">Ver<span class="hidden sm:inline"> -&gt;</span></a>
                </div>
              </div>
            </div>
          </li>
          <!-- Item -->
          <li class="flex px-2">
            <div class="w-9 h-9 rounded-full shrink-0 bg-rose-500 my-2 mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 28 28" stroke-width="1.5" stroke="currentColor" class="w-9 h-9 mt-1 ml-[2px] text-rose-50">
                <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5" />
              </svg>

            </div>
            <div class="grow flex items-center border-b border-slate-100 text-sm py-2">
              <div class="grow flex justify-between">
                <div class="self-center"><a class="font-medium text-slate-800" href="#0">Alfonso</a> ha hecho un pedido en la habitacion <a class="font-medium text-slate-800 hover:text-slate-900" href="#0">112</a></div>
                <div class="shrink-0 self-end ml-2">
                  <a class="font-medium text-indigo-500 hover:text-indigo-600" href="#0">Ver<span class="hidden sm:inline"> -&gt;</span></a>
                </div>
              </div>
            </div>
          </li>
          <!-- Item -->
          <li class="flex px-2">
            <div class="w-9 h-9 rounded-full shrink-0 bg-rose-500 my-2 mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 28 28" stroke-width="1.5" stroke="currentColor" class="w-9 h-9 mt-1 ml-[2px] text-rose-50">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
              </svg>


            </div>
            <div class="grow flex items-center border-b border-slate-100 text-sm py-2">
              <div class="grow flex justify-between">
                <div class="self-center"><a class="font-medium text-slate-800" href="#0">Staff</a> ha actualizado un pedido de la habitacion <a class="font-medium text-slate-800 hover:text-slate-900" href="#0">112</a></div>
                <div class="shrink-0 self-end ml-2">
                  <a class="font-medium text-indigo-500 hover:text-indigo-600" href="#0">Ver<span class="hidden sm:inline"> -&gt;</span></a>
                </div>
              </div>
            </div>
          </li>
          <!-- Item -->
          <li class="flex px-2">
            <div class="w-9 h-9 rounded-full shrink-0 bg-blue-500 my-2 mr-3">
              <svg class="w-9 h-9 fill-current text-emerald-50" viewBox="0 0 36 36">
                <path d="M15 13v-3l-5 4 5 4v-3h8a1 1 0 000-2h-8zM21 21h-8a1 1 0 000 2h8v3l5-4-5-4v3z" />
              </svg>
            </div>
            <div class="grow flex items-center text-sm py-2">
              <div class="grow flex justify-between">
                <div class="self-center">¡<a class="font-medium text-slate-800 hover:text-slate-900" href="#0">Patricio</a> ha sido registrado en el hotel!</div>
                <div class="shrink-0 self-end ml-2">
                  <a class="font-medium text-indigo-500 hover:text-indigo-600" href="#0">Ver<span class="hidden sm:inline"> -&gt;</span></a>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <!-- "Yesterday" group -->
      <div>
        <header class="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm font-semibold p-2">Ayer</header>
        <ul class="my-1">
        
        
          <!-- Item -->
          <li class="flex px-2">
            <div class="w-9 h-9 rounded-full shrink-0 bg-blue-500 my-2 mr-3">
              <svg class="w-9 h-9 fill-current text-emerald-50" viewBox="0 0 36 36">
                <path d="M15 13v-3l-5 4 5 4v-3h8a1 1 0 000-2h-8zM21 21h-8a1 1 0 000 2h8v3l5-4-5-4v3z" />
              </svg>
            </div>
            <div class="grow flex items-center text-sm py-2">
              <div class="grow flex justify-between">
                <div class="self-center">¡<a class="font-medium text-slate-800 hover:text-slate-900" href="#0">Alfonso</a> ha sido registrado en el hotel!</div>
                <div class="shrink-0 self-end ml-2">
                  <a class="font-medium text-indigo-500 hover:text-indigo-600" href="#0">Ver<span class="hidden sm:inline"> -&gt;</span></a>
                </div>
              </div>
            </div>
          </li>

          <!-- Item -->
          <li class="flex px-2">
            <div class="w-9 h-9 rounded-full shrink-0 bg-rose-500 my-2 mr-3">
              <svg class="w-9 h-9 fill-current text-rose-50" viewBox="0 0 36 36">
                <path d="M25 24H11a1 1 0 01-1-1v-5h2v4h12v-4h2v5a1 1 0 01-1 1zM14 13h8v2h-8z" />
              </svg>
            </div>
            <div class="grow flex items-center border-b border-slate-100 text-sm py-2">
              <div class="grow flex justify-between">
                <div class="self-center"><a class="font-medium text-slate-800" href="#0">Staff</a> ha actualizado un pedido de la habitacion <a class="font-medium text-slate-800 hover:text-slate-900" href="#0">110</a></div>
                <div class="shrink-0 self-end ml-2">
                  <a class="font-medium text-indigo-500 hover:text-indigo-600" href="#0">Ver<span class="hidden sm:inline"> -&gt;</span></a>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'DashboardCard10',
}
</script>