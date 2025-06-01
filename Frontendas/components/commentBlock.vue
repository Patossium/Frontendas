<template>
  <div class="flex items-start space-x-4">
    <div class="min-w-0 flex-1">
      <form @submit.prevent="handlePostComment" class="relative">
        <div class="overflow-hidden rounded-lg border border-gray-300 shadow-sm">
          <label for="comment" class="sr-only">Add your comment</label>
          <textarea
              v-model="Text"
              rows="3"
              name="comment"
              id="comment"
              class="block w-full resize-none border-0 px-2 py-3 focus:ring-0 focus:border-transparent focus:outline-none sm:text-sm"
              placeholder="Add your comment..."
              required
          />

          <div class="py-2" aria-hidden="true">
            <div class="py-px">
              <div class="h-9" />
            </div>
          </div>
        </div>

        <div class="absolute inset-x-0 bottom-0 flex justify-between py-2 pl-3 pr-2">
          <div class="flex-shrink-0">
            <button
                type="submit"
                :disabled="!Text.trim()"
                class="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Post
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import {logedInFunctions} from "~/composables/logedInFunctions.js";
import {useRoute} from "#vue-router";
import {ref} from "vue";

const { postComment } = logedInFunctions();
const route = useRoute();

if (typeof window !== "undefined") {
  var threatId = localStorage.getItem("threatId");
}
const eventId = route.params.eventId;

const Text = ref("");

const handlePostComment = async () => {
  if (!Text.value.trim()) {
    return;
  }

  const commentDetails = {
    Text: Text.value.trim(),
  }

  try {
    const response = await postComment(commentDetails, threatId, eventId);
    if (response.status === 201) {
      Text.value = "";
      window.location.href = `http://localhost:3000/events/${eventId}`;
    }
  } catch (err) {
    console.error("API comment call failed:", err);
  }
}
</script>