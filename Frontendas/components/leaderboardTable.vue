<template>
  <div class="flex items-center justify-center mt-20">
    <div class="px-4 sm:px-6 lg:px-8 w-full max-w-6xl">
      <div class="sm:flex sm:items-center">
        <div class="sm:flex-auto">
          <h1 class="text-xl font-semibold text-gray-900">Leaderboard</h1>
          <p class="mt-2 text-sm text-gray-700">Most active users</p>
        </div>
      </div>
      <div class="mt-8 flex flex-col">
        <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table class="min-w-full divide-y divide-gray-300">
                <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                    Position
                  </th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Name
                  </th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Points
                  </th>
                </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 bg-white">
                <tr v-for="(person, index) in leaderboard" :key="person.email || index">
                  <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                    {{ index + 1 }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {{ person.Username }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {{ person.Points }}
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { logedInFunctions } from "~/composables/logedInFunctions.js";
import { onMounted, ref } from "vue";

const { getLeaderboard } = logedInFunctions();
const leaderboard = ref([]);

const getLeaderboardDetails = async () => {
  try {
    const responseUser = await getLeaderboard();
    leaderboard.value = responseUser;
  } catch (error) {
    console.error("Error fetching leaderboard details:", error);
  }
};

onMounted(() => {
  getLeaderboardDetails();
});
</script>
