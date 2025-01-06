<template>
    <v-row>
        <v-col cols="12">
            <EditTaskForm :task="task" />
        </v-col>
    </v-row>
</template>

<script>
import { fetchTask } from "../../utils/taskUtils";

export default {
    data() {
        return {
            task: null,
        };
    },
    async created() {
        const id = this.$route.params.id;
        try {
            const taskData = await fetchTask(id);
            this.task = taskData;
            if(!this.task){
                this.$router.push("/");
            }
        } catch (err) {
            this.$router.push("/");
        }
    },
};
</script>
