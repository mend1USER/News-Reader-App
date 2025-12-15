import { defineStore } from "pinia";


export const useThrowMessage = defineStore("errorMessage", {
    state: () => ({
        message: null
    }),


    actions: {
        setMessage(message) {
            this.message = message

            setTimeout(() => {
                this.clearMessage()
            }, 5000)
        },

        clearMessage() {
            this.message = null
        }
    }
})