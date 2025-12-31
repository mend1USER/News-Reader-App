import instance from '@/utils/axios'
import axios from '@/utils/axios'
import { defineStore, storeToRefs } from 'pinia'
import { getDate } from 'vuetify/lib/components/VCalendar/util/timestamp'

export const useNewsData = defineStore('news', {
  state: () => ({
    articles: [],
    searchModel: null,
    category: null
  }),

  // getters: {
    
  //   uniqueArticles: (state) => {
  //     if(!state.articles || state.articles.length === 0) {
  //       return []
  //     }
      
  //     const seenKey = new Set();
  //     const uniqueList = []
      
  //     for(const article of state.articles) {
  //       if(!article.title || !article.link) {
  //         continue
  //       }

  //       const normalizedTitle = article.title.trim().toLowerCase()
  //       const uniqueKey = normalizedTitle + ' | ' + article.link
      
      
  //     if(!seenKey.has(uniqueKey)) {
  //       seenKey.add(uniqueKey)
  //       uniqueList.push(article)
  //     }
  //   }
  //   return uniqueList
  // },
  //   articlesWithImage() {
  //     const filteredArticles = this.uniqueArticles ?? []
  //     return filteredArticles.filter((articles) => articles.image_url)
  //   },
  // },

  getters: {
    // 1. uniqueArticles: исправлен цикл и логика
    uniqueArticles: (state) => {
        if (!state.articles || state.articles.length === 0) {
            return []
        }

        const seenKey = new Set();
        const uniqueList = []

        // ✅ ИСПРАВЛЕНИЕ: Перебираем state.articles
        for (const article of state.articles) {
            if (!article.title || !article.source_url) {
                continue
            }

            const normalizedTitle = article.title.trim().toLowerCase()
            const uniqueKey = normalizedTitle + ' | ' + article.source_url

            // Вся логика должна быть внутри цикла:
            if (!seenKey.has(uniqueKey)) {
                seenKey.add(uniqueKey)
                uniqueList.push(article)
            }
        }
        
        return uniqueList // <-- Геттер должен что-то возвращать
    },

    // 2. articlesWithImage: исправлен доступ к другому геттеру через this
    // ✅ ИСПРАВЛЕНИЕ: Используем синтаксис обычной функции
    articlesWithImage() {
        // Доступ к уникальным статьям через 'this'
        const filteredArticles = this.uniqueArticles ?? []
        
        // Исправлена опечатка: article, а не articles
        return filteredArticles.filter((article) => article.image_url) 
    },
},

  actions: {
    async getData() { 
    try {
      const baseURL = 'https://newsdata.io/api/1/latest'
      const apiKey = import.meta.env.VITE_NEWS_API

      let url = `${baseURL}?apikey=${apiKey}&language=en&country=gb&image=1&size=9`

      if(this.searchModel) {

      } else if(this.category) {
        url += `&category=${this.category}`
      }

      console.log('FULL API URL:', url)

      const {data} = await axios.get(url)

      console.log('API STATUS:',data.status)
      console.log('API TOTAL RESULTS:', data.totalResults)
      console.log('ARTICLES COUNT:', data.results ? data.results.length : 0)

      this.articles = data.results

      
    } catch (error) {
      console.error('Error fetching data:', error.message)
      
    }
  },
}

})

