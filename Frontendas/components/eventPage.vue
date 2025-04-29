<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { logedInFunctions } from "~/composables/logedInFunctions";
import { ArrowUpCircleIcon, ArrowDownCircleIcon } from "@heroicons/vue/16/solid/index.js";

const { getEvent, getVotesOnEvents, voteEvent, deleteEvent } = logedInFunctions();

const event = ref(null);
const eventVote = ref(null);
const route = useRoute();
const router = useRouter();

// Get both route parameters
if (typeof window !== "undefined") {
  var threatId = localStorage.getItem("threatId");
}
const eventId = route.params.eventId;

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

const getEventDetails = async () => {
  try {
    const responseEvent = await getEvent(threatId, eventId);
    event.value = responseEvent;
    console.log('Event details:', event.value);
  } catch (error) {
    console.error('Error fetching event details:', error);
  }
};

const upvoteEventDetails = async (eventId) => {
  try {
    const updatedVote = await voteEvent(eventId, true);
    eventVote.value = updatedVote;
  } catch (error) {
    console.error('Error upvoting event:', error);
  }
};

const downvoteEventDetails = async (eventId) => {
  try {
    const updatedVote = await voteEvent(eventId, false);
    eventVote.value = updatedVote;
  } catch (error) {
    console.error('Error downvoting event:', error);
  }
};

const getEventVoteDetails = async () => {
  try {
    const voteData = await getVotesOnEvents(eventId);
    eventVote.value = voteData;
  } catch (error) {
    console.error('Error fetching event vote details:', error);
  }
};

const deleteEventDetails = async (eventId) => {
  try {
    await deleteEvent(threatId, eventId);
    router.push(`/threatList`);
  } catch (error) {
    console.error('Error deleting event:', error);
  }
};

onMounted(() => {
  getEventDetails();
  getEventVoteDetails();
});
</script>

<template>
  <div class="mt-28 ml-24">
    <div v-if="event" class="px-4 sm:px-0">
      <h3 class="text-base font-semibold text-gray-900">Event Information</h3>
      <p class="mt-1 max-w-2xl text-sm text-gray-500">Details of the event model.</p>
    </div>
    <div v-if="event" class="mt-6 border-t border-gray-100">
      <dl class="divide-y divide-gray-100">

        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium text-gray-900">Title</dt>
          <dd class="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">{{ event.title }}</dd>
        </div>

        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium text-gray-900">Description</dt>
          <dd class="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">{{ event.description }}</dd>
        </div>

        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium text-gray-900">Severity</dt>
          <dd class="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">{{ event.severity }}</dd>
        </div>

        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium text-gray-900">Category</dt>
          <dd class="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">{{ event.category }}</dd>
        </div>

        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium text-gray-900">Source</dt>
          <dd class="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">{{ event.source }}</dd>
        </div>

        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium text-gray-900">Impact</dt>
          <dd class="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">{{ event.impact }}</dd>
        </div>

        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium text-gray-900">Votes</dt>
          <dd class="flex mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
            <button
                class="focus:outline-none text-indigo-600 hover:text-indigo-800"
                @click="upvoteEventDetails(eventId)"
            >
              <ArrowUpCircleIcon class="w-6 h-6" />
            </button>
            <span class="px-4 text-gray-900 font-medium">{{ eventVote?.score }}</span>
            <button
                class="focus:outline-none text-red-600 hover:text-red-800"
                @click="downvoteEventDetails(eventId)"
            >
              <ArrowDownCircleIcon class="w-6 h-6" />
            </button>
          </dd>
        </div>

        <div v-if="isAdministrator" class="flex space-x-4 py-4">
          <button
              type="button"
              class="inline-flex justify-center rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              @click="deleteEventDetails(eventId)"
          >
            Delete event
          </button>

        </div>
      </dl>
    </div>
  </div>
</template>