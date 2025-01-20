<template>
  <div>
    <div v-if="threat" class="px-4 sm:px-0">
      <h3 class="text-base font-semibold text-gray-900">Threat Information</h3>
      <p class="mt-1 max-w-2xl text-sm text-gray-500">Details of the threat model.</p>
    </div>
    <div v-if="threat" class="mt-6 border-t border-gray-100">
      <dl class="divide-y divide-gray-100">
        <!-- Title -->
        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium text-gray-900">Title</dt>
          <dd class="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">{{ threat.name }}</dd>
        </div>

        <!-- Description -->
        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium text-gray-900">Description</dt>
          <dd class="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">{{ threat.description }}</dd>
        </div>

        <!-- Date Added -->
        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium text-gray-900">Date Added</dt>
          <dd class="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">{{ new Date(threat.dateAdded).toLocaleString() }}</dd>
        </div>

        <!-- Related Event -->
        <div v-if="threat.relatedEvent" class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium text-gray-900">Related Event</dt>
          <dd class="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">{{ threat.relatedEvent }}</dd>
        </div>

        <!-- User -->
        <div v-if="threat.user" class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium text-gray-900">User</dt>
          <dd class="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">{{ threat.user.userName }}</dd>
        </div>

        <!-- Upvoted/Downvoted -->
        <div v-if="threat.upvoted || threat.downvoted" class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium text-gray-900">Votes</dt>
          <dd class="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
            Upvoted: {{ threat.upvoted }} | Downvoted: {{ threat.downvoted }}
          </dd>
        </div>
      </dl>
    </div>
    <div v-else class="px-4 sm:px-0">
      <p>Loading...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { logedInFunctions } from "~/composables/logedInFunctions";

const { getThreat } = logedInFunctions();

const threat = ref(null);

const route = useRoute();
const threatId = route.params.id;

const getThreatDetails = async () => {
  try {
    const response = await getThreat(threatId);
    threat.value = response;
  } catch (error) {
    console.error('Error fetching threat details:', error);
  }
};

onMounted(() => {
  getThreatDetails();
});
</script>
