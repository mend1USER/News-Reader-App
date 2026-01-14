<template>
  <div class="min-h-screen bg-slate-900 py-10 px-4">
    <div v-if="article" class="max-w-4xl mx-auto bg-slate-800 rounded-2xl overflow-hidden shadow-2xl border border-slate-700">
      
      <div class="p-6 pb-0 flex items-center justify-between">
        <div class="flex items-center space-x-3">
          <img v-if="article.source_icon" :src="article.source_icon" alt="source icon" class="w-8 h-8 rounded-full border border-slate-600">
          <span class="text-emerald-400 font-medium text-sm uppercase tracking-wider">
            {{ article.source_name }}
          </span>
        </div>
        <time class="text-slate-400 text-sm">
          {{ formatDate(article.pubDate) }}
        </time>
      </div>

      <div class="p-6 pt-4">
        <h1 class="text-3xl md:text-4xl font-extrabold text-white leading-tight mb-6">
          {{ article.title }}
        </h1>
        
        <div v-if="article.image_url" class="relative group mb-8">
          <img 
            :src="`https://wsrv.nl/?url=${encodeURIComponent(article.image_url)}&default=https://placehold.co/600x400?text=News`" 
            :alt="article.title"
            class="w-full h-auto max-h-[500px] object-cover rounded-xl shadow-lg transition-transform duration-300 group-hover:scale-[1.01]"
          >
          <div class="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/10"></div>
        </div>

        <div class="prose prose-invert max-w-none">
          <p class="text-white text-lg leading-relaxed mb-8 first-letter:text-5xl first-letter:font-bold first-letter:text-white first-letter:mr-3 first-letter:float-left">
            {{ article.description  }}
          </p>
        </div>

        <div class="mt-10 pt-6 border-t border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4">
          <router-link 
            to="/home" 
            class="flex items-center text-slate-400 hover:text-white transition-colors group"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Feed
          </router-link>

          <a 
            :href="article.link" 
            target="_blank" 
            class="inline-flex items-center px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg transition-all shadow-lg shadow-emerald-900/20"
          >
            Read Original Source
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </div>

    <div v-else class="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mb-4"></div>
      <p class="text-slate-400 text-xl">Searching for the article...</p>
      <router-link to="/" class="mt-6 text-emerald-500 hover:underline">Return to safety</router-link>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { useNewsData } from '@/stores/newsData';
import { computed, onMounted } from 'vue';

const route = useRoute();
const newsData = useNewsData();

const article = computed(() => newsData.getArticleById(route.params.id));

// Простая функция для красивой даты
const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

onMounted(async () => {
  if (newsData.articles.length === 0) {
    await newsData.getData();
  }
});
</script>