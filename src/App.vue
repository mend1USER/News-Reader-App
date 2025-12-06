<template>
  <html class="h-full bg-gray-900">
    <body  class="h-full">
      
    
  <!-- <MainLayout /> -->
  <!-- <AuthLayout /> -->
<Auth />

<RouterLink to="/">Home</RouterLink>

<RouterView />

</body>
</html>
</template>

<script setup>
import Home from './components/views/Home.vue';
// import AuthLayout from './layouts/AuthLayout.vue';
import Auth from './components/views/Auth.vue';



</script>
