<template>
    <nav class="bg-secondary m-4 py-2 px-12 rounded-lg ring-1 ring-white/25 ">
        <div class="grid grid-cols-3">
            <div>
                <router-link to="/">
                    <span class="font-semibold">
                        Flown Records
                    </span>
                </router-link>

                <div class="ml-4 lg:ml-16 space-x-6 lg:inline-block">
                    <router-link to="/getstarted" class="decoration-accent decoration-2 hover:underline">Get Started</router-link>
                    <router-link to="/organizations" class="decoration-accent decoration-2 hover:underline">Organizations</router-link>
                    <router-link to="/about" class="decoration-accent decoration-2 hover:underline">About</router-link>
                </div>
            </div>
            
            <div class="text-center space-x-4">
                
            </div>

            <div class="text-right">
                <a href="/login">Login</a>
            </div>
        </div>
    </nav>
</template>