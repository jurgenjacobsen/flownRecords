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
	ArcElement,
} from "chart.js";

import Button from "@/components/Button.vue";
import FlownRoutesMap from "@/components/user/FlownRoutesMap.vue";

ChartJS.register(
	Title,
	Tooltip,
	Legend,
	BarElement,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	ArcElement
);

const chartsDisplayIndex = ref(0) as any;

const ChartComponents = { bar: Bar, line: Line, doughnut: Doughnut, pie: Pie };
const user = ref() as any;
const wx = ref() as any;

const TEST_FLIGHTS = [
	{
		from: { icao: "LIS", lat: 38.774, lon: -9.134 },
		to: { icao: "FNC", lat: 32.697, lon: -16.774 },
	},
	{
		from: { icao: "LIS", lat: 38.774, lon: -9.134 },
		to: { icao: "OPO", lat: 41.248, lon: -8.681 },
	},
	{
		from: { icao: "LIS", lat: 38.774, lon: -9.134 },
		to: { icao: "FAO", lat: 37.014, lon: -7.965 },
	},
	{
		from: { icao: "LIS", lat: 38.774, lon: -9.134 },
		to: { icao: "PDL", lat: 37.741, lon: -25.675 },
	},
	{
		from: { icao: "LIS", lat: 38.774, lon: -9.134 },
		to: { icao: "LPA", lat: 27.931, lon: -15.386 },
	},
	{
		from: { icao: "LIS", lat: 38.774, lon: -9.134 },
		to: { icao: "TFS", lat: 28.044, lon: -16.572 },
	},
	{
		from: { icao: "LIS", lat: 38.774, lon: -9.134 },
		to: { icao: "SVQ", lat: 37.421, lon: -5.893 },
	},
	{
		from: { icao: "LIS", lat: 38.774, lon: -9.134 },
		to: { icao: "MAD", lat: 40.493, lon: -3.566 },
	},
	{
		from: { icao: "FRA", lat: 50.033, lon: 8.570 },
		to: { icao: "AMS", lat: 52.308, lon: 4.763 },
	},
	{
		from: { icao: "FNC", lat: 32.697, lon: -16.774 },
		to: { icao: "OPO", lat: 41.248, lon: -8.681 },
	},
	// PDL TO FAR
	{
		from: { icao: "PDL", lat: 37.741, lon: -25.675 },
		to: { icao: "FAR", lat: 46.920, lon: -96.814 },
	},
	// PDL TO FAO
	{
		from: { icao: "PDL", lat: 37.741, lon: -25.675 },
		to: { icao: "FAO", lat: 37.014, lon: -7.965 },
	},
];


@Options({
	components: {
		Bar: markRaw(Bar),
		Line: markRaw(Line),
		Doughnut: markRaw(Doughnut),
		Pie: markRaw(Pie),
		Button,
		FlownRoutesMap
	},
})

export default class UserView extends Vue {

	TEST_FLIGHTS = TEST_FLIGHTS;

	user = user;
	wx = wx;

	Bar = Bar;
	chartsDisplayIndex = chartsDisplayIndex;

	ChartComponents = ChartComponents;

	ORGANIZATIONS: { [key: string]: string }  = {
		nortavia: "Nortávia",
		sevenair: "SevenAir",
	};

	ROLES: { [key: string]: string } = {
		GUEST: "Guest",
		STUDENT: "Student Pilot",
		PILOT: "Pilot",
		CFI: "Chief Flight Instructor",
		CTKI: "Chief Theoretical Knowledge Instructor",
		SM: "Safety Manager",
		OPS: "Operations",
		FI: "Flight Instructor",
		TKI: "Theoretical Knowledge Instructor",
		MAIN: "Maintenance",
		OFFICE: "Office",
		SUPERVISOR: "Supervisor",
		ADMIN: "Administrator",
		MANAGER: "Manager",
		OTHER: "Other",
	} as any

