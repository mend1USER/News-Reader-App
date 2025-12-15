<template>
    <div v-if="message" class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md shadow-lg" role="alert">
      
      <div class="flex justify-between items-start"> 
        
        <div>
          <p v-if="title" class="alert-title font-bold text-red-800 mb-1">{{ title }}</p>
          <p class="text-sm">{{ message.value }}</p>
        </div>
  
        <span class="text-xl leading-none text-red-500 hover:text-red-700 cursor-pointer ml-4" @click="closeAlert">
          &times;
        </span>
      </div>
    </div>
  </template>

<script setup>
    import { computed } from 'vue';
    import { useThrowMessage } from '@/stores/throwMessage';
    const messageStore = useThrowMessage()
    
    const TITLE_MAP = {
        primary: 'Успешно',
        danger: 'Ошибка',
        warning: 'Внимание'
    }
    
    const message = computed(() => messageStore.message)
    const title = computed(( ) => message.value ? TITLE_MAP[message.value.type] : null)

    const closeAlert = () => {
       messageStore.clearMessage()
    }


</script>

<style scoped>
    
</style>