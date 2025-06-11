<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { ref } from "vue";
import axios from "axios";

import Splash from "@/components/Splash.vue";
import Button from "@/components/Button.vue";
import DropdownInput from "@/components/DropdownInput.vue";

const user = (ref() as unknown) as any;
const displayUploadModal = (ref(false) as unknown) as boolean;

const file = ref<File | null>(null);
const selectedSource = ref<string | null>(null);
const warning = (ref('') as unknown) as string;

@Options({
    name: "OrganizationsView",
    components: {
        Splash,
        Button,
        DropdownInput
    }
})

export default class LogbookView extends Vue {
    user = user;
    displayUploadModal = displayUploadModal;
    warning = warning;

    fileSources = [
	    { 
            id: 'flightLogger', 
            name: "FlightLogger", 
            logo: "https://d308f3rtp9iyib.cloudfront.net/assets/my_flightlogger_icon-99fc56ba222dde06d0b11a88e430a81cc59dbb07027548a1f3666e398f2cfea0.png" 
        },
    ];

    selectedSource = selectedSource;
    file = file;

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
		} catch (e) {
			console.error("Error fetching user data:", e);
			this.$router.push("/login");
			return;
		}
	}

    displayModal() {
        this.displayUploadModal = !this.displayUploadModal;
    }

    async submitLogbookEntry() {
        if (!this.file || !this.selectedSource) {
            this.warning = "Please select a file and a source.";
            return;
        }

        const file = this.file as any;

        if(!file || file.type !== 'text/csv') {
            this.warning = "Please upload a valid CSV file.";
            return;
        }

        const validSources = this.fileSources.find(source => source.name === (this.selectedSource as any));
        if(!this.selectedSource || !validSources) {
            this.warning = "The uploaded file is not a valid CSV file.";
            return;
        }

        setTimeout(() => {
            this.warning = '';
        }, 5 * 1000);

        const form = new FormData();
        form.append("file", file);
        form.append("source", this.selectedSource as any);

        const token = localStorage.getItem("accessToken");
		if (!token) {
			this.$router.push("/login");
			return;
		}
        
        try {
            axios.post("http://localhost:7700/users/logbook/update", form, {
                headers: {
					Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
				},
            })
            .then(response => {
                if (response.status === 200) {
                    this.warning = '';

                    const addedEntries = response.data;
                    if(addedEntries.length > 0) {
                        this.login(); // Refresh user data to include new logbook entries
                        this.displayModal();
                    } else {
                        this.warning = "Logbook is up to date, no new entries were added.";
                    }
                } else {
                    this.warning = "Failed to submit logbook entry. Please try again.";
                }
            })
            .catch(error => {
                console.error("Error submitting logbook entry:", error);
                this.warning = "An error occurred while submitting your logbook entry. Please try again later.";
            });
        } catch(e) {
            console.error("Error submitting logbook entry:", e);
            this.warning = "An error occurred while submitting your logbook entry. Please try again later.";
            return;
        }
    }

    created(): void {
        this.login();
    }
}
</script>

<style>

</style>

<template>
    <Splash uppertext="" title="Logbook"/>

    <div class="w-full max-w-5xl mx-auto mt-14">

        <div class="px-4 py-2 rounded-lg ring-2 ring-white/50 mb-4 flex justify-between">
            <div class="inline-flex items-center">
                <img :src="user?.profilePictureUrl ?? 'https://placehold.co/512x512'" alt="" class="h-10 w-10 rounded-full">
                <h1 class="ml-4 font-semibold text-xl capitalize">
                    {{ user?.firstName || user?.username || "Loading..." }}
                </h1>
            </div>
            <div class="inline-flex items-center space-x-4">
                <Button txt="Back to Profile" link="/me"/>
                <Button txt="Add entries" @click="displayModal"/>
            </div>
        </div>

        <div class="p-4 rounded-lg ring-2 ring-white/50">
            <div class="grid grid-cols-6 px-4 pb-2 text-sm text-white/50">
                <span>Flight</span>
                <span>Aircraft</span>
                <span>Type</span>
                <span>Date</span>
            </div>

            <div>
                <div
                    v-if="user"
                    class="grid grid-cols-6 px-4 py-4 rounded-md items-center"
                    v-for="(entry, index) in user?.logbookEntries.sort(
                        (a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime(),
                    )"
                    :class="
                        index % 2 === 0
                            ? 'bg-gradient-to-br to-neutral-900 from-neutral-800'
                            : ''
                    "
                    :key="index"
                    :href="'/logbook#' + entry.id"
                    :id="entry.id"
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

                    <a class="text-sm text-white/50 hover:underline decoration-2 hover:text-accent transition-all duration-150"
                    :href="'/logbook/' + entry.id">
                        View
                    </a>

                    <a class="text-sm text-white/50 hover:underline decoration-2 hover:text-accent transition-all duration-150"
                    :href="'/logbook/' + entry.id">
                        Share
                    </a>
                </div>
                <div
                    v-else
                    class="grid grid-cols-6 px-4 py-4 rounded-md items-center">
                    <span class="text-sm text-white/75">Loading...</span>
                </div>
            </div>  
        </div>
    </div>

    <!-- UPLOAD LOGBOOK FILE MODAL -->
    <div v-if="displayUploadModal" class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
        <div class="bg-secondary p-4 rounded-lg w-96">
            <h2 class="text-xl font-semibold mb-4">Upload Logbook Entry</h2>
            <div class="flex flex-col mb-4">
                <DropdownInput
				id="file-source"
				label="File website source"
				:items="fileSources"
				v-model="selectedSource"
				placeholder=""
				itemKey="id"
				displayProperty="name"
				itemImageProperty="logo"
				:showItemCircle="true"
			    />

                <label class="text-sm text-white/75 mt-4 mb-1">CSV file</label>
				<input
					type="file"
					@change="e => (file as any) = (e.target as HTMLInputElement).files?.[0] || null"
                    accept=".csv"
					class="bg-secondary ring-2 ring-white/25 rounded-lg px-4 py-2 file:text-white file:bg-primary/50 file:border-0 file:rounded-md file:px-3"
				/>
			</div>
            <div v-if="warning" class="text-second-accent mb-4">
                {{ warning }}
            </div>
            <div class="flex justify-end space-x-4">
                <Button txt="Close" @click="displayModal"/>
                <Button txt="Submit" @click="submitLogbookEntry"/>
            </div>
        </div>
    </div>
</template>
