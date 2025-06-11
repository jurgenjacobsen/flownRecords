<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { ref } from "vue";

import Splash from "@/components/Splash.vue";

const Organizations = ref([
	{
		id: 1,
		name: "IFA",
		logo: "https://ifa-training.com/wp-content/uploads/2022/05/logo-ifa-horizontal-header-260x109-1.png",
		website: "https://ifa-training.com/",
	},
	{
		id: 2,
		name: "SevenAir",
		logo: "https://flysevenair.com/wp-content/uploads/2022/12/logo-sevenair-portugal-cascais-light.png",
		website: "https://www.sevenair.com/",
	},
	{
		id: 3,
		name: "Nortávia",
		logo: "https://i0.wp.com/www.nortavia.com/wp-content/uploads/2023/01/Logo_com_assinatura_branco_300px.png",
		website: "https://www.nortavia.com/",
	},
]);

@Options({
	components: {
		Splash,
	},
})
export default class OrganizationsPage extends Vue {
	Organizations = Organizations as any;
}
</script>

<template>
	<Splash uppertext="Organizations" icon="true" />

	<div class="w-full max-w-5xl mx-auto mt-14">
		<div class="text-center">
			<p class="text-white/75 mb-10">
				We are proud to be partnered with the following organizations.
			</p>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-2 gap-6 px-4 md:px-0">
			<a
				v-for="organization in Organizations"
				:key="organization.id"
				:title="organization.name"
				:href="organization.website ?? '#'"
				target="_blank"
			>
				<div
					class="relative bg-gradient-to-br to-neutral-900 from-neutral-800 rounded-lg p-6 text-white overflow-hidden ring-2 ring-white/50"
				>
					<div class="text-center">
						<img
							class="max-h-16 inline-block"
							:src="organization.logo"
							:alt="organization.name"
						/>
					</div>
					<h1
						class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center font-bold text-white/75 z-10"
					>
						NOT OFFICIAL. FOR TEST PURPOSES ONLY.
					</h1>
				</div>
			</a>
		</div>
	</div>
</template>
