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

        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium text-gray-900">Votes</dt>
          <dd class="flex mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
            <button
                class="focus:outline-none text-indigo-600 hover:text-indigo-800"
                @click="upvoteThreatDetails(threat.id)"
            >
              <ArrowUpCircleIcon class="w-6 h-6" />
            </button>
            <span class="px-4 text-gray-900 font-medium">{{ threatVote?.score }}</span>
            <button
                class="focus:outline-none text-red-600 hover:text-red-800"
                @click="downvoteThreatdetails(threat.id)"
            >
              <ArrowDownCircleIcon class="w-6 h-6" />
            </button>
          </dd>
        </div>
        <div v-if="isAdministrator">
        <button type="button" class="inline-flex justify-center rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" @click="deleteThreatDetails(threat.id)">Delete threat</button>
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
                  <th scope="col" class="px-2 py-3.5 text-left text-sm font-semibold text-gray-900">
                    User
                  </th>
                  <th scope="col" class="px-2 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Vote
                  </th>
                </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 bg-white">
                <tr v-for="event in events" :key="event.Id" class="cursor-pointer hover:bg-gray-100 active:bg-gray-200 transition-colors duration-300" @click="navigateToEventDetail(event.Id)">
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
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {{ event.User.userName }}
                  </td>
                  <td class="flex whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <button class="focus:outline-none text-indigo-600 hover:text-indigo-800" @click="upvoteEventDetails(event.Id)">
                      <ArrowUpCircleIcon class="w-6 h-6" />
                    </button>
                    <span class="px-4 text-gray-900 font-medium">{{  eventVote[event.Id]?.score}}</span>
                    <button class="focus:outline-none text-red-600 hover:text-red-800" @click="downvoteEventDetails(event.Id)">
                      <ArrowDownCircleIcon class="w-6 h-6" />
                    </button>
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
import {onMounted, reactive, ref} from 'vue';
import {useRoute} from 'vue-router';
import {logedInFunctions} from "~/composables/logedInFunctions";
import {ArrowDownCircleIcon, ArrowUpCircleIcon} from "@heroicons/vue/16/solid/index.js";

const { getThreat, getEvents, getVotesOnThreats, getVotesOnEvents, voteThreat, voteEvent, deleteThreat } = logedInFunctions();

const threat = ref(null);
const events = ref([]);
const threatVote = ref(null);
let eventVote = reactive({});

const route = useRoute();
const router = useRouter();
const threatId = route.params.threatId;

const isAdministrator = computed(() => {
  const rolesString = localStorage.getItem('Roles');
  if (!rolesString) return false;

  try {
    const roles = JSON.parse(rolesString);

    // Handle both cases: when roles is an array or a single string
    if (Array.isArray(roles)) {
      return roles.includes('Administrator');
    } else {
      return roles === 'Administrator';
    }
  } catch (error) {
    console.error('Error parsing roles:', error);
    return false;
  }
});

if (typeof window !== 'undefined') {
  localStorage.setItem("threatId", threatId);
}

const upvoteThreatDetails = async (threatId) => {
  try {
    const updatedVote = await voteThreat(threatId, true);
    threatVote.value.score = updatedVote.score;
  } catch (error) {
    console.error('Error upvoting threat:', error);
  }
};

const navigateToEventDetail = (eventId) => {
  router.push(`/events/${eventId}`);
};

const deleteThreatDetails = async (threatId) => {
  try {
    await deleteThreat(threatId);
    window.location.href = `http://localhost:3000/threatList`;
  } catch (error) {
    console.error('Error upvoting threat:', error);
  }
};

const downvoteThreatdetails = async (threatId) => {
  try {
    const updatedVote = await voteThreat(threatId, false);
    threatVote.value.score = updatedVote.score;
  } catch (error) {
    console.error('Error downvoting threat:', error);
  }
};

const upvoteEventDetails = async (eventId) => {
  try {
    const updatedVote = await voteEvent(eventId, true);
    eventVote[eventId] = updatedVote;

    await getEventVoteDetails(eventId);
  } catch (error) {
    console.error('Error upvoting event:', error);
  }
};

const downvoteEventDetails = async (eventId) => {
  try {
    const updatedVote = await voteEvent(eventId, false);
    eventVote[eventId] = updatedVote;

    await getEventVoteDetails(eventId);
  } catch (error) {
    console.error('Error downvoting event:', error);
  }
};


const getThreatDetails = async () => {
  try {
    const responseThreat = await getThreat(threatId);
    threat.value = responseThreat;
  } catch (error) {
    console.error('Error fetching threat details:', error);
  }
};

const getThreatVoteDetails = async () => {
  try {
    const voteThreat = await getVotesOnThreats(threatId);
    threatVote.value = voteThreat;
  } catch (error) {
    console.error('Error fetching threat details:', error);
  }
};

const getEventVoteDetails = async (eventId) => {
  try {
    const voteEvent = await getVotesOnEvents(eventId);
    eventVote[eventId] = voteEvent;
  } catch (error) {
    console.error('Error fetching threat details:', error);
  }
};

const getEventDetails = async () => {
  try {
    const responseEvents = await getEvents(threatId);
    console.log('API Response:', responseEvents);
    if (Array.isArray(responseEvents)) {
      events.value = responseEvents;
      // Fetch votes for each event
      for (const event of responseEvents) {
        await getEventVoteDetails(event.Id);
      }
    } else if (responseEvents) {
      events.value = [responseEvents];
      // If single event, fetch its votes
      await getEventVoteDetails(responseEvents.Id);
    } else {
      events.value = [];
    }

    console.log('Processed events:', events.value);
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
  getThreatVoteDetails();
});
</script>