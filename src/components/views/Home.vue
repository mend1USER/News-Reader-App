<script setup>
import { useNewsData } from '@/stores/newsData'
import TheNavbar from '../TheNavbar.vue'
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'

const newsStore = useNewsData()

const {articlesWithImage, articles } = storeToRefs(newsStore)

const formatPublishDate = (dateString) => {
  if (!dateString) return 'Дата неизвестна'

  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString('ru-RU', options)
}



const truncateDescription = (text, wordLimit = 20) => {
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
        <img :src="article.image_url" :alt="article.title" class="card-image" />
      </div>
      <div class="card-content">
        <h3 class="card-title text-white">{{ article.title }}</h3>
        <p class="text-white">{{ truncateDescription(article.description, 20) }}</p>
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

    <div v-if="newsStore.isLoading">Загрузка новостей...</div>
  </div>
</template>

<style scoped>
/* ---------------------------------- */
/* 1. Контейнер списка (Grid Layout) */
/* ---------------------------------- */
.news-list {
  /* Создаем отзывчивую сетку с автоматическим размещением */
  padding: 20px;
}

/* ---------------------------------- */
/* 2. Сама Карточка Новости (Link) */
/* ---------------------------------- */
.news-card {
  display: block; /* Ссылка должна быть блочным элементом */
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden; /* Обрезаем, чтобы углы контейнера и изображения совпадали */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.3s,
    box-shadow 0.3s;
  text-decoration: none; /* Убираем подчеркивание у ссылки */
  color: inherit; /* Наследуем цвет текста */
}

.news-card:hover {
  transform: translateY(-5px); /* Небольшой подъем при наведении */
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

/* ---------------------------------- */
/* 3. Изображение */
/* ---------------------------------- */
.card-image-container {
  /* Задаем фиксированное соотношение сторон для изображения */
  width: 100%;
  height: 200px; /* Фиксированная высота для всех изображений */
  overflow: hidden;
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Важно: заполняет контейнер без искажений */
  transition: transform 0.3s;
}

.news-card:hover .card-image {
  transform: scale(1.05); /* Небольшое увеличение при наведении */
}

/* ---------------------------------- */
/* 4. Контент (Текст) */
/* ---------------------------------- */
.card-content {
  padding: 15px;
}

.card-title {
  font-size: 1.1em;
  font-weight: bold;
  margin-top: 0;
  margin-bottom: 10px;
  /* Ограничиваем заголовок двумя строками */
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: 48px; /* Гарантируем одинаковую высоту заголовка */
}

.card-date {
  font-size: 0.85em;
  color: #666;
  margin: 0;
}
</style>
