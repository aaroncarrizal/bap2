<script>
import { createTask } from "~/utils/taskUtils";
import { token } from "~/utils/constants";

export default {
    data() {
        return {
            task: {
                token: token,
                title: "",
                due_date: '',
                comments: "",
                description: "",
                tags: "",
                is_completed: false,
            },
            titleRules: [
                (value) => {
                    if (value) return true;
                    return "El titulo es requerido";
                },
            ],
            formattedYesterday: new Date(new Date().setDate(new Date().getDate() - 1))
                .toISOString()
                .slice(0, 10),
            showSnackbar: false,
        };
    },
    methods: {
        async confirmCreateTask() {
            console.log(this.task);
            if (!this.task.title) return;

            await createTask(this.task);

            this.$emit("taskCreated");

            this.task = {
                token: token,
                title: "",
                due_date: '',
                comments: "",
                description: "",
                tags: "",
                is_completed: false,
            };

            this.showSnackbar = true;
        },
    },
};
</script>

<template>
    <div>
        <v-card class="border rounded-xl my-2 p-8 bg-grey-lighten-5">
            <v-card-title> Crear tarea </v-card-title>
            <v-card-text>
                <v-form @submit.prevent="confirmCreateTask">
                    <v-row>
                        <v-col cols="12" md="6">
                            <v-text-field v-model="task.title" label="Titulo" :rules="titleRules" />
                            <v-text-field v-model="task.description" label="Descripcion" />
                            <v-text-field v-model="task.tags" label="Etiquetas" />
                            <v-textarea v-model="task.comments" label="Comentarios" />
                            <v-checkbox label="Marcar como completada" v-model="task.is_completed"></v-checkbox>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-date-picker v-model="task.due_date" :min="formattedYesterday"
                                width="100%"></v-date-picker>
                        </v-col>
                    </v-row>
                    <v-btn class="mt-8 rounded-lg" type="submit" color="primary" block>
                        Aceptar
                    </v-btn>
                </v-form>
            </v-card-text>
        </v-card>

        <v-snackbar v-model="showSnackbar" multi-line>
            Tarea creada con éxito
            <template v-slot:action>
                <v-btn color="blue" text @click="showSnackbar = false">Cerrar</v-btn>
            </template>
        </v-snackbar>
    </div>
</template>
