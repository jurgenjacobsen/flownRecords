<script lang="ts">
import Button from "@/components/Button.vue";
import DropdownInput from "@/components/DropdownInput.vue";
import Splash from "@/components/Splash.vue";

import { ref } from "vue";
import { Options, Vue } from "vue-class-component";
import axios from "axios";

const selectedOrganization = ref("");
const selectedRole = ref("");

const allOrganizations = ref([
	{ id: 'nortavia', name: "Nortávia", logo: "https://i.imgur.com/Fl9IgTt.jpeg" },
	{ id: 'sevenair', name: "SevenAir" },
	{ id: 'ifa', name: "IFA" },
]);

// Example roles data - notice different property names (value/label)
const allRoles = ref([
	{ id: "GUEST", label: "Guest" },
	{ id: "STUDENT", label: "Student Pilot" },
	{ id: "PILOT", label: "Pilot" },
	{ id: "CFI", label: "Chief Flight Instructor" },
	{ id: "CTKI", label: "Chief Theoretical Knowledge Instructor" },
	{ id: "SM", label: "Safety Manager" },
	{ id: "OPS", label: "Operations" },
	{ id: "FI", label: "Flight Instructor" },
	{ id: "TKI", label: "Theoretical Knowledge Instructor" },
	{ id: "MAIN", label: "Maintenance" },
	{ id: "OFFICE", label: "Office" },
	{ id: "SUPERVISOR", label: "Supervisor" },
	{ id: "ADMIN", label: "Administrator" },
	{ id: "MANAGER", label: "Manager" },
	{ id: "OTHER", label: "Other" },
]);

const name = ref('');
const username = ref('');
const email = ref('');
const file = ref<File | null>(null);
const pw = ref('');
const pwConfirm = ref('');
const termsAccepted = ref(false);

@Options({
	components: {
		Splash,
		DropdownInput,
		Button
	},
})
export default class GetStarted extends Vue {
	selectedOrganization = selectedOrganization;
	selectedRole = selectedRole;
	allOrganizations = allOrganizations;
	allRoles = allRoles;
	random = Math.random().toString(36).substring(2, 15); // Random string for autocomplete

	name = name;
	username = username;
	email = email;
	file = file;
	pw = pw;
	pwConfirm = pwConfirm;
	termsAccepted = termsAccepted;

	signUp() {
		const form = {
			name: this.name,
			username: this.username,
			email: this.email,
			organization: this.selectedOrganization,
			role: this.selectedRole,
			proof: this.file,
			password: this.pw,
		}

		if (!this.pw || this.pw !== this.pwConfirm) {
			alert("Passwords do not match!");
			return;
		}

		if (!this.termsAccepted) {
			alert("You must accept the terms and conditions.");
			return;
		}

		try {
			axios.post("http://localhost:7700/auth/signup", form)
			.then(response => {
				if (response.status === 200) {
					alert("Registration successful! Please check your email for further instructions.");
					this.$router.push("/login");
				} else {
					alert("Registration failed. Please try again.");
				}
			}).catch(error => {
				console.error("Registration error:", error);
				alert("An error occurred during registration. Please try again later.");
			});
		} catch(e) {
			console.error("Error sending registration data:", e);
			alert("An error occurred while submitting your registration. Please try again later.");
			return;
		}
	}
}
</script>

<template>
	<Splash uppertext="Register" />

	<div class="w-full max-w-5xl mx-auto px-10 mt-14">
		<h2 class="text-3xl font-semibold text-white/75 mb-10">
			Fill out your information
		</h2>

		<form class="grid grid-cols-2 gap-6 max-w-5xl" @submit.prevent="signUp" autocomplete="off" spellcheck="false" autocorrect="off" autocapitalize="off">
			<div class="flex flex-col">
				<label class="text-sm text-white/75 mb-1" >your name</label>
				<input
					:autocomplete="random"
					type="text"
					v-model="name"
					class="bg-secondary ring-2 ring-white/25 rounded-lg px-4 py-2 focus:outline-none focus:ring-white/35"
				/>
			</div>

			<DropdownInput
				id="organization"
				label="your organization"
				:items="allOrganizations"
				v-model="selectedOrganization"
				placeholder=""
				itemKey="id"
				displayProperty="name"
				itemImageProperty="logo"
				:showItemCircle="true"
			/>

			<div class="flex flex-col">
				<label class="text-sm text-white/75 mb-1">username</label>
				<div class="relative">
					<span class="absolute left-3 top-1/2 -translate-y-1/2 text-white/50"
						>@</span
					>
					<input
						:autocomplete="random"
						type="text"
						v-model="username"
						class="bg-secondary ring-2 ring-white/25 rounded-lg px-4 py-2 pl-10 w-full focus:outline-none focus:ring-white/50"
					/>
				</div>
			</div>

			<div class="flex flex-col">
				<label class="text-sm text-white/75 mb-1">upload proof</label>
				<input
					type="file"
					@change="e => (file as any) = (e.target as HTMLInputElement).files?.[0] || null"
					class="bg-secondary ring-2 ring-white/25 rounded-lg px-4 py-2 file:text-white file:bg-primary/50 file:border-0 file:rounded-md file:px-3"
				/>
			</div>

			<div class="flex flex-col">
				<label class="text-sm text-white/75 mb-1">email</label>
				<input
					:autocomplete="random"
					type="email"
					v-model="email"
					class="bg-secondary ring-2 ring-white/25 rounded-lg px-4 py-2 focus:outline-none focus:ring-white/50"
				/>
			</div>

			<DropdownInput
				id="organization_role"
				label="role at your organization"
				icon="bag"
				:items="allRoles"
				v-model="selectedRole"
				placeholder=""
				itemKey="id"
				displayProperty="label"
				:showItemCircle="false"
			/>

			

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

			<div class="flex flex-col">
				<label class="text-sm text-white/75 mb-1">confirm your password</label>
				<input
					:autocomplete="random"
					type="password"
					v-model="pwConfirm"
					minlength="8"
  					maxlength="18"
					class="bg-secondary ring-2 ring-white/25 rounded-lg px-4 py-2 focus:outline-none focus:ring-white/50"
				/>
			</div>

			<div class="col-span-2 flex justify-between items-center">
				<div class="flex items-center gap-2">
					<span v-if="pw !== pwConfirm" class="text-second-accent text-sm">
						Passwords do not match.
					</span>
				</div>
				<div class="flex items-center gap-2">
					<!--<input
						type="checkbox"
						id="terms"
						v-model="termsAccepted"
							class="w-4 h-4 accent-secondary/75 focus:ring-0 rounded-md outline-none ring-0"
					/>-->
					<div class="flex items-center cursor-pointer relative">
						<input 
						type="checkbox" 
						id="terms"
						v-model="termsAccepted"
						class="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded border border-white/25 checked:bg-second-accent/25 checked:border-second-accent"/>
						<span class="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
							<svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" stroke-width="1">
								<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
							</svg>
						</span>
					</div>

					<label for="terms" class="text-sm text-white/75">
						I agree to the <a href="#" class="text-second-accent">terms and conditions</a>
					</label>
				</div>
			</div>

			<!-- Spacer to align the button to bottom right -->
			<div></div>

			<div class="flex justify-end items-center ">
				
				<Button txt="Sign Up" type="submit" class="px-[20%]"/>
			</div>
		</form>

		<div>
			<!-- INFORMATION ON HOW THE DATA WILL BE TREATED AND SUBMITTED, EXPLAIN THE REASON FOR CONFIRMATION ON THE ORGANIZATION -->
		</div>
	</div>
</template>
