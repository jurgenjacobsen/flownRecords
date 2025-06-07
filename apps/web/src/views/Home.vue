<template>
	<Splash />

	<!-- CENTER -->
	<div class="flex gap-6 p-10 justify-center mt-14">
		<!-- Step 1 -->
		<div
			class="relative w-72 h-80 bg-gradient-to-br from-neutral-900 to-neutral-800 hover:from-neutral-800 hover:to-neutral-900 rounded-lg p-6 text-white overflow-hidden ring-2 ring-white/25 transition duration-500"
		>
			<div class="text-2xl font-semibold z-10 relative">Setup Your Account</div>
			<div
				class="absolute text-[18rem] h-[20rem] font-bold text-white/5 bottom-2 left-4"
			>
				1
			</div>
		</div>

		<!-- Step 2 -->
		<div
			class="relative w-72 h-80 bg-gradient-to-br from-neutral-900 to-neutral-800 hover:from-neutral-800 hover:to-neutral-900 rounded-lg p-6 text-white overflow-hidden ring-2 ring-white/25 transition duration-500"
		>
			<div class="text-2xl font-semibold z-10 relative">Import Your Data</div>
			<div
				class="absolute text-[18rem] h-[20rem] font-bold text-white/5 bottom-2 left-4"
			>
				2
			</div>
		</div>

		<!-- Step 3 -->
		<div
			class="relative w-72 h-80 bg-gradient-to-br from-neutral-900 to-neutral-800 hover:from-neutral-800 hover:to-neutral-900 rounded-lg p-6 text-white overflow-hidden ring-2 ring-white/25 transition duration-500"
		>
			<div class="text-2xl font-semibold z-10 relative">We process it</div>
			<div
				class="absolute text-[18rem] h-[20rem] font-bold text-white/5 bottom-2 left-4"
			>
				3
			</div>
		</div>
	</div>

	<div class="flex flex-col items-center mt-10 mb-8">
		<router-link to="/getstarted">
			<button
				class="cursor-pointer bg-gradient-to-t from-neutral-900 to-neutral-800 hover:opacity-75 text-white font-semibold py-2 px-4 rounded-lg ring-2 ring-white/25 transition duration-150"
			>
				Get Started
			</button>
		</router-link>
	</div>
</template>

<script lang="ts">
import Splash from "@/components/Splash.vue";
import { Options, Vue } from "vue-class-component";

@Options({
	components: {
		Splash,
	},
})
export default class HomeView extends Vue {}
</script>
