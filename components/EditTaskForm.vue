<template>
    <div v-if="task">
        <v-card class="border rounded-xl my-2 p-8 bg-grey-lighten-5">
            <template v-slot:title> Detalles de la tarea </template>

            <template v-slot:append>
                <v-btn class="text-none" color="red" icon="mdi-delete" slim @click="removeTask(task.id)" />
            </template>

            <v-card-text>
                <v-form @submit.prevent="confirmEditTask">
                    <v-row>
                        <v-col cols="12" md="6">
                            <v-text-field v-model="task.title" label="Título" :rules="titleRules" />
                            <v-text-field v-model="task.description" label="Descripción" />
                            <v-text-field v-model="task.tags" label="Etiquetas" />
                            <v-textarea v-model="task.comments" label="Comentarios" />
                            <v-checkbox label="Marcar como completada" v-model="task.is_completed"></v-checkbox>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-date-picker width="100%" v-model="task.due_date" header="Fecha de vencimiento" />
                        </v-col>
                    </v-row>

                    <v-btn class="mt-8 rounded-lg" type="submit" color="primary" block>
                        Editar
                    </v-btn>
                </v-form>
            </v-card-text>
        </v-card>

        <v-snackbar v-model="showSnackbar" multi-line>
            Tarea actualizada con éxito
            <template v-slot:actions>
                <v-btn color="blue" variant="text" @click="showSnackbar = false">
                    Cerrar
                </v-btn>
            </template>
        </v-snackbar>
    </div>
    <v-spinner v-else></v-spinner>
</template>

<script>
import { updateTask, deleteTask } from "../utils/taskUtils";
export default {
    props: {
        task: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            showSnackbar: false,
        };
    },
    computed: {
        titleRules() {
            return [
                (value) => {
                    if (value) return true;
                    return "El título es requerido";
                },
            ];
        },
    },
    methods: {
        async confirmEditTask() {
            if (!this.task.title) return;
            const updatedTask = await updateTask(this.task.id, this.task);
            if (updatedTask) {
                this.showSnackbar = true;
                this.$router.push("/");
            }
        },
        async removeTask(id) {
            await deleteTask(id);
            this.$router.push("/");
        },
    },
};
</script>
