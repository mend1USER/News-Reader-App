import { defineStore } from 'pinia';

// Функция для получения токена при старте приложения
function getInitialToken() {
    return localStorage.getItem('jwt-token');
}

export const useAuthStore = defineStore('auth', {
    /**
     * 💡 State
     */
    state: () => ({
        // ИСПРАВЛЕНО: Теперь токен инициализируется значением из localStorage
        token: getInitialToken(), 
    }),

    /**
     * 💡 Getters
     */
    getters: {
        // Геттер: используем другое имя, чтобы избежать конфликта с state.token
        tokenValue: (state) => state.token, 
        
        // Проверка авторизации
        isAuthenticated: (state) => !!state.token,
    },

    /**
     * 💡 Actions (Объединяет логику Actions и Mutations)
     */
    actions: {
        /**
         * 🔄 setToken (Аналог Vuex Mutation: setToken)
         */
        setToken(token) {
            // 1. Изменение State
            this.token = token;
            
            // 2. Сохранение в Local Storage
            localStorage.setItem(
                'jwt-token',
                token
            );
        }, 

        /**
         * 🚪 logout (Аналог Vuex Mutation: logout)
         */
        logout() {
            // 1. Изменение State
            this.token = null; 
            
            // 2. Удаление из Local Storage
            localStorage.removeItem('jwt-token');
        },

        /**
         * 🔐 login (Аналог Vuex Action: login)
         */
        async login() {
            const newToken = 'Test Token'; 
            this.setToken(newToken); 
            console.log(newToken)
        },
    },
});