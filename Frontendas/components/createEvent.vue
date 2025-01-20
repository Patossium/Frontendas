<template>
    <div class="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Create a New Threat</h2>
      </div>
  
      <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form @submit.prevent="handleCreateThreat" class="space-y-6">
            <!-- Title -->
            <div>
              <label for="title" class="block text-sm font-medium text-gray-700">Name</label>
              <div class="mt-1">
                <input id="title" v-model="Name" name="name" type="text" required class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" />
              </div>
            </div>
  
            <!-- Description -->
            <div>
              <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
              <div class="mt-1">
                <textarea id="description" v-model="Description" name="description" type="text" required class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"></textarea>
              </div>
            </div>

            <!-- Date occured-->
            <div>
              <label for="dateOccured" class="block text-sm font-medium text-gray-700">Description</label>
              <div class="mt-1">
                <textarea id="dateOccured" v-model="DateOccured" name="dateOccured" type="date" required class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"></textarea>
              </div>
            </div>
            
            
            <div>
              <label for="severity" class="block text-sm font-medium text-gray-700">Severity</label>
              <div class="mt-1">
                <input id="severity" v-model="Severity" name="severity" type="number" required class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" />
              </div>
            </div>
  
            <!-- Status -->
            <div>
              <label for="status" class="block text-sm font-medium text-gray-700">Status</label>
              <div class="mt-1">
                <select id="status" v-model="Status" name="status" required class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                  <option value="Open">Open</option>
                  <option value="Closed">Closed</option>
                  <option value="UnderInvestigation">Under Investigation</option>
                </select>
              </div>
            </div>
  
            <!-- Category -->
            <div>
              <label for="category" class="block text-sm font-medium text-gray-700">Category</label>
              <div class="mt-1">
                <select id="category" v-model="Category" name="category" required class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                  <option value="Malware">Malware</option>
                  <option value="Phishing">Phishing</option>
                  <option value="Ransomware">Ransomware</option>
                  <option value="InsiderThreat">Insider Threat</option>
                  <option value="SocialEngineering">Social Engineering</option>
                  <option value="DoS">DoS</option>
                  <option value="DDoS">DDoS</option>
                  <option value="AdvancedPersistentThreat">Advanced Persistent Threat</option>
                  <option value="SupplyChainAttack">Supply Chain Attack</option>
                  <option value="ZeroDayExploit">Zero Day Exploit</option>
                  <option value="CredentialBasedThreat">Credential Based Threat</option>
                  <option value="IoTThreat">IoT Threat</option>
                  <option value="ManInTheMiddleAttack">Man In The Middle Attack</option>
                  <option value="DataBreach">Data Breach</option>
                  <option value="CloudSecurity">Cloud Security</option>
                  <option value="Cryptojacking">Cryptojacking</option>
                  <option value="PhysicalThreat">Physical Threat</option>
                  <option value="WeakConfiguration">Weak Configuration</option>
                  <option value="EmailThreat">Email Threat</option>
                  <option value="MobileThreat">Mobile Threat</option>
                </select>
              </div>
            </div>
<!-- Visibility -->
            <div>
              <label for="visibility" class="block text-sm font-medium text-gray-700">Visibility</label>
              <div class="mt-1">
                <select id="visibility" v-model="Visibility" name="visibility" required class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                  <option value="Public">Public</option>
                  <option value="Internal">Internal</option>
                </select>
              </div>
            </div>
  
            <!-- Impact -->
            <div>
              <label for="impact" class="block text-sm font-medium text-gray-700">Impact</label>
              <div class="mt-1">
                <select id="impact" v-model="Impact" name="impact" required class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                  <option value="Financial">Financial</option>
                  <option value="Operational">Operational</option>
                  <option value="Reputational">Reputational</option>
                </select>
              </div>
            </div>

            <div>
              <label for="source" class="block text-sm font-medium text-gray-700">Source</label>
              <div class="mt-1">
                <input id="title" v-model="Source" name="title" type="text" required class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" />
              </div>
            </div>

            <div>
              <label for="response" class="block text-sm font-medium text-gray-700">Response</label>
              <div class="mt-1">
                <input id="title" v-model="Response" name="title" type="text" required class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" />
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
  const Name = ref("");
  const Description = ref("");
  const DateOccured = ref("");
  const Severity = ref("");
  const Category = ref("");
  const Source = ref("");
  const Impact = ref("");
  const Response = ref("");

  //const User = ref("");  // The selected user will be stored here
  
  const handleCreateThreat = async () => {
    
      const threatDetails = {
        Name: Name.value,
        Description: Description.value,
        DateOccured: DateOccured.value,
        Severity: Severity.value,
        Category: Category.value,
        Source: Source.value,
        Impact: Impact.value,
        Response: Response.value
      }
      try {
    const response = await logedInFunctions().postThreat(threatDetails);
    if (response.status === 201) {
      console.log("Registration successful");
      window.location.href = 'http://localhost:3000/threatList';
    }
  } catch (err) {
    console.error("API call failed:", err);
  }
      
  }
  </script>
  
  