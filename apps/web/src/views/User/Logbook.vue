<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Splash from "@/components/Splash.vue";
import Button from "@/components/Button.vue";

const Flights = [
    {
        id: "1",
        mission: "NAVI02",
        acft: "CS-DGS",
        type: "C172",
        date: new Date("2023-12-12"),
    },
    {
        id: "2",
        mission: "NAVI01",
        acft: "CS-DGS",
        type: "C172",
        date: new Date("2023-12-12"),
    },
    {
        id: "3",
        mission: "NAVI01",
        acft: "CS-EDS",
        type: "C172",
        date: new Date("2022-3-5"),
    },
    {
        id: "4",
        mission: "NAVI01",
        acft: "CS-DGS",
        type: "C172",
        date: new Date("2024-12-12"),
    },
    {
        id: "5",
        mission: "NAVI01",
        acft: "CS-EDT",
        type: "C152",
        date: new Date("2025-05-12"),
    },
    {
        id: "6",
        mission: "NAVI01",
        acft: "CS-EDT",
        type: "C152",
        date: new Date("2025-02-18"),
    },
]

@Options({
    name: "OrganizationsView",
    components: {
        Splash,
        Button,
    }
})

export default class LogbookView extends Vue {
    Flights = Flights;
}
</script>

<style>

</style>

<template>
    <Splash uppertext="" title="Logbook"/>

    <div class="w-full max-w-5xl mx-auto mt-14">

        <div class="px-4 py-2 rounded-lg ring-2 ring-white/50 mb-4 flex justify-between">
            <div class="inline-flex items-center">
                <img src="https://placehold.co/512x512" alt="" class="h-10 w-10 rounded-full">
                <h1 class="ml-4 font-semibold text-xl">
                    John Doe
                </h1>
            </div>
            <div>
                <Button txt="Back to Profile" link="/me"/>
            </div>
        </div>

        <div class="p-4 rounded-lg ring-2 ring-white/50">
            <div class="grid grid-cols-6 px-4 pb-2 text-sm text-white/50">
                <span>Flight</span>
                <span>Aircraft</span>
                <span>Type</span>
                <span>Date</span>
            </div>

            <div class="custom-scrollbar">
                <div
                    class="grid grid-cols-6 px-4 py-4 rounded-md duration-150 items-center"
                    v-for="(act, index) in Flights.sort(
                        (a: any, b: any) => b.date - a.date,
                    )"
                    :class="
                        index % 2 === 0
                            ? 'bg-gradient-to-br to-neutral-900 from-neutral-800'
                            : ''
                    "
                    :key="index"
                    :href="'/logbook#' + act.id"
                    :id="act.id"
                >
                    <span class="text-sm text-white/50">{{ act.mission }}</span>
                    <span class="text-sm text-white/50">{{ act.acft }}</span>
                    <span class="text-sm text-white/50">{{ act.type }}</span>
                    <span class="text-sm text-white/50">{{
                        act.date.toLocaleDateString("en-GB", {
                            month: "numeric",
                            day: "numeric",
                            year: "numeric",
                        })
                    }}</span>

                    <a class="text-sm text-white/50 hover:underline decoration-2 hover:text-accent transition-all duration-150"
                    :href="'/logbook/' + act.id">
                        View
                    </a>

                    <a class="text-sm text-white/50 hover:underline decoration-2 hover:text-accent transition-all duration-150"
                    :href="'/logbook/' + act.id">
                        Share
                    </a>
                </div>
            </div>  
        </div>
    </div>
</template>
