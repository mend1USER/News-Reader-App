import axios from '@/utils/axios'
import { defineStore } from 'pinia'

export const useNewsData = defineStore('news', {
  state: () => ({
    articles: [],
    searchModel: null,
    category: null,
    countrySubmit: null,
    countryLanguage: null,
    currentCategory: 'top',
    nextPaginationPage: null,
    loading: true
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
      this.loading = false
    try {
      const baseURL = 'https://newsdata.io/api/1/latest'
      const apiKey = import.meta.env.VITE_NEWS_API

      const defaultCountry = this.countrySubmit && this.countrySubmit !== 'null' ? this.countrySubmit : 'us'
      const defaultLanguage = this.countryLanguage && this.countryLanguage !== 'null' ? this.countryLanguage : 'en'

      let url = `${baseURL}?apikey=${apiKey}&image=1&size=6`

      url += `&country=${defaultCountry}`
      url += `&language=${defaultLanguage}`

      this.loading = true
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
      const {data} = await axios.get(url)

  
 this.articles = data.results.filter(article => {
      return article.title && article.link; 
    });
      this.articles = data.results
      this.loading = false

      
    } catch (error) {
      console.error('Error fetching data:', error.message)
      
    }
  },
   async getNewNews() {
    this.loading = false

     const baseURL = 'https://newsdata.io/api/1/latest'
      const apiKey = import.meta.env.VITE_NEWS_API
          let url = `${baseURL}?apikey=${apiKey}&image=1&size=6`

          this.loading = true
       if(this.nextPaginationPage) {
        url += `&page=${this.nextPaginationPage}`
       }

       try {
        const response = await fetch(url)
        const data = await response.json()

          if(data.results) {
            this.articles = [...this.articles, ...data.results]
            this.nextPaginationPage = data.nextPage
          }
          this.loading = false
        } catch(e) {
          console.log(e)
        }

   }
}

})

