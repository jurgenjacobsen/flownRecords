<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Splash from "@/components/Splash.vue";

@Options({
	components: {
		Splash,
	},
})
export default class Login extends Vue {}
</script>

<template>
	<Splash uppertext="" />

	<div class="w-full max-w-5xl mx-auto mt-14">
		<div class="w-full max-w-5xl mx-auto px-10 mt-14">
			<h2 class="text-3xl font-semibold text-white/75 mb-10 text-center">
				Login into your profile
			</h2>
		</div>

		<form class="max-w-xl mx-auto grid gap-6">
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
				<label class="text-sm text-white/75 mb-1">password</label>
				<input
					type="password"
					class="bg-secondary ring-2 ring-white/25 rounded-lg px-4 py-2 focus:outline-none focus:ring-white/50"
				/>
			</div>

			<div class="flex justify-end">
				<button
					type="submit"
					class="cursor-pointer bg-white/10 text-white font-semibold px-[20%] py-2 rounded-md hover:bg-white/20 transition"
				>
					Login
				</button>
			</div>
		</form>
	</div>
</template>
