<script setup>
import { useNewsData } from '@/stores/newsData'
import TheNavbar from '../TheNavbar.vue'
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import Loader from './Loader.vue'

const newsStore = useNewsData()


const formatPublishDate = (dateString) => {
  if (!dateString) return 'Дата неизвестна'

  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString('ru-RU', options)
}



const shortDescription = (text, wordLimit = 20) => {
  if(!text) {
    return ''
  }

  const words = text.split(/\s+/)

  if(words.length <= wordLimit) {
    return text
  }

  return words.slice(0, wordLimit).join(' ') + '...'
}



onMounted(() => {
  newsStore.getData()
})
</script>

<template>
  <the-navbar />

  <div class="mt-16 grid gap-6 grid-cols-3 news-list" :style="{ backgroundColor: '#2c3b50' }">
    <a
      v-for="article in newsStore.uniqueArticles"
      :key="article.article_id"
      target="_blank"
      class="news-card relative flex flex-col pb-10"
    >
      <div class="card-image-container">
<img 
  v-if="article.image_url" 
  :src="`https://wsrv.nl/?url=${encodeURIComponent(article.image_url)}&default=https://placehold.co/600x400?text=News`" 
  class="card-image"
  alt=""
>      </div>
      <div class="card-content">
        <h3 class="card-title text-white">{{ article.title }}</h3>
        <p class="text-white">{{ shortDescription(article.description, 20) }}</p>
        <p class="card-date">{{ formatPublishDate(article.pubDate) }}</p>
        <p class="card-date">{{ article.source_name }}</p>
      </div>

      <div class="flex justify-start mt-4">
        <router-link
      :to="`/post/${article.article_id}`"
      target="_blank"
      class="
        absolute 
        bottom-0 
        right-0 
        bg-blue-600 
        hover:bg-blue-700 
        text-white 
        text-sm 
        p-2 
        rounded-tl-lg 
        transition-colors
      "
    >
        Read More &rarr;
    </router-link>
      </div>
    </a>

    <div>
      <loader v-if="newsStore.loading" />
          <button class="load-more-btn text-white"  @click="newsStore.getNewNews">Load More News</button>

    </div>

    
  </div>
</template>

<style scoped>

.news-list {
  padding: 20px;
}

.load-more-btn {
  margin-top: 20px;
  padding: 10px 20px;
  cursor: pointer;
}


.news-card {
  display: block; 
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden; 
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.3s,
    box-shadow 0.3s;
  text-decoration: none; 
  color: inherit;
}

.news-card:hover {
  transform: translateY(-5px); 
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}


.card-image-container {
  width: 100%;
  height: 200px; 
  overflow: hidden;
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover; 
  transition: transform 0.3s;
}

.news-card:hover .card-image {
  transform: scale(1.05); 
}


.card-content {
  padding: 15px;
}

.card-title {
  font-size: 1.1em;
  font-weight: bold;
  margin-top: 0;
  margin-bottom: 10px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: 48px;
}

.card-date {
  font-size: 0.85em;
  color: #666;
  margin: 0;
}
</style>
