<template>
  <div>
    <!-- Tab Selection -->
    <div class="flex border-b border-gray-200 mb-4">
      <button
          class="px-4 py-2 mr-2 font-medium text-sm transition-colors duration-150"
          :class="activeTab === 'threats' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'"
          @click="activeTab = 'threats'"
      >
        Threats
      </button>
      <button
          class="px-4 py-2 font-medium text-sm transition-colors duration-150"
          :class="activeTab === 'events' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'"
          @click="activeTab = 'events'"
      >
        Events
      </button>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center py-6">
      <p class="text-gray-500">Loading...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="flex justify-center py-6">
      <p class="text-red-500">{{ error }}</p>
    </div>

    <!-- Empty State -->
    <div v-else-if="activeItems.length === 0" class="flex justify-center py-6">
      <p class="text-gray-500">No {{ activeTab }} found</p>
    </div>

    <!-- List Display -->
    <ul v-else role="list" class="divide-y divide-gray-200">
      <li
          v-for="item in activeItems"
          :key="item.Id"
          class="flex py-4 px-3 items-center cursor-pointer transition-colors duration-150 hover:bg-gray-100 active:bg-gray-200 rounded-md list-item"
          @click="handleItemClick(item)"
      >
        <div class="ml-3 flex-grow">
          <p class="text-sm font-medium text-gray-900">
            {{ activeTab === 'threats' ? item.name : item.title }}
          </p>
          <p class="text-sm text-gray-500">{{ item.description }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { logedInFunctions } from "~/composables/logedInFunctions.js";

const threats = ref([]);
const events = ref([]);
const loading = ref(true);
const error = ref(null);
const activeTab = ref('threats');

const { getNegativeThreats, getNegativeEvents } = logedInFunctions();

const activeItems = computed(() => {
  return activeTab.value === 'threats' ? threats.value : events.value;
});

const fetchNegativeThreats = async () => {
  try {
    threats.value = await getNegativeThreats();
  } catch (error) {
    console.error('Error fetching negative threats:', error);
    error.value = 'Failed to load threats';
  }
};

const fetchNegativeEvents = async () => {
  try {
    events.value = await getNegativeEvents();
  } catch (error) {
    console.error('Error fetching negative events:', error);
    error.value = 'Failed to load events';
  }
};

const fetchData = async () => {
  loading.value = true;
  error.value = null;

  try {
    await Promise.all([fetchNegativeThreats(), fetchNegativeEvents()]);
  } catch (err) {
    error.value = 'An error occurred while fetching data';
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchData();
});

const handleItemClick = (item) => {
  window.location.href = '/threats/' + item.id;
};
</script>

<style>
.list-item:last-child {
  border-bottom: none;
}
</style>