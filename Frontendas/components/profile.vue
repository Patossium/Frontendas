<template>
    <div>
      <div v-if="isLoggedIn" class="bg-white w-full flex flex-col items-center gap-5 px-3 md:px-16 lg:px-28 text-[#161931]">
        <main class="w-full min-h-screen py-1 flex flex-col items-center justify-center">
          <div class="p-2 md:p-4 w-full flex flex-col items-center">
            <div class="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg flex flex-col items-center">
              <h2 class="text-2xl font-bold sm:text-xl text-center">Public Profile</h2>
  
              <div class="grid max-w-2xl w-full mx-auto mt-8">
                <div class="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0 sm:justify-center">
                  <img
                    class="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-indigo-300"
                    :src="profilePicture"
                    alt="Profile Picture"
                  />
                </div>

                <div class="mt-8 text-[#202142] w-full">
                  <div class="mb-6">
                    <h3 class="text-lg font-semibold">Name:</h3>
                    <p>{{ firstUserName }} {{ firstUserSurname }}</p>
                  </div>
                  <div class="mb-6">
                    <h3 class="text-lg font-semibold">Username:</h3>
                    <p>{{ firstUserUserName }}</p>
                  </div>
  
                  <div class="mb-6">
                    <h3 class="text-lg font-semibold">Email:</h3>
                    <p>{{ firstUserEmail }}</p>
                  </div>
  
                  <div class="mb-6">
                    <h3 class="text-lg font-semibold">Points:</h3>
                    <p>{{ firstUserPoints }}</p>
                  </div>
                </div>

                <div class="mb-6">
                  <h3 class="text-lg font-semibold">Badges:</h3>
                  <div
                      class="flex flex-wrap justify-center gap-4"
                  >
                    <div
                        v-for="(badge, index) in badges"
                        :key="index"
                        class="flex flex-col items-center text-center p-4 mb-4"
                    >
                      <img
                          class="w-16 h-16"
                          :src="badge.Image"
                          :alt="badge.Title"
                      />
                      <h4 class="mt-2 font-bold text-indigo-700">{{ badge.Title }}</h4>
                      <p class="text-sm text-gray-600">{{ badge.Description }}</p>
                    </div>
                  </div>
                </div>

                <div class="flex justify-center">
                  <button
                    type="button"
                    class="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5"
                    @click="handleSubmit"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
  
      <div v-else class="text-center py-32">
        <h1 class="text-4xl font-bold text-gray-900">Please log in to view the content.</h1>
        <button class="mt-6 px-6 py-2.5 bg-indigo-600 text-white rounded-lg" @click="redirectToLogin">Log in</button>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from "vue";
  import { logedInFunctions } from "../composables/logedInFunctions";


  export default {
    data() {
      return {
        profilePicture: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGZhY2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
        isLoggedIn: false,
        firstId: "",
        firstUserName: "",
        firstUserSurname: "",
        firstUserPoints: "",
        firstUserEmail: "",
        firstUserUserName: "",
        badges: [],
      };
    },
    methods: {
      async fetchUserData() {
        const { getUser, getBadges } = logedInFunctions();
        const fetchedUser = await getUser();

        this.firstId = fetchedUser.Id;
        this.firstUserName = fetchedUser.Name;
        this.firstUserSurname = fetchedUser.Surname;
        this.firstUserEmail = fetchedUser.Email;
        this.firstUserPoints = fetchedUser.Points;
        this.firstUserUserName = fetchedUser.Username;

        const fetchedBadges = await getBadges(fetchedUser.Id);
        this.badges = fetchedBadges || [];
      },
      checkLoginStatus() {
        const token = localStorage.getItem("AccessToken");
        this.isLoggedIn = !!token;
        if (this.isLoggedIn) {
          this.fetchUserData();
        }
      },
      redirectToLogin() {
        window.location.href = "/";
      },
      handleSubmit() {
        alert("Profile saved successfully!");
      },
    },
    mounted() {
      this.checkLoginStatus();
    },

  };
  </script>

  