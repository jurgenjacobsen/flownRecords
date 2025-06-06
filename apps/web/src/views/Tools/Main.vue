<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Splash from "@/components/Splash.vue";

const tools = [
    {
        name: "Flight Planner",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        link: "/tools/planner"
    },
];

@Options({
    name: "ToolsMain",
    components: {
        Splash
    }
})
export default class ToolsMain extends Vue {
    // Data properties, computed properties, methods, etc. can be defined here
    tools = tools;

}
</script>

<template>
    <Splash uppertext="Tools"/>

    <div class="w-full max-w-5xl mx-auto mt-14">
        <div class="text-center">
            <h1 class="text-4xl font-bold text-white/75 mb-2 hidden">
                Tools
            </h1>
            <p class="text-lg text-white/75 mb-10">
                Explore the tools available to enhance your experience.
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