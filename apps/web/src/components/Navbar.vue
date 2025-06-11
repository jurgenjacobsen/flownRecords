<template>
  <nav class="bg-secondary text-white px-4 py-2 flex justify-between items-center rounded-lg ring-1 ring-white/25 m-4 relative">
    <!-- Left section -->
    <div class="flex items-center space-x-6">
      <a class="font-semibold hover:text-white/75 transition-all duration-150" href="/">Flown Records</a>

      <!-- Desktop menu -->
      <div class="hidden md:flex space-x-6 items-center">
        <a href="/getstarted" class="decoration-accent decoration-2 hover:underline hover:text-white/75 transition-all duration-150">Get Started</a>
        <a href="/organizations" class="decoration-accent decoration-2 hover:underline hover:text-white/75 transition-all duration-150">Organizations</a>
        <a href="/tools" class="decoration-accent decoration-2 hover:underline hover:text-white/75 transition-all duration-150">Tools</a>
        <a href="/about" class="decoration-accent decoration-2 hover:underline hover:text-white/75 transition-all duration-150">About</a>
      </div>
    </div>

    <!-- Hamburger for mobile -->
    <button @click="isMenuOpen = !isMenuOpen" class="md:hidden text-white">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
        viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>

    <!-- Desktop user/login -->
    <div class="hidden md:inline-block">
      <div v-if="user" class="flex items-center space-x-6">
        <a class="flex items-center space-x-2 decoration-accent decoration-2 hover:underline hover:text-white/75 transition-all duration-150" href="/me">
          <img :src="user?.profilePictureUrl ?? 'https://placehold.co/512x512'" alt="" class="rounded-full w-6 h-6"/>
          <span>{{ user?.firstName || `@${user?.username}`}}</span>
        </a>
        <span @click="logout" class="cursor-pointer decoration-accent decoration-2 hover:underline hover:text-white/75 transition-all duration-150">Logout</span>
      </div>

      <a v-else href="/login" class="decoration-accent decoration-2 hover:underline hover:text-white/75 transition-all duration-150">Login</a>
    </div>
  </nav>

  <!-- Mobile dropdown menu -->
  <div
    v-if="isMenuOpen"
    class="md:hidden flex flex-col space-y-4 px-4 pb-4 text-white bg-secondary rounded-lg z-10 ring-1 ring-white/25 mx-4 mt-4 pt-4"
  >
    <a href="/getstarted" class="decoration-accent decoration-2 hover:underline hover:text-white/75 transition-all duration-150">Get Started</a>
    <a href="/organizations" class="decoration-accent decoration-2 hover:underline hover:text-white/75 transition-all duration-150">Organizations</a>
    <a href="/tools" class="decoration-accent decoration-2 hover:underline hover:text-white/75 transition-all duration-150">Tools</a>
    <a href="/about" class="decoration-accent decoration-2 hover:underline hover:text-white/75 transition-all duration-150">About</a>

    <div v-if="user" class="flex items-center space-x-6">
      <a class="flex items-center space-x-2 decoration-accent decoration-2 hover:underline hover:text-white/75 transition-all duration-150" href="/me">
        <img :src="user?.profilePictureUrl ?? 'https://placehold.co/512x512'" alt="" class="rounded-full w-6 h-6"/>
        <span>{{ user?.firstName || `@${user?.username}`}}</span>
      </a>

      <span @click="logout" class="cursor-pointer decoration-accent decoration-2 hover:underline hover:text-white/75 transition-all duration-150">
        <span class="inline md:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" 
            fill="currentColor" viewBox="0 0 24 24" 
            class="inline-block align-middle md:hidden fill-second-accent h-6 w-6">
              <g transform="rotate(180 12 12)">
                <path d="M16 17l1.41-1.41L13.83 12l3.58-3.59L16 7l-5 5 5 5z"/>
                <path d="M19 3H5a2 2 0 0 0-2 2v4h2V5h14v14H5v-4H3v4a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z"/>
              </g>
          </svg>
        </span>

        <span class="hidden md:inline">
          Logout
        </span>
      </span>
    </div>

    <a v-else href="/login" class="decoration-accent decoration-2 hover:underline hover:text-white/75 transition-all duration-150">Login</a>
  </div>
</template>


<script lang="ts">
import { Vue } from 'vue-class-component';
import { ref } from 'vue';

import axios from 'axios';

const user = (ref() as any)
const isMenuOpen = (ref(false) as any);

export default class Navbar extends Vue {
  user = user;
  isMenuOpen = isMenuOpen;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  async logout() {
    localStorage.removeItem("accessToken");
    this.user = null;
    window.location.href = "/";
  }

  async login() {
		const token = localStorage.getItem("accessToken");
		if (!token) return;

		try {
			const res = await axios.get("http://localhost:7700/users/me", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}).catch((err) => {
				if (err.response?.status === 401) {
					
				} else {
					console.error("Error fetching user data:", err);
				}
			});

			if (!res) throw new Error("Failed to fetch user data");
			this.user = res.data;
      return;
		} catch (e) {
			return;
		}
	}

  created() {
    this.login();
  }
}
</script>