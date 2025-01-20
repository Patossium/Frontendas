<template>
  <div>
    <div v-if="threat" class="px-4 sm:px-0">
      <h3 class="text-base font-semibold text-gray-900">Threat Information</h3>
      <p class="mt-1 max-w-2xl text-sm text-gray-500">Details of the threat model.</p>
    </div>
    <div v-if="threat" class="mt-6 border-t border-gray-100">
      <dl class="divide-y divide-gray-100">

        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium text-gray-900">Title</dt>
          <dd class="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">{{ threat.name }}</dd>
        </div>

        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium text-gray-900">Description</dt>
          <dd class="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">{{ threat.description }}</dd>
        </div>

        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium text-gray-900">Date Added</dt>
          <dd class="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">{{ new Date(threat.dateAdded).toLocaleString() }}</dd>
        </div>

        <div v-if="threat.relatedEvent" class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium text-gray-900">Related Event</dt>
          <dd class="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">{{ threat.relatedEvent }}</dd>
        </div>

        <div v-if="threat.user" class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium text-gray-900">User</dt>
          <dd class="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">{{ threat.user.userName }}</dd>
        </div>

        <div v-if="threat.upvoted || threat.downvoted" class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium text-gray-900">Votes</dt>
          <dd class="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
            Upvoted: {{ threat.upvoted }} | Downvoted: {{ threat.downvoted }}
          </dd>
        </div>
      </dl>
    </div>
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
        <div class="flex flex-row items-center justify-center">
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

<!--    <div v-else class="px-4 sm:px-0">-->
<!--      <p>Loading...</p>-->
<!--    </div>-->
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { logedInFunctions } from "~/composables/logedInFunctions";

const { getThreat, getEvents } = logedInFunctions();

const threat = ref(null);
const event = ref(null);

const route = useRoute();
const threatId = route.params.id;

const getThreatDetails = async () => {
  try {
    const responseThreat = await getThreat(threatId);
    threat.value = responseThreat;
  } catch (error) {
    console.error('Error fetching threat details:', error);
  }
};

const getEventDetails = async () => {
  try {
    const responseEvent = await getEvents(threatId);
    event.value = responseEvent;
  } catch (error) {
    console.error('Error fetching threat details:', error);
  }
};

onMounted(() => {
  getThreatDetails();
  getEventDetails();
});
</script>
