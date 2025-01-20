<template>
  <div>
    <div class="px-4 sm:px-0">
      <h3 class="text-base font-semibold text-gray-900">Threat Information</h3>
      <p class="mt-1 max-w-2xl text-sm text-gray-500">Details of the threat model.</p>
    </div>
    <div class="mt-6 border-t border-gray-100">
      <dl class="divide-y divide-gray-100">
        <!-- Title -->
        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium text-gray-900">Title</dt>
          <dd class="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">{{ threat.Title }}</dd>
        </div>

        <!-- Description -->
        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium text-gray-900">Description</dt>
          <dd class="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">{{ threat.Description }}</dd>
        </div>

        <!-- Severity -->
        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium text-gray-900">Severity</dt>
          <dd class="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">{{ threat.Severity }}</dd>
        </div>

        <!-- Status -->
        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium text-gray-900">Status</dt>
          <dd class="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">{{ threat.Status }}</dd>
        </div>

        <!-- Category -->
        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium text-gray-900">Category</dt>
          <dd class="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">{{ threat.Category }}</dd>
        </div>

        <!-- Source -->
        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium text-gray-900">Source</dt>
          <dd class="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">{{ threat.Source }}</dd>
        </div>

        <!-- Visibility -->
        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium text-gray-900">Visibility</dt>
          <dd class="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">{{ threat.Visibility }}</dd>
        </div>

        <!-- Impact -->
        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium text-gray-900">Impact</dt>
          <dd class="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">{{ threat.Impact }}</dd>
        </div>

        <!-- Response -->
        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium text-gray-900">Response</dt>
          <dd class="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">{{ threat.Response }}</dd>
        </div>

        <!-- Attachments (optional) -->
        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0" v-if="threat.Attachments && threat.Attachments.length > 0">
          <dt class="text-sm font-medium text-gray-900">Attachments</dt>
          <dd class="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
            <ul role="list" class="divide-y divide-gray-100 rounded-md border border-gray-200">
              <li class="flex items-center justify-between py-4 pl-4 pr-5 text-sm">
                <div class="flex w-0 flex-1 items-center">
                  <PaperClipIcon class="size-5 shrink-0 text-gray-400" aria-hidden="true" />
                  <div class="ml-4 flex min-w-0 flex-1 gap-2">
                    <span class="truncate font-medium">{{ threat.Attachments[0].name }}</span>
                    <span class="shrink-0 text-gray-400">{{ threat.Attachments[0].size }}</span>
                  </div>
                </div>
                <div class="ml-4 shrink-0">
                  <a :href="threat.Attachments[0].url" class="font-medium text-indigo-600 hover:text-indigo-500">Download</a>
                </div>
              </li>
            </ul>
          </dd>
        </div>
      </dl>
    </div>
  </div>
</template>

<script setup>
import { PaperClipIcon } from '@heroicons/vue/20/solid'

// Assuming threat data is passed in as a prop or fetched from API
const threat = {
  Title: 'Malware Attack',
  Description: 'A critical malware attack was detected in the system...',
  Severity: 'High',
  Status: 'Under Investigation',
  Category: 'Malware',
  Source: 'Internal',
  Visibility: 'Public',
  Impact: 'Financial',
  Response: 'Investigating and mitigating',
  Attachments: [
    { name: 'threat_report.pdf', size: '1.5MB', url: '/files/threat_report.pdf' }
  ]
};
</script>
