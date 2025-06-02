<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Splash from "@/components/Splash.vue";

@Options({
    name: "OrganizationsView",
    components: {
        Splash
    }
})

export default class LogbookView extends Vue {
    // Data properties, computed properties, methods, etc. can be defined here
}
</script>

<template>
    <Splash uppertext="" title="Logbook"/>

    <div class="w-full max-w-5xl mx-auto mt-14">
        <div class="text-center">
            <p class="text-lg text-gray-400 mb-10">
                
            </p>
        </div>

        <div class="grid grid-cols-2 gap-6">
            <a v-for="tool in tools" :key="tool.name" :href="tool.link"
            class="relative bg-gradient-to-br to-neutral-900 from-neutral-800 rounded-lg p-6 text-white overflow-hidden ring-2 ring-white/50 hover:opacity-75 transition-all duration-300">
                <h2 class="text-xl font-semibold">{{ tool.name }}</h2>
                <p class="mt-2 opacity-75">{{ tool.description }}</p>
            </a>
        </div>
    </div>
</template>