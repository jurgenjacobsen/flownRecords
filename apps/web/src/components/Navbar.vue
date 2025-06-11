<template>
  <nav class="bg-secondary text-white px-4 py-2 flex justify-between items-center rounded-lg ring-1 ring-white/25 m-4">
    <div class="flex items-center space-x-6">
      <a class="font-semibold hover:text-white/75 transition-all duration-150" href="/">Flown Records</a>

      <a href="/getstarted" class="decoration-accent decoration-2 hover:underline hover:text-white/75 transition-all duration-150">Get Started</a>
      <a href="/organizations" class="decoration-accent decoration-2 hover:underline hover:text-white/75 transition-all duration-150">Organizations</a>
      <a href="/tools" class="decoration-accent decoration-2 hover:underline hover:text-white/75 transition-all duration-150">Tools</a>
      <a href="/about" class="decoration-accent decoration-2 hover:underline hover:text-white/75 transition-all duration-150">About</a>
    </div>

    <div>
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
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';
import { ref } from 'vue';

import axios from 'axios';

const user = (ref() as any)

export default class Navbar extends Vue {
  user = user;

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