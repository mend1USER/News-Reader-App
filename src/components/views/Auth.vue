<template>
    <html class="h-full bg-gray-900">
        <body class="h-full">
            
       
    <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">Sign in to your account</h2>
        </div>


        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form :validation-schema="schema" class="space-y-6" action="#" method="POST" @submit="onSubmit">
                <div>
                    <label class="block text-sm/6 font-medium text-gray-100" for="email">Email Address</label>
                    <div class="form-group mt-2">
                        <input
                        v-bind="emailAttrs"
                         v-model="email"
                         type="email"
                         name="email" 
                         id="email" 
                         autocomplete="email" 
                         required="" 
                         :class="['block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white placeholder:text-gray-500 sm:text-sm/6',
        {
          'outline-2 -outline-offset-2 outline-red-500': errors.email, 
          'focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500': !errors.email, 
        }
      ]">
                        <span class="error text-red-500" v-if="errors['email']">{{errors['email']}}</span>
                    </div>
                </div>


                <div>
                    <div class="flex items-center justify-between">
                        <label for="password" class="block text-sm/6 font-medium text-gray-100">Password</label>
                    </div>

                    <div class="form-group mt-2">
                        <input 
                        v-bind="passwordAttrs"
                        v-model="password"
                        type="password" 
                        name="password" 
                        id="password" 
                        autocomplete="current-password" 
                        required="" 
                        :class="['block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white placeholder:text-gray-500 sm:text-sm/6',
        {
          'outline-2 -outline-offset-2 outline-red-500': errors.password, 
          'focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500': !errors.password, 
        }
      ]"/>
                        <span class="error" v-if="errors['password']">{{ errors['password'] }}</span>
                    </div>
                </div>

                <div>
                    <button type="submit" :disabled="isSubmitting" class="flex  w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2  focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Sign In</button>
                    <span class="text-red-500" v-if="isTooManyAttempts">Вы Слишком Часто Пытаетесь Войти в Систему!</span>
                </div>
            </form>
        </div>
    </div>
</body>
    </html>
</template>

<script setup>
import {computed, watch} from 'vue'
import { useRouter } from 'vue-router'
import {useForm} from 'vee-validate'
import {toTypedSchema} from '@vee-validate/yup'

import { useAuthStore } from '@/stores/auth'
import * as yup from 'yup'

const router = useRouter()

const authStore = useAuthStore()


const schema = toTypedSchema(yup.object({
    email: yup.string().email('Mus Have Been a Valid Email').required('This Field is Required'),
    password: yup.string().min(6, 'Must Have Been 6 Symbols.').required('This Field is Required')
}))


const {errors, defineField, handleSubmit, isSubmitting, submitCount} = useForm({
    validationSchema: schema
})

const onSubmit = handleSubmit( async values => {
    await authStore.login(values)
    console.log(values)
    router.push('/')

})

const isTooManyAttempts = computed(() => {
    return submitCount.value >= 3
})

const [email, emailAttrs] = defineField('email')
const [password, passwordAttrs] = defineField('password')
 
</script>

<style scoped>
.form-group:has(.error) input {
    border-color: red
}
.form-group .error {
    color: red;
    font-size: .8rem;
 
}
</style>