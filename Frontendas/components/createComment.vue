<template>
  <div class="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Create a New Commentt</h2>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form @submit.prevent="handleCreateComment" class="space-y-6">
          <!-- Title -->
          <div>
            <label for="title" class="block text-sm font-medium text-gray-700">Text</label>
            <div class="mt-1">
              <input id="title" v-model="Text" name="text" type="text" required class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" />
            </div>
          </div>

          
          <!-- Submit Button -->
          <div>
            <button type="submit" class="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Create Threat</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { logedInFunctions } from "../composables/logedInFunctions.js";

// Define the form fields
const Text = ref("");
let commentId;

if (typeof window !== "undefined") {
  eventId = localStorage.getItem("eventId");
}
//const User = ref("");  // The selected user will be stored here

const handleCreateComment = async () => {
  
    const commentDetails = {
      Text: Text.value
    }
    try {
  const response = await logedInFunctions().postComment(commentDetails);
  if (response.status === 201) {
    window.location.href = `http://localhost:3000/threats/${threatId}/${eventId}`;
  }
} catch (err) {
  console.error("API call failed:", err);
}

}

</script>

