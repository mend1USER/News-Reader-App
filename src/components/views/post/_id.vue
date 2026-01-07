<template>

    <h1 class="text-white text-semibold">wonna read some news</h1>
</template>

<script setup>
  import { useNewsData } from '@/stores/newsData';

  const newsData = useNewsData()
</script>