<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { ref, markRaw } from "vue";
import axios from "axios";

import { Bar, Line, Doughnut, Pie } from "vue-chartjs";
import {
	Chart as ChartJS,
	Title,
	Tooltip,
	Legend,
	BarElement,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
} from "chart.js";

ChartJS.register(
	Title,
	Tooltip,
	Legend,
	BarElement,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
);

const UserData = {
	name: "John Doe",
	role: "Flight Student",
	organization: {
		name: "Nortávia",
		id: "nortavia",
		logo: "https://placehold.co/512x512",
	},
	icon: "https://placehold.co/512x512",
	stats: {
		flights: 1,
		hours: 1,
	},
	flights: [
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
	],
};

const charts = [
	{
		id: "chart1",
		name: "Flight Hours",
		type: "line",
		chartData: {
			labels: ["January", "February", "March", "April", "May"],
			datasets: [
				{
					label: "Flights",
					backgroundColor: "#DD3434",
					borderColor: "#DD3434",
					data: [7, 5, 12, 4, 3],
					tension: 0.7,
					cubicInterpolationMode: "monotone",
				},
				{
					label: "Hours",
					backgroundColor: "#313ED8",
					borderColor: "#313ED8",
					data: [7, 5, 11.5, 7.15, 5],
					tension: 0.7,
					cubicInterpolationMode: "monotone",
				},
			],
		},
		chartOptions: {
			responsive: true,
			elements: {
				pointStyle: false,
			},
			scales: {
				y: {
					display: true,
				},
			},
		},
	},
	{
		id: "chart2",
		name: "Aircraft Type",
		type: "bar",
		chartData: {
			labels: UserData.flights
				.map((flight: any) => flight.type)
				.filter(
					(value: any, index: number, self: any) =>
						self.indexOf(value) === index,
				),
			datasets: [
				{
					label: "Flights",
					data: UserData.flights
						.map((flight: any) => flight.type)
						.filter(
							(value: any, index: number, self: any) =>
								self.indexOf(value) === index,
						)
						.map(
							(type: any) =>
								UserData.flights.filter((flight: any) => flight.type === type)
									.length,
						),
					backgroundColor: "rgba(0, 255, 170, 0.5)",
					borderColor: "rgba(0, 255, 170, 1)",
					borderWidth: 1,
					borderRadius: 5,
					maxBarThickness: 48,
				},
			],
		},
		chartOptions: {
			responsive: true,
		},
	},
];

const MainChartIndex = ref(0);
const AviWx = ref({}) as any;
const User = ref(UserData) as any;
const Charts = ref(charts) as any;
const ChartComponents = { bar: Bar, line: Line, doughnut: Doughnut, pie: Pie };

@Options({
	components: {
		Bar: markRaw(Bar),
		Line: markRaw(Line),
		Doughnut: markRaw(Doughnut),
		Pie: markRaw(Pie),
	},
})

export default class UserView extends Vue {
	User = User as any;
	Bar = Bar;
	MainChartIndex = MainChartIndex;
	Charts = Charts;
	ChartComponents = ChartComponents;
	AviWx = AviWx;

	async mounted() {
		try {
			const res = await axios.get("http://localhost:3000/aviwx/lppr");
			if (!res) throw new Error("Failed to fetch flights");
			const data = {
				rawMetar: res.data?.[0]?.rawOb,
				rawTaf: res.data?.[0]?.rawTaf,
				brokenTaf: [] as string[],
				brokenDown: res.data?.[0],
			};

			let keywords = ["BECMG", "TEMPO", "FM", "PROB"];
			let tokens = data.rawTaf.split(" ").slice(4);

			let blocks = [];
			let currentBlock: string[] = [];

			tokens.forEach((token: string) => {
				if (keywords.includes(token) && currentBlock.length) {
					blocks.push(currentBlock.join(" "));
					currentBlock = [token];
				} else {
					currentBlock.push(token);
				}
			});

			if (currentBlock.length) blocks.push(currentBlock.join(" "));

			data.brokenTaf = blocks;

			this.AviWx = data;
		} catch (err) {
			console.error("Error fetching flights:", err);

			this.AviWx = {
				rawMetar: "Not found",
				rawTaf: "Not found",
				brokenTaf: ["Not found"],
				brokenDown: {},
			};
		}
	}