	rawCharts = [
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
						data: [],
						tension: 0.7,
						cubicInterpolationMode: "monotone",
					},
					{
						label: "Hours",
						backgroundColor: "#313ED8",
						borderColor: "#313ED8",
						data: [],
						tension: 0.7,
						cubicInterpolationMode: "monotone",
					},
				],
			},
			chartOptions: {
				maintainAspectRatio: false,
				responsive: true,
				elements: {
					pointStyle: false,
				},
				scales: {
					y: {
						display: true,
						ticks: {
							/*callback: function (value: any) {
								return value.toFixed(0) + " hrs";
							},*/
						},
					},
				},
				plugins: {
					tooltip: {
						callbacks: {
							label: function (context: any) {
								let label = context.dataset.label || "";

								if (label) {
									label += ": ";
								}

								if (context.parsed.y !== null) {
									const isHours = context.dataset.label === "Hours";
									label += isHours
										? context.parsed.y.toFixed(1) + " hrs"
										: context.parsed.y.toFixed(0);
								}

								return label;
							}
						},
					},
				},
			},
		},
		{
			id: "chart2",
			name: "Aircraft Type",
			type: "bar",
			chartData: {
				labels: [],
				datasets: [
					{
						label: "Flights",
						data: [],
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
				maintainAspectRatio: false,
			},
		},
		{
			id: "chart3",
			name: "Flight Rules",
			type: "pie",
			chartData: {
				labels: ["VFR", "IFR"],
				datasets: [
					{
						label: "Flight Rules",
						data: [],
						backgroundColor: ["#DD3434", "#313ED8"],
					},
				],
			},
			chartOptions: {
				responsive: true,
				maintainAspectRatio: false,
				plugins: {
					tooltip: {
						callbacks: {
						label: function (context: any) {
							const label = context.label || '';
							const value = context.dataset.data[context.dataIndex];
							return `${label}: ${value} hrs`;
						},
						},
					},
					legend: {
						position: 'bottom',
					}
				},
			},
		}
	];

	// Use a computed property to generate chart data reactively
    get computedCharts() {
        if (!this.user?.logbookEntries) {
            return []; // Return empty array if user data is not yet available
        }

        const logbookEntries = this.user.logbookEntries;
        const activeMonthIndices = this.getMonthsWithActivity(logbookEntries);
        const monthLabels = this.getMonthLabels(logbookEntries);

		// Filter counts and totals to only include active months
        const filteredMonthCounts = this.getMonthCounts(logbookEntries).filter((_, index) =>
            activeMonthIndices.includes(index)
        );
        const filteredMonthTotals = this.getMonthTotals(logbookEntries).filter((_, index) =>
            activeMonthIndices.includes(index)
        ); // Convert to 'HH:mm' format

        // Calculate data for Flight Hours chart
        const flightHoursChartData = {
            labels: monthLabels,
            datasets: [
                {
                    label: "Flights",
                    backgroundColor: "#DD3434",
                    borderColor: "#DD3434",
                    data: filteredMonthCounts,
                    tension: 0.7,
                    cubicInterpolationMode: "monotone",
                },
                {
                    label: "Hours",
                    backgroundColor: "#313ED8",
                    borderColor: "#313ED8",
                    data: filteredMonthTotals, // Use 'decimal' for calculations
                    tension: 0.7,
                    cubicInterpolationMode: "monotone",
                },
            ],
        };

        // Calculate data for Aircraft Type chart
        const aircraftTypeData = this.getAircraftTypeData(logbookEntries);
        const aircraftTypeChartData = {
            labels: aircraftTypeData.labels,
            datasets: [
                {
                    label: "Flights",
                    data: aircraftTypeData.data,
                    backgroundColor: "rgba(0, 255, 170, 0.75)",
                    borderColor: "rgba(0, 255, 170, 0.25)",
                    borderWidth: 1,
                    borderRadius: 5,
                    maxBarThickness: 48,
                },
            ],
        };

		const flightRuleHours = this.getFlightRuleHours(logbookEntries);
		const flightRuleHoursData = {
			labels: ["VFR", "IFR"],
			datasets: [
				{
					label: "Flight Rules",
					data: [flightRuleHours.vfr, flightRuleHours.ifr],
					backgroundColor: ["#DD3434", "#313ED8"],
					// change on hover
					hoverBackgroundColor: ["#DD3434", "#313ED8"],
					borderColor: "#09090B",
					borderWidth: 0,
				},
			],
		};


        // Combine raw chart definitions with computed data
        return this.rawCharts.map(chart => {
            if (chart.id === "chart1") {
                return { ...chart, chartData: flightHoursChartData };
            } else if (chart.id === "chart2") {
                return { ...chart, chartData: aircraftTypeChartData };
            } else if (chart.id === "chart3") {
				return { ...chart, chartData: flightRuleHoursData }
			}
            return chart;
        });
    }

    // Helper method to get monthly flight counts
    getMonthCounts(entries: any[]) {
        const counts = Array(12).fill(0);
        entries.forEach(entry => {
            const date = new Date(entry.date);
            // Ensure date is valid before getting month
            if (!isNaN(date.getTime())) {
                const month = date.getMonth(); // 0 for Jan, 1 for Feb, etc.
                counts[month]++;
            }
        });
        return counts; // Return full 12-month array
    }

    // Helper method to get monthly total hours
    getMonthTotals(entries: any[]) {
        const totals = Array(12).fill(0);
        entries.forEach(entry => {
            const date = new Date(entry.date);
            // Ensure date is valid before getting month
            if (!isNaN(date.getTime())) {
                const month = date.getMonth();
                // IMPORTANT: If 'total' is a Decimal.js object, use entry.total.toNumber()
                // Otherwise, Number() is fine for Int or converting string to number.
                // Add nullish coalescing for safety.
                totals[month] += Number(entry.total ?? 0);
            }
        });
        return totals; // Return full 12-month array
    }

	getMonthsWithActivity(entries: any[]) {
        const counts = this.getMonthCounts(entries);
        const totals = this.getMonthTotals(entries);
        const activeMonths: number[] = []; // Array of month indices (0-11) that have activity

        for (let i = 0; i < 12; i++) {
            if (counts[i] > 0 || totals[i] > 0) {
                activeMonths.push(i);
            }
        }
        return activeMonths;
    }

    // Modified getMonthLabels
    getMonthLabels(entries: any[]) {
        const activeMonthIndices = this.getMonthsWithActivity(entries);
        const allMonthNames = Array.from({ length: 12 }, (_, i) =>
            new Date(2000, i, 1).toLocaleString("default", { month: "long" }) // Use a dummy date for month names
        );

        return activeMonthIndices.map(index => allMonthNames[index]);
    }

    // Helper method to get aircraft type counts
    getAircraftTypeData(entries: any[]) {
        const aircraftCounts: { [key: string]: number } = {};
        entries.forEach(entry => {
            const aircraftReg = entry.aircraftRegistration;
            if (aircraftReg) {
                aircraftCounts[aircraftReg] = (aircraftCounts[aircraftReg] || 0) + 1;
            }
        });
        const labels = Object.keys(aircraftCounts);
        const data = Object.values(aircraftCounts);
        return { labels, data };
    }

	getFlightRuleHours(entries: any[]) {
		const hours = { vfr: 0, ifr: 0 };

		entries.forEach((entry) => {
			if (entry.sepVfr) {
				hours.vfr += Number(entry.sepVfr);
			}
			if (entry.sepIfr) {
				hours.ifr += Number(entry.sepIfr);
			}
			if (entry.meVfr) {
				hours.vfr += Number(entry.meVfr);
			}
			if (entry.meIfr) {
				hours.ifr += Number(entry.meIfr);
			}
		});

		return {
			vfr: hours.vfr.toFixed(2),
			ifr: hours.ifr.toFixed(2),
		};
	}

	fetchWeatherData() {
		if (!this.user?.homeAirport) {
			return console.warn("Home airport not set for user.");
		}

		axios.get(`http://localhost:7700/gen/wx/${this.user.homeAirport}`)
		.then((response) => {
			let { data } = response.data;
			this.wx = { metar: data.rawOb, taf: data.rawTaf }
		})
		.catch((error) => {
			console.error("Error fetching METAR data:", error);
		});
	}

	async login() {
		const token = localStorage.getItem("accessToken");
		if (!token) {
			this.$router.push("/login");
			return;
		}

		try {
			const res = await axios.get("http://localhost:7700/users/me", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}).catch((err) => {
				if (err.response?.status === 401) {
					
				} else {
					console.error("Error fetching user data:", err);
				}
			});
			
			if (!res) throw new Error("Failed to fetch user data");

			this.user = res.data;

			this.fetchWeatherData()
		} catch (e) {
			console.error("Error fetching user data:", e);
			this.$router.push("/login");
			return;
		}
	}

	async created() {
		this.login();		
	}

	async mounted() {
		
	}

	mostFlownAcft = () => {
		if (!this.user?.logbookEntries || this.user.logbookEntries.length === 0) {
			return "-";
		}
		const aircraftCount = this.user.logbookEntries.reduce((acc: any, entry: any) => {
			acc[entry.aircraftRegistration] = (acc[entry.aircraftRegistration] || 0) + 1;
			return acc;
		}, {});

		const mostFlownAcft = Object.keys(aircraftCount).reduce((a, b) =>
			aircraftCount[a] > aircraftCount[b] ? a : b,
		);

		return mostFlownAcft || "-";
	};

	mostVisitedAirport = () => {
		if(!this.user?.logbookEntries || this.user.logbookEntries.length === 0) {
			return "-";
		}

		return this?.user?.logbookEntries
		.map((entry: any) => entry.depAd)
		.reduce(
			(acc: any, icao: string) => {
				acc[icao] = (acc[icao] || 0) + 1;
				return acc;
			},
			{}
		)
		? Object.entries(
			this?.user?.logbookEntries
				.map((entry: any) => entry.arrAd)
				.reduce(
					(acc: any, icao: string) => {
						acc[icao] = (acc[icao] || 0) + 1;
						return acc;
					},
					{}
				)
		).reduce((a: any, b: any) => (a[1] > b[1] ? a : b))[0]
		: "-"
	}

	totalFlightTime = () => {
		if (!this.user?.logbookEntries || this.user.logbookEntries.length === 0) {
			return "-";
		}

		console.log(this.user.logbookEntries);
		const total =
		this.user.logbookEntries
		.map((entry: any) => entry.includeInFt ? Number(entry.total) : 0)
		.reduce((acc: number, entry: any) => acc + entry, 0);

		// Convert to HH:mm format
		const hours = total.toFixed(0);
		const minutes = Math.round((total % 1) * 60);
		return `${hours}:${minutes < 10 ? '0' + minutes : minutes}`;
	};

	numberOfFlights = () => {
		if (!this.user?.logbookEntries || this.user.logbookEntries.length === 0) {
			return "-";
		}

		//const flightCount = this.user.logbookEntries.filter((entry: any) => entry.includeInFt).length;
		return this.user.logbookEntries.length;
	};

	// Methods to navigate through charts

	nextChart = () => {
        chartsDisplayIndex.value = (chartsDisplayIndex.value + 1) % this.computedCharts.length;
    };
    previousChart = () => {
        chartsDisplayIndex.value =
            (chartsDisplayIndex.value - 1 + this.computedCharts.length) % this.computedCharts.length;
    };

	shareProfile() {
		if (navigator.share) {
				navigator.share({
				title: `Check out ${this.user?.firtName ?? this.user?.username}'s profile!`,
				url: `${window.location.origin}/user/${this.user?.username}`,
			}).catch(err => {
				console.warn('Share failed', err);
			});
		} else {
			alert('Sharing is not supported by your browser.');
		}
    }
}

