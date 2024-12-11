<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <!-- Check if user is logged in -->
    <div v-if="isLoggedIn" class="sm:flex sm:items-center">
      <main>
        <div class="sm:flex-auto">
          <h1 class="text-xl font-semibold text-gray-900">Cybersecurity Threats</h1>
          <p class="mt-2 text-sm text-gray-700">
            A list of all the cybersecurity threats that have been recorded in the system
          </p>
        </div>
      </main>

      <div class="mt-4">
        <button
          class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          @click="redirectToCreateThreat"
        >
          Create a New Threat
        </button>
      </div>

      <div class="mt-8 flex flex-col">
        <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table class="min-w-full divide-y divide-gray-300">
                <thead class="bg-gray-50">
                  <tr>
                    <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      Title
                    </th>
                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      First Occurred
                    </th>
                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Last Occurred
                    </th>
                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Severity
                    </th>
                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Status
                    </th>
                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Impact
                    </th>
                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      User
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 bg-white">
                  <tr v-for="threat in threats" :key="threat.Id">
                    <td
                      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 cursor-pointer"
                      @click="redirectToThreat(threat.Id)"
                    >
                      {{ threat.Title }}
                    </td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {{ threat.FirstOccured }}
                    </td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {{ threat.LastOccured }}
                    </td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {{ threat.Severity }}
                    </td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {{ threat.Status }}
                    </td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {{ threat.Impact }}
                    </td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {{ threat.User }}
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
      <button class="mt-6 px-6 py-2.5 bg-indigo-600 text-white rounded-lg" @click="redirectToLogin">
        Log in
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
  } catch (error) {
    console.error("Error fetching threats:", error);
  }
};

const redirectToLogin = () => {
  window.location.href = "/";
};

const redirectToCreateThreat = () => {
  window.location.href = "/create-threat";
};

const redirectToThreat = (threatId) => {
  window.location.href = `/threat/${threatId}`;
};

onMounted(() => {
  checkLoginStatus();
  if (isLoggedIn.value) {
    getThreats();
  }
});
</script>

<style scoped>
body {
  font-family: "Plus Jakarta Sans", sans-serif;
}
</style>
