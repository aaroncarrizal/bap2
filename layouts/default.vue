<template>
    <v-app>
        <v-app-bar :clipped-left="clipped" fixed app>
            <v-toolbar-title>Task App | Aaron Carrizal</v-toolbar-title>
        </v-app-bar>
        <v-main>
            <v-container>
                <Nuxt />
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
export default {
    name: "DefaultLayout",
    data() {
        return {
            clipped: false,
        };
    },
};
</script>
