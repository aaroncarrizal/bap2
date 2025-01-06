import axios from "axios";
import { token } from "./constants";

const API_BASE_URL = "https://ecsdevapi.nextline.mx/vdev/tasks-challenge/tasks";

/**
 * Fetches all tasks from the API. Returns an empty array if request fails.
 * @returns {Promise<Array>}
 */
export async function fetchTasks() {
    try {
        const response = await axios.get(API_BASE_URL, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: { token },
        });
        return response.data || [];
    } catch (err) {
        console.error("Error fetching tasks:", err);
        return [];
    }
}

/**
 * Fetches a single task from the API by its id.
 * Returns null if request fails or task is not found.
 * @param {string} id - The task id
 * @returns {Promise<Object|null>}
 */
export async function fetchTask(id) {
    try {
        const response = await axios.get(`${API_BASE_URL}/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: { token },
        });
        return response.data[0] || null;
    } catch (err) {
        console.error("Error fetching task:", err);
        return null;
    }
}

/**
 * Creates a new task on the API.
 * Returns the created task if the request was successful, null otherwise.
 * @param {Object} task - The task to be created
 * @returns {Promise<Object|null>}
 */
export async function createTask(task) {
    try {
        const response = await axios.post(API_BASE_URL, {
            token,
            title: task.title,
            description: task.description,
            due_date: task.due_date,
            comments: task.comments,
            tags: task.tags,
            is_completed: task.is_completed,
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: { token },
        });
        return response.data || null;
    } catch (err) {
        console.error("Error creating task:", err);
        return null;
    }
}

/**
 * Deletes a task from the API.
 * Returns the deleted task if the request was successful, null otherwise.
 * @param {string} id - The task id
 * @returns {Promise<Object|null>}
 */
export async function deleteTask(id) {
    try {
        const response = await axios.delete(`${API_BASE_URL}/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: { token },
        });
        return response.data || null;
    } catch (err) {
        console.error("Error deleting task:", err);
        return null;
    }
}

/**
 * Updates a task on the API.
 * Returns the updated task if the request was successful, null otherwise.
 * @param {string} id - The task id
 * @param {Object} task - The updated task data
 * @returns {Promise<Object|null>}
 */
export async function updateTask(id, task) {
    try {
        const response = await axios.put(`${API_BASE_URL}/${id}`, {
            token,
            title: task.title,
            description: task.description,
            due_date: task.due_date,
            comments: task.comments,
            tags: task.tags,
            is_completed: task.is_completed,
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: { token },
        });
        return response.data || null;
    } catch (err) {
        console.error("Error updating task:", err);
        return null;
    }
}
