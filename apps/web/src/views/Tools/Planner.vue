<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Splash from "@/components/Splash.vue";

@Options({
    name: "Planner",
    components: {
        Splash
    }
})

export default class Planner extends Vue {
    windAndCrossComponent(windDir: number, windVel: number, track: number) {
        const angleDiff = ((windDir - track + 540) % 360) - 180;
        const windAngleRad = angleDiff * (Math.PI / 180);

        return {
            headwind: Math.round(windVel * Math.cos(windAngleRad) * 10) / 10,
            crosswind: Math.round(windVel * Math.sin(windAngleRad) * 10) / 10
        };
    }

    computeHeading(windDir: number, windSpeed: number, tas: number, track: number) {
        const degToRad = (deg: number) => deg * (Math.PI / 180);
        const radToDeg = (rad: number) => rad * (180 / Math.PI);

        const windAngle = degToRad(windDir - track); // relative wind angle
        const sinWCA = (windSpeed * Math.sin(windAngle)) / tas;

        // clamp sinWCA to [-1, 1] to avoid NaN due to impossible inputs
        const wcaRad = Math.asin(Math.min(1, Math.max(-1, sinWCA)));
        const wcaDeg = radToDeg(wcaRad);

        const heading = (track + wcaDeg + 360) % 360;

        // Ground speed based on law of cosines
        const groundSpeed = Math.sqrt(
            tas ** 2 +
            windSpeed ** 2 -
            2 * tas * windSpeed * Math.cos(degToRad(track - windDir))
        );

        return {
            heading: Math.round(heading * 10) / 10,
            wca: Math.round(wcaDeg * 10) / 10,
            groundSpeed: Math.round(groundSpeed * 10) / 10
        };
    }
}
</script>

<template>
    
</template>