	mostFlownAcft = () => {
		let mostFlown = User.value.flights.reduce((acc: any, flight: any) => {
			acc[flight.acft] = (acc[flight.acft] || 0) + 1;
			return acc;
		}, {});
		let mostFlownAcft = Object.keys(mostFlown).reduce((a, b) =>
			mostFlown[a] > mostFlown[b] ? a : b,
		);
		return mostFlownAcft;
	};

	nextChart = () => {
		MainChartIndex.value = (MainChartIndex.value + 1) % charts.length;
	};
	previousChart = () => {
		MainChartIndex.value =
			(MainChartIndex.value - 1 + charts.length) % charts.length;
	};
}

</script>

<style scoped>
/* {
	outline: 1px solid red; 
}*/
</style>

<template>
	<div class="w-full max-w-5xl mx-auto mt-14">
		<div class="grid grid-cols-4 mt-10 mx-4 lg:mx-0">
			<img class="h-48 w-48 rounded-full inline-flex" :src="User.icon" alt="" />
			<div class="col-span-3">
				<h1 class="text-8xl font-bold">John Doe</h1>
				<div class="grid grid-cols-2 gap-x-4">
					<div>
						<div class="font-semibold text-lg">
							<span class="text-white/75">
								{{ User.role }}
							</span>
							<span class="text-white/25 px-2" v-if="User.organization">
								@
							</span>
							<span
								class="text-white/75 transtion-all duration-150 hover:text-white/50"
								v-if="User.organization"
							>
								<a :href="'/org/' + User.organization.id">{{
									User.organization.name
								}}</a>
							</span>
						</div>

						<div class="text-sm opacity-50 mt-2">
							<span
								class="ring-white/25 ring-1 rounded-md px-4 py-0.5 inline-block"
							>
								Public
							</span>
							<span class="ml-4">
								Last flight
								<span class="font-semibold">
									{{
										User.flights
											.sort((a: any, b: any) => b.date - a.date)[0]
											.date.toLocaleDateString("en-GB", {
												month: "numeric",
												day: "numeric",
												year: "numeric",
											})
									}}
								</span>
							</span>
						</div>
					</div>

					<div class="flex justify-end">
						<div class="bg-secondary rounded-lg px-4 py-2 w-3/5">
							<div class="w-full text-sm flex justify-between">
								<span class="text-white/50"> Current flying </span>
								<span class="ml-2 font-semibold text-white"> RTV1D </span>
							</div>
							<div class="w-full flex justify-between">
								<span class="text-white font-semibold"> LPVL </span>
								<span>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="currentColor"
										class="w-4 h-6 opacity-25"
										viewBox="0 0 24 24"
									>
										<path d="M2.5 19.5l19-7.5v-2l-19-7.5v4.5l12 3-12 3v4.5z" />
									</svg>
								</span>
								<span class="text-white font-semibold"> LPPR </span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="mt-6 mx-4 lg:mx-0 grid lg:grid-cols-3 gap-6 mb-6">
			<div class="lg:col-span-2 p-4 rounded-lg ring-2 ring-white/50">
				<component
					:is="
						(ChartComponents as any)[
							(Charts as any)[MainChartIndex as any].type
						]
					"
					:key="(Charts as any)[MainChartIndex as any].id"
					:data="(Charts as any)[MainChartIndex as any].chartData"
					:options="(Charts as any)[MainChartIndex as any].chartOptions"
				>
				</component>
				<div class="w-1/3 mx-auto flex justify-between mt-2 relative">
					<svg
						@click="previousChart"
						xmlns="http://www.w3.org/2000/svg"
						class="cursor-pointer h-6 w-6 text-white/50 hover:text-white/75"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M15 19l-7-7 7-7"
						/>
					</svg>
					<span class="text-white/75">
						{{ (Charts as any)[MainChartIndex as any].name }}
					</span>
					<svg
						@click="nextChart"
						xmlns="http://www.w3.org/2000/svg"
						class="cursor-pointer h-6 w-6 text-white/50 hover:text-white/75"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M9 5l7 7-7 7"
						/>
					</svg>
					<svg
						@click=""
						xmlns="http://www.w3.org/2000/svg"
						class="cursor-pointer h-6 w-6 text-white/50 hover:text-white/75 absolute -right-8"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4"
						/>
					</svg>
				</div>
				<div class="w-1/4 mx-auto flex justify-center space-x-2 mt-2">
					<span
						ref="ChartRef"
						v-for="chart in Charts"
						:key="(chart as any).id"
						class="text-white/50 h-1 w-1 rounded-full bg-white"
						:class="
							MainChartIndex === (Charts as any).indexOf(chart)
								? 'bg-white'
								: 'bg-white/25'
						"
					>
					</span>
				</div>
			</div>

			<div class="lg:row-span-2 p-4 rounded-lg ring-2 ring-white/50">
				<h1
					class="text-lg font-semibold text-white/75 border-0 border-b-2 border-white/25"
				>
					Overview
				</h1>
				<div class="mt-2 space-y-1">
					<div class="flex justify-between">
						<span class="text-white/50">Flight Time</span>
						<span class="justify-end">{{ User.stats.hours }}hrs</span>
					</div>

					<div class="flex justify-between">
						<span class="text-white/50">Flown</span>
						<span class="justify-end">{{ User.stats.flights }} flights</span>
					</div>

					<div class="flex justify-between">
						<span class="text-white/50">Most flown aircraft</span>
						<span class="justify-end">{{ mostFlownAcft() }}</span>
					</div>
				</div>

				<h1
					class="text-lg font-semibold text-white/75 border-0 border-b-2 border-white/25 mt-4"
				>
					Local Weather
				</h1>
				<div class="mt-2 space-y-1">
					<code class="text-sm block">
						<span class="ring-1 px-2">METAR</span> {{ AviWx.rawMetar }}
					</code>
					<code class="text-sm block">
						<span class="ring-1 px-2">TAF</span> {{ AviWx.rawTaf?.replace(/TAF/g, '') }}
					</code>
				</div>
			</div>

			<div class="lg:col-span-2 p-4 rounded-lg ring-2 ring-white/50">
				<h1
					class="text-lg font-semibold text-white/75 border-0 border-b-2 border-white/25"
				>
					Activity
				</h1>
				<div class="py-2">
					<div class="grid grid-cols-4 pl-4 pr-5 pb-2 mr-4 text-sm text-white/50">
						<span>Flight</span>
						<span>Aircraft</span>
						<span>Type</span>
						<span>Date</span>
					</div>
					<div class="overflow-y-scroll max-h-46 custom-scrollbar">
						<a
							class="grid grid-cols-4 px-4 py-2 mr-2 rounded-md hover:opacity-75 transition-all duration-150"
							v-for="(act, index) in User.flights.sort(
								(a: any, b: any) => b.date - a.date,
							)"
							:class="
								index % 2 === 0
									? 'bg-gradient-to-br to-neutral-900 from-neutral-800'
									: ''
							"
							:key="index"
							:href="'/flights/' + act.id"
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
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
	width: 10px;
}

/* Track */
.custom-scrollbar::-webkit-scrollbar-track {
	background: #111;
	border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
	background: #1e1e1e;
	border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
	background: rgba(115, 115, 115, 0.1);
}
</style>
