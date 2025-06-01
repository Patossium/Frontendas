<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { logedInFunctions } from "~/composables/logedInFunctions";
import { ArrowUpCircleIcon, ArrowDownCircleIcon } from "@heroicons/vue/16/solid/index.js";

const { getEvent, getVotesOnEvents, voteEvent, deleteEvent, getComments, getVotesOnComments, voteComment } = logedInFunctions();

const event = ref(null);
const eventVote = ref(null);
const commentVotes = ref({}); // Changed to object to store votes by comment ID
const comments = ref(null);
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

const upvoteCommentDetails = async (comment) => {
  try {
    const commentId = comment.id;
    if (!commentId) {
      console.error('Comment ID not found:', comment);
      return;
    }
    const updatedVote = await voteComment(commentId, true);
    commentVotes.value[commentId] = updatedVote;
  } catch (error) {
    console.error('Error upvoting comment:', error);
  }
};

const downvoteCommentDetails = async (comment) => {
  try {
    const commentId = comment.id;
    if (!commentId) {
      console.error('Comment ID not found:', comment);
      return;
    }
    const updatedVote = await voteComment(commentId, false);
    // Update the specific comment's vote in our votes object
    commentVotes.value[commentId] = updatedVote;
  } catch (error) {
    console.error('Error downvoting comment:', error);
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

const getCommentsVoteDetails = async (commentId) => {
  try {
    const voteData = await getVotesOnComments(commentId);
    // Store vote data for this specific comment
    commentVotes.value[commentId] = voteData;
  } catch (error) {
    console.error('Error fetching comment vote details:', error);
  }
};

// New function to fetch votes for all comments
const getAllCommentVotes = async () => {
  if (!comments.value) return;

  try {
    // Fetch votes for each comment
    for (const comment of comments.value) {
      await getCommentsVoteDetails(comment.id);
    }
  } catch (error) {
    console.error('Error fetching all comment votes:', error);
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

const getCommentsDetails = async (threatId, eventId) => {
  try {
    comments.value = await getComments(threatId, eventId);
    console.log('Comments loaded:', comments.value); // Debug log
    // After getting comments, fetch their votes
    await getAllCommentVotes();
  } catch (error) {
    console.error('Error fetching comments:', error);
  }
};

onMounted(() => {
  getEventDetails();
  getCommentsDetails(threatId, eventId);
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
    <div class="px-2 sm:px-3 lg:px-3">
      <!-- Centered header section -->
      <main class="my-8">
        <h1 class="text-base font-semibold text-gray-900">Comments</h1>
        <p class="mt-2 text-sm text-gray-700">
          A list of all the comments that have been submitted through the platform
        </p>
      </main>

      <div class="flex flex-row items-start justify-center">
        <ModalDialog/>
        <div class="w-screen">
          <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table class="min-w-full divide-y divide-gray-300">
                <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="py-3.5 pl-1 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                    Comment
                  </th>
                  <th scope="col" class="py-3.5 pl-1 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                    User who posted
                  </th>
                  <th scope="col" class="px-2 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Vote
                  </th>
                </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 bg-white">
                <tr v-for="comment in comments" :key="comment.id" class="cursor-pointer hover:bg-gray-100 active:bg-gray-200 transition-colors duration-300">
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {{ comment.text }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {{ comment.user.userName }}
                  </td>
                  <td class="flex whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <button class="focus:outline-none text-indigo-600 hover:text-indigo-800" @click="upvoteCommentDetails(comment)">
                      <ArrowUpCircleIcon class="w-6 h-6" />
                    </button>
                    <span class="px-4 text-gray-900 font-medium">{{ commentVotes[comment.id]?.score || 0 }}</span>
                    <button class="focus:outline-none text-red-600 hover:text-red-800" @click="downvoteCommentDetails(comment)">
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