</script>

<template>
	<div class="w-full max-w-5xl mx-auto mt-14">
		<div class="grid grid-cols-4 mt-10 mx-4 lg:mx-0">
			<img class="h-48 w-48 rounded-full inline-flex" :src="user?.profilePictureUrl ?? 'https://placehold.co/512x512'" alt="" />
			<div class="col-span-2">
				<h1 class="text-8xl font-bold capitalize">{{ user?.firstName }}</h1>
				<div class="grid grid-cols-2 gap-x-4 mt-4">
					<div>
						<div class="font-semibold text-lg">
							<span class="text-white/75" v-if="user?.organizationRole">
								{{ ROLES[user?.organizationRole] || user?.organizationRole }}
							</span>
							<span class="text-white/25 px-2" v-if="user?.organizationId && user?.organizationRole">
								@
							</span>
							<span
								class="text-white/75 transtion-all duration-150 hover:text-white/50"
								v-if="user?.organizationId"
							>
								<a :href="'/org/' + user?.organizationId">{{
									// @ts-ignore
									ORGANIZATIONS[user?.organizationId] || user?.organizationId
								}}</a>
							</span>
						</div>

						<div class="text-sm opacity-50 mt-2 space-x-2">
							<span
								class="ring-white/25 ring-1 rounded-md px-4 py-0.5 inline-block"
								v-if="user?.username"
							>
								@{{ user?.username }}
							</span>
							<span
								class="ring-white/25 ring-1 rounded-md px-4 py-0.5 inline-block"
							>
								{{ user?.publicProfile  ? 'Public' : 'Private' }}
							</span>
						</div>
					</div>
				</div>
			</div>
			<div class="flex flex-col justify-center space-y-3">
				<Button txt="Edit Profile" link="/me/edit"/>

				<Button txt="Logbook" link="/me/logbook"/>

				<Button txt="Share" @click="shareProfile"/>

			</div>
		</div>


		<div class="h-96 rounded-lg mt-6 ring-2 ring-white/50 flex items-center justify-center overflow-hidden">
			<FlownRoutesMap :flights="TEST_FLIGHTS"/>
		</div>

		<div class="mt-6 mx-4 lg:mx-0 grid lg:grid-cols-3 gap-6 mb-6">
			<div class="lg:col-span-2 p-4 rounded-lg ring-2 ring-white/50">
				<div class="w-full h-64 lg:h-84">
					<component
                    :is="
                        (ChartComponents as any)[
                            (computedCharts)[chartsDisplayIndex]?.type
                        ]
                    "
                    :key="(computedCharts)[chartsDisplayIndex]?.id"
                    :data="(computedCharts)[chartsDisplayIndex]?.chartData" 
                    :options="(computedCharts)[chartsDisplayIndex]?.chartOptions"
					>
					</component>
				</div>
				
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
						 {{ (computedCharts as any)[chartsDisplayIndex as any]?.name }}
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
						v-for="chart in computedCharts"
						:key="(chart as any).id"
						class="text-white/50 h-1 w-1 rounded-full bg-white"
						:class="
							chartsDisplayIndex === (computedCharts as any).indexOf(chart)
								? 'bg-white'
								: 'bg-white/25'
						"
					>
					</span>
				</div>
			</div>

			<div class="p-4 rounded-lg ring-2 ring-white/50">
				<h1
					class="text-lg font-semibold text-white/75 border-0 border-b-2 border-white/25"
				>
					Overview
				</h1>
				<div class="mt-2 space-y-1">
					<div class="flex justify-between">
						<span class="text-white/50">Flight Time</span>
						<span class="justify-end" v-if="user?.logbookEntries">{{ totalFlightTime() }}</span>
						<span class="justify-end" v-else>
							-
						</span>
					</div>

					<div class="flex justify-between">
						<span class="text-white/50">Flown</span>
						<span class="justify-end" v-if="user?.logbookEntries">{{ numberOfFlights() }}</span>
						<span class="justify-end" v-else>-</span>
					</div>

					<div class="flex justify-between">
						<span class="text-white/50">Most flown aircraft</span>
						<span class="justify-end"  v-if="user?.logbookEntries">{{ mostFlownAcft() }}</span>
						<span class="justify-end" v-else>-</span>
					</div>

					<div class="flex justify-between">
						<span class="text-white/50">Most visited airport</span>
						<span class="justify-end" v-if="user?.logbookEntries">{{ mostVisitedAirport() }}</span>
						<span class="justify-end" v-else>-</span>
					</div>
				</div>
			</div>

			<div class="lg:col-span-2 p-4 rounded-lg ring-2 ring-white/50">
				<div class="w-full border-0 border-b-2 border-white/25">
					<a href="/user/logbook" class="inline-flex hover:opacity-50 transition-all duration-150">
						<h1
						class="text-lg font-semibold text-white/75 "
						>
							Logbook
						</h1>

						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-6 w-6 text-white/50 ml-2"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M9 5l7 7-7 7m0-14l7 7-7 7"
							/>
						</svg>

					</a>
				</div>
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
							v-for="(entry, index) in user?.logbookEntries.sort(
								// convert date strings to Date objects for sorting
								(a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime(),
							)"
							:class="
								index % 2 === 0
									? 'bg-gradient-to-br to-neutral-900 from-neutral-800'
									: ''
							"
							:key="index"
							:href="'/logbook#' + entry.id"
						>
							<span class="text-sm text-white/50">{{ entry.rmks?.split('/')[1] }}</span>
							<span class="text-sm text-white/50">{{ entry.aircraftRegistration }}</span>
							<span class="text-sm text-white/50">{{ entry.aircraftType }}</span>
							<span class="text-sm text-white/50">{{
								new Date(entry.date).toLocaleDateString("en-GB", {
									month: "numeric",
									day: "numeric",
									year: "numeric",
								})
							}}</span>
						</a>
					</div>
				</div>
			</div>

			<div class="p-4 rounded-lg ring-2 ring-white/50">
				<h1
					class="text-lg font-semibold text-white/75 border-0 border-b-2 border-white/25"
				>
					Local Weather
					
					<span class="text-sm text-white/25">
					{{ user?.homeAirport }}
					</span>
				</h1>

				<div class="mt-2 space-y-1">
					<span class="text-sm ring-1 px-2 text-white/50">METAR</span>
					<code class="text-sm block mb-2">
						{{ wx?.metar?.replace(user?.homeAirport, '') || "Not found" }}
					</code>

					<span class="text-sm ring-1 px-2 text-white/50">TAF</span>
					<code class="text-sm block">
						{{ wx?.taf?.replace(/TAF/g, '').replace(user?.homeAirport, '') || "Not found" }}
					</code>

				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.main-chart-container {
    width: 100%;
    height: 22rem;
}

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
