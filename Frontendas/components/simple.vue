<template>
  <div class="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Sign in to your account</h2>
      <p class="mt-2 text-center text-sm text-gray-600">
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form class="space-y-6" @submit.prevent="handleLogin">
          <div>
            <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
            <div class="mt-1">
              <input id="username" name="username" v-model="Username" type="text" required="true" class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" />
            </div>
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
            <div class="mt-1">
              <input id="password" name="password" v-model="Password" type="password" autocomplete="current-password" required="true" class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" />
            </div>
          </div>

          <div v-if="inCorrectCredentials">
            <div class="text-red-700 text-xs">Incorrect credentials</div>
          </div>

          <div>
            <button type="submit" class="flex w-full justify-center rounded-md border border-transparent bg-innpmdigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Sign in</button>
          </div>
          <div class="text-sm">
            <a href="http://localhost:3000/register" class="font-semibold text-indigo-600 hover:text-indigo-500">or Sign-up</a>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuth } from "../composables/useAuth.js";

const Username = ref('');
const Password = ref('');
const inCorrectCredentials = ref(false);

const handleLogin = async () => {
  const payload = {
    Username: Username.value,
    Password: Password.value,
  };

  try {
    const response = await useAuth().login(payload);
    if (response.status === 200) {
      console.log("Login successful");
      window.location.href = "/main";
      inCorrectCredentials.value = false;
    }
  } catch (err) {
    console.error("Login failed:", err);
    inCorrectCredentials.value = true;
  }
};
</script>