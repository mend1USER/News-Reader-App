import instance from '@/utils/axios'
import axios from '@/utils/axios'
import { defineStore, storeToRefs } from 'pinia'
import { getDate } from 'vuetify/lib/components/VCalendar/util/timestamp'

export const useNewsData = defineStore('news', {
  state: () => ({
    articles: [],
    searchModel: null,
    category: null,
    countrySubmit: null,
    countryLanguage: null,
    currentCategory: null
  }),
  persist: true,

  getters: {
    getArticleById: (state) => {
     return (articleId) => state.articles.find(article => article.article_id === articleId)
    },
    uniqueArticles: (state) => {
        if (!state.articles || state.articles.length === 0) {
            return []
        }

        const seenKey = new Set();
        const uniqueList = []

        for (const article of state.articles) {
            if (!article.title) {
                continue
            }

            const normalizedTitle = article.title.trim().toLowerCase()

            const contentSnippet = article.content ? article.content.substring(0, 100).trim().toLowerCase() : article.description ? article.description.substring(0, 100).trim().toLowerCase() : ''


            const uniqueKey = normalizedTitle + ' | ' + contentSnippet

            if(uniqueKey < 5) {
              continue
            }

            if (!seenKey.has(uniqueKey)) {
                seenKey.add(uniqueKey)
                uniqueList.push(article)
            }
            
        }
        
        return uniqueList 
    },
    articlesWithImage() {
        return this.uniqueArticles.filter((article) => article.image_url) 
    },
},


  actions: {
    async getData() { 
    try {
      const baseURL = 'https://newsdata.io/api/1/latest'
      const apiKey = import.meta.env.VITE_NEWS_API

      const defaultCountry = this.countrySubmit && this.countrySubmit !== 'null' ? this.countrySubmit : 'us'
      const defaultLanguage = this.countryLanguage && this.countryLanguage !== 'null' ? this.countryLanguage : 'en'

      let url = `${baseURL}?apikey=${apiKey}&image=1&size=10`

      url += `&country=${defaultCountry}`
      url += `&language=${defaultLanguage}`

      if(!this.searchModel) {
        if(!this.category) {
          url
        } else {
          this.currentCategory = this.category
          url += `&category=${this.category}`
        } 
      } else {
        this.articles = null 
        if(!this.category) {
          this.category = null
          url += `&q=${this.searchModel}`
        } else {
          url += `&category=${this.category}&q=${this.searchModel}`
        } 
      } if(this.selectedCountry) {
        await axios.get(`${baseURL}?apikey=${apiKey}&language=en&country=${this.countrySubmit}&image=1&size=10`)
      }
    

      console.log('FULL API URL:', url)

      const {data} = await axios.get(url)

      console.log('API STATUS:',data.status)
      console.log('API TOTAL RESULTS:', data.totalResults)
      console.log('ARTICLES COUNT:', data.results ? data.results.length : 0)
 this.articles = data.results.filter(article => {
      return article.title && article.link; 
    });
      this.articles = data.results
     

      
    } catch (error) {
      console.error('Error fetching data:', error.message)
      
    }
  },
}

})

