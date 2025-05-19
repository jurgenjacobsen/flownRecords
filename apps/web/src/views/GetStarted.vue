<script lang="ts">
import DropdownInput from "@/components/DropdownInput.vue";
import Splash from "@/components/Splash.vue";

import { ref, computed } from "vue";
import { Options, Vue } from "vue-class-component";

const selectedOrganization = ref("");
const selectedRole = ref("");

const allOrganizations = ref([
	{ id: 1, name: "Nortávia", logo: "https://i.imgur.com/Fl9IgTt.jpeg" },
	{ id: 2, name: "Beta Corp" },
	{ id: 3, name: "Gamma Inc." },
	{ id: 4, name: "Delta Solutions" },
	{ id: 5, name: "Epsilon Services" },
	{ id: 6, name: "Another Org Name" },
]);

// Example roles data - notice different property names (value/label)
const allRoles = ref([
	{ id: "cfi", label: "Chief Flight Instructor" },
	{ id: "ctki", label: "Chief Theoretical Knowledge Instructor" },
	{ id: "sm", label: "Safety Manager" },
	{ id: "ops", label: "Operations" },
	{ id: "fi", label: "Flight Instructor" },
	{ id: "tk", label: "Theoretical Knowledge Instructor" },
	{ id: "main", label: "Maintenance" },
	{ id: "office", label: "Office" },
]);

@Options({
	components: {
		Splash,
		DropdownInput,
	},
})
export default class GetStarted extends Vue {
	selectedOrganization = selectedOrganization;
	selectedRole = selectedRole;
	allOrganizations = allOrganizations;
	allRoles = allRoles;
}
</script>

<template>
	<Splash uppertext="Register" />

	<div class="w-full max-w-5xl mx-auto px-10 mt-14">
		<h2 class="text-3xl font-semibold text-white/75 mb-10">
			Fill out your information
		</h2>

		<form class="grid grid-cols-2 gap-6 max-w-5xl">
			<div class="flex flex-col">
				<label class="text-sm text-white/75 mb-1">your name</label>
				<input
					type="text"
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
						type="text"
						class="bg-secondary ring-2 ring-white/25 rounded-lg px-4 py-2 pl-10 w-full focus:outline-none focus:ring-white/50"
					/>
				</div>
			</div>

			<div class="flex flex-col">
				<label class="text-sm text-white/75 mb-1">upload proof</label>
				<input
					type="file"
					class="bg-secondary ring-2 ring-white/25 rounded-lg px-4 py-2 file:text-white file:bg-primary/50 file:border-0 file:rounded-md file:px-3"
				/>
			</div>

			<div class="flex flex-col">
				<label class="text-sm text-white/75 mb-1">email</label>
				<input
					type="email"
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

			<!-- Spacer to align the button to bottom right -->
			<div></div>

			<div class="flex justify-end">
				<button
					type="submit"
					class="cursor-pointer bg-white/10 text-white font-semibold px-[20%] py-2 rounded-md hover:bg-white/20 transition"
				>
					Register
				</button>
			</div>
		</form>

		<div>
			<!-- INFORMATION ON HOW THE DATA WILL BE TREATED AND SUBMITTED, EXPLAIN THE REASON FOR CONFIRMATION ON THE ORGANIZATION -->
		</div>
	</div>
</template>
