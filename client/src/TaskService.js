import axios from 'axios';

const url = 'api/tasks/';

class TaskService {
    // Get
    static getTasks() {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(url);
                const data = res.data;
                resolve(
                    data.map(task => ({
                        ...task,
                        createdAt: new Date(task.createdAt)
                    }))
                )
            } catch (err) {
                reject(err)
            }
        })
    }

    // Create
    static insertTask(text) {
        return axios.post(url, {
            text
        });
    }

    // Delete
    static deleteTask(id) {
        return axios.delete(`${url}${id}`);
    }

}

export default TaskService;


