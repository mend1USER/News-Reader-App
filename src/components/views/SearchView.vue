<template>
    <form class="max-w-lg mx-auto" @submit.prevent="handleSearch">
      <div class="flex shadow-xs rounded-base -space-x-0.5">
        <button
          id="dropdown-button-location"
          data-dropdown-toggle="dropdown-location"
          type="button"
          class="inline-flex text-white items-center shrink-0 z-10 text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary font-medium leading-5 rounded-s-base text-sm px-4 py-2.5 focus:outline-none"
          @click="isDropdownOpen = !isDropdownOpen"
        >
        <component :is="selectedCountry.flagSvg" class="w-4 h-4 me-1.5" />
          {{ selectedCountry.name }}
        </button>
  
        <div id="dropdown-location" :class="{'hidden': !isDropdownOpen}" class="z-10 bg-white absolute mt-12 bg-neutral-primary-medium border border-default-medium rounded-base shadow-lg w-44">
          <ul class="p-2 text-sm text-body font-medium" aria-labelledby="dropdown-button-location">
            <li v-for="country in countries" :key="country.code">
              <a
                href="#"
                class=" inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded-md"
                @click.prevent="selectCountry(country)"
              >
              <component :is="country.flagSvg" class="w-4 h-4 me-1.5" />
                {{ country.name }}
              </a>
            </li>
          </ul>
        </div>
        
        <input
          type="search"
          id="search-dropdown-location"
          class="px-3 py-2.5 text-white bg-neutral-secondary-medium border border-default-medium text-heading text-sm focus:ring-brand focus:border-brand block w-full placeholder:text-body"
          placeholder="Search News"
          required
          v-model.trim="searchQuery"
        >
        
        <button
          type="submit"
          class="inline-flex items-center text-white bg-brand hover:bg-brand-strong box-border border border-transparent focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-e-base text-sm px-4 py-2.5 focus:outline-none"
        >
          <svg class="w-4 h-4 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/></svg>
          Search
        </button>
      </div>
    </form>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import AustraliaIcon from '@/assets/countryIcons/AustraliaIcon.svg'
  import UsaIcon from '@/assets/countryIcons/UsaIcon.svg'
  
  // 1. Управление состоянием (State Management)
  const searchQuery = ref('');
  const isDropdownOpen = ref(false);
  
  const countries = ref([
    {code: 'null', name: 'None'},
      { code: 'USA', name: 'USA', flagSvg: AustraliaIcon },
      { code: 'AUS', name: 'Australia', flagSvg: UsaIcon },
      { code: 'GBR', name: 'United Kingdom' },
      { code: 'FRA', name: 'France' },
      { code: 'CAN', name: 'Canada' },
  ]);
  
  const selectedCountry = ref(countries.value[0]); // Начальное значение - USA
  
  // 2. Логика (Methods/Functions)
  const selectCountry = (country) => {
      selectedCountry.value = country;
      isDropdownOpen.value = false;
  };
  
  // Объявление пользовательского события (custom event), которое будет отправлено родителю
  const emit = defineEmits(['search']);
  
  const handleSearch = () => {
      // Выполняем действия по поиску (например, отправка HTTP-запроса)
      // А пока что - просто отправляем событие родительскому компоненту
      emit('search', {
          country: selectedCountry.value.code,
          query: searchQuery.value
      });
  
      // Опционально: очистить поле ввода после поиска
      // searchQuery.value = ''; 
  };
  
  </script>
  
  <style scoped>
  /* Здесь можно добавить стили, специфичные для этого компонента, 
     или использовать Tailwind CSS, если он подключен в вашем проекте. 
     Так как в вашем HTML-шаблоне используются классы Tailwind, 
     предполагается, что он подключен. */
  </style>