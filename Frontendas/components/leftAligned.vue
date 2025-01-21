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

    <div class="px-2 sm:px-3 lg:px-3">
      <!-- Centered header section -->
      <main class="my-8">
        <h1 class="text-base font-semibold text-gray-900">Cybersecurity Events</h1>
        <p class="mt-2 text-sm text-gray-700">
          A list of all the cybersecurity events that have been recorded in the system
        </p>
      </main>

      <!-- Button and table section -->
      <div class="flex flex-row items-start justify-center">
        <button
            class="py-1.5 px-4 mr-5 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            @click="redirectToCreateEvent"
        >
          Create a New Event
        </button>

        <div class="w-screen">
          <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table class="min-w-full divide-y divide-gray-300">
                <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="py-3.5 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-4">
                    Event ID
                  </th>
                  <th scope="col" class="py-3.5 pl-1 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                    Title
                  </th>
                  <th scope="col" class="py-3.5 pl-1 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                    Description
                  </th>
                  <th scope="col" class="px-2 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Severity
                  </th>
                  <th scope="col" class="px-2 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Category
                  </th>
                  <th scope="col" class="px-2 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Source
                  </th>
                  <th scope="col" class="px-2 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Impact
                  </th>
                </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 bg-white">
                <tr v-for="event in events" :key="event.Id" class="cursor-pointer hover:bg-gray-100 active:bg-gray-200 transition-colors duration-300">
                  <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                    {{ event.Id }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {{ event.Title }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {{ event.Description }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {{ event.Severity }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {{ event.Category }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {{ event.Source }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {{ event.Impact }}
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
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { logedInFunctions } from "~/composables/logedInFunctions";

const { getThreat, getEvents } = logedInFunctions();

const threat = ref(null);
const events = ref([]);

const route = useRoute();
const threatId = route.params.id;

if (typeof window !== 'undefined') {
  localStorage.setItem("threatId", threatId);
}

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
    const responseEvents = await getEvents(threatId);
    console.log('Raw response from getEvents:', responseEvents); // Debug log

    if (Array.isArray(responseEvents)) {
      events.value = responseEvents;
    } else if (responseEvents) {
      // If response is not an array but exists, wrap it in an array
      events.value = [responseEvents];
    } else {
      events.value = [];
    }

    console.log('Processed events:', events.value); // Debug log
  } catch (error) {
    console.error('Error fetching events:', error);
    events.value = [];
  }
};

const redirectToCreateEvent = () => {
  window.location.href = `http://localhost:3000/createEvent`;
}

onMounted(() => {
  getThreatDetails();
  getEventDetails();
});
</script>
