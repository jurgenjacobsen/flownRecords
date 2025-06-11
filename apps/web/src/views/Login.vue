<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { ref } from "vue";

import Splash from "@/components/Splash.vue";
import Button from "@/components/Button.vue";
import axios from "axios";

const email = ref('');
const pw = ref('');

@Options({
	components: {
		Splash,
		Button
	},
})

export default class Login extends Vue {
	random = Math.random().toString(36).substring(2, 15);
	email = email;
	pw = pw;

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
			return window.location.href = "/me";
		} catch (e) {
			return;
		}
	}

	signIn() {
		const form = {
			email: this.email,
			password: this.pw,
		}

		try {
			axios.post("http://localhost:7700/auth/signin", form)
			.then(response => {
				if (response.status === 200) {
					const token = response.data.accessToken;
					if(!token) {
						alert("Login failed: No token received.");
						return;
					}

					localStorage.setItem('accessToken', token);

					return window.location.href = "/me";
				} else {
					alert("Login failed: " + response.data.message);
				}
			}).catch(e => {
				console.error("Login error:", e);
				if (e.response && e.response.data) {
					alert("Login failed: " + e.response.data.message);
				} else {
					alert("An error occurred during login. Please try again later.");
				}
			})
		} catch(e) {
			console.error("Error sending login data:", e);
			alert("An error occurred during login. Please try again later.");
			return;
		}
	}

	created() {
		this.login();
	}
}
</script>

<template>
	<Splash uppertext="" />

	<div class="w-full max-w-5xl mx-auto mt-14">
		<div class="w-full max-w-5xl mx-auto px-10 mt-14">
			<h2 class="text-3xl font-semibold text-white/75 mb-10 text-center">
				Login into your profile
			</h2>
		</div>

		<form 
		class="max-w-xl mx-auto grid gap-6 px-4 md:px-0" 
		@submit.prevent="signIn" autocomplete="off" spellcheck="false" autocorrect="off" autocapitalize="off">
			<div class="flex flex-col">
				<label class="text-sm text-white/75 mb-1">email</label>
				<input
					:autocomplete="random"
					type="email"
					v-model="email"
					class="bg-secondary ring-2 ring-white/25 rounded-lg px-4 py-2 focus:outline-none focus:ring-white/50"
				/>
			</div>

			<div class="flex flex-col">
				<label class="text-sm text-white/75 mb-1">password</label>
				<input
					:autocomplete="random"
					type="password"
					v-model="pw"
					minlength="8"
  					maxlength="18"
					class="bg-secondary ring-2 ring-white/25 rounded-lg px-4 py-2 focus:outline-none focus:ring-white/50"
				/>
			</div>

			<div>
				<span>
					Forgot your password?
					<a href="/resetpassword" class="text-accent font-semibold hover:underline hover:opacity-75 transition-all duration-150">Reset it</a>
				</span>
			</div>

			<div class="flex justify-between">
				<Button txt="Create new account" link="/getstarted" class="md:px-[10%]"/>
				<Button txt="Login" type="submit" @click="signIn" class="md:px-[20%]"/>
			</div>
		</form>
	</div>
</template>
