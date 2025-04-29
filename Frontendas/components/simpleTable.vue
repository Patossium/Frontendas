<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <!-- Check if user is logged in -->
    <div v-if="isLoggedIn">
      <!-- Centered header section -->
      <main class="text-center my-20">
        <h1 class="text-2xl font-semibold text-gray-900">Cybersecurity Threats</h1>
        <p class="mt-2 text-sm text-gray-700">
          A list of all the cybersecurity threats that have been recorded in the system
        </p>
      </main>

      <!-- Button and table section -->
      <div class="flex flex-row items-start justify-center">
        <button
            class="py-3 px-2 mr-5 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            @click="redirectToCreateThreat"
        >
          Create a New Threat
        </button>

        <div class="w-7/12 -my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table class="min-w-full divide-y divide-gray-300">
                <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="py-3.5 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-4">
                    Threat ID
                  </th>
                  <th scope="col" class="py-3.5 pl-1 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                    Title
                  </th>
                  <th scope="col" class="px-2 py-3.5 text-left text-sm font-semibold text-gray-900">
                    User
                  </th>
                </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 bg-white">
                <tr v-for="threat in threats" :key="threat.Id" class="cursor-pointer hover:bg-gray-100 active:bg-gray-200 transition-colors duration-300">
                  <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                    {{ threat.Id }}
                  </td>
                  <td
                      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"
                      @click="redirectToThreat(threat.Id)"
                  >
                    {{ threat.Name }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {{ threat.User.userName }}
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Login prompt if not logged in -->
    <div v-else class="text-center py-32">
      <h1 class="text-4xl font-bold text-gray-900">Please log in to view the content.</h1>
      <button class="mt-6 px-6 py-2.5 bg-indigo-600 text-white rounded-lg" @click="manualLogin">
        Log in manually
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { SecurityThreat } from "../models/SecurityThreat";

const threats = ref([]); // Holds the fetched threats
const isLoggedIn = ref(false); // Track user login state

const checkLoginStatus = () => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("AccessToken");
    isLoggedIn.value = token ? true : false;
  }
};




const getThreats = async () => {
  try {
    const response = await fetch("http://localhost:5079/api/threats/allThreats", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("AccessToken")}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    threats.value = data.map((item) => new SecurityThreat(item));
    console.log('Mapped threats:', threats.value);
  } catch (error) {
    console.error("Error fetching threats:", error);
  }
};

const redirectToLogin = () => {
  window.location.href = "/";
};

const redirectToCreateThreat = () => {
  window.location.href = "/createThreat";
};

const redirectToThreat = (threatId) => {
  window.location.href = `/threats/${threatId}`;
};

const manualLogin = () => {
  isLoggedIn.value = true;

  localStorage.setItem("AccessToken", "manual-login-token");

  getThreats();
};

onMounted(() => {
  checkLoginStatus();
  if (isLoggedIn.value) {
    getThreats();
  }
});
</script>