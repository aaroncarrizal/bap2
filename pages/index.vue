<template>
    <div>
        <NewTaskForm @taskCreated="getTasks" />
        <h2 class="my-4">Tareas guardadas</h2>
        <v-row>
            <v-col v-for="task in tasks" :key="task.id" :cols="12" :md="6" :lg="4">
                <v-card class="border rounded-xl grey lighten-5">
                    <v-card-title>
                        {{ task.title }}
                        <v-spacer></v-spacer>
                        <v-btn icon @click="removeTask(task.id)">
                            <v-icon>mdi-delete</v-icon>
                        </v-btn>
                    </v-card-title>
                    <v-card-subtitle :style="{ color: task.is_completed ? 'green' : 'red' }" class="font-weight-bold">
                        {{ task.is_completed ? 'Completada' : 'Por completar' }}
                    </v-card-subtitle>
                    <v-card-actions>
                        <v-btn color="primary" @click="navigateTo(`/tasks/${task.id}`)" class="rounded-lg">
                            Ver detalles
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
        <v-snackbar v-model="showDeletedTaskSnackbar" multi-line>
            Tarea eliminada con éxito
            <v-btn color="red" text @click="showDeletedTaskSnackbar = false">
                Cerrar
            </v-btn>
        </v-snackbar>
    </div>
</template>

<script>
import { fetchTasks, deleteTask } from "~/utils/taskUtils";

export default {
    data() {
        return {
            tasks: [],
            showDeletedTaskSnackbar: false,
        };
    },
    methods: {
        async getTasks() {
            this.tasks = await fetchTasks();
        },
        async removeTask(id) {
            await deleteTask(id);
            this.showDeletedTaskSnackbar = true;
            await this.getTasks();
        },
        navigateTo(url) {
            this.$router.push(url);
        },
    },
    async created() {
        await this.getTasks();
    },
};
</script>
