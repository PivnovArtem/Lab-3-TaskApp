<template>
    <div>
        <h1>Список задач</h1>
        <hr>
        <div class="app">
            <div class="createTask">
                <label for="create-task"></label>
                <textarea id="create-task" v-model="text" placeholder="New task"></textarea>
                <button class="btn-Create" v-on:click="createTask">Создать задачу</button>
            </div>
            <div class="tasks">
                <div class="task" v-for="(task, index) in tasks"
                     v-bind:item="task"
                     v-bind:index="index"
                     v-bind:key="task._id">
                    <div class="date">
                        <div class="date-content">
                            <h3>Создано</h3>
                            <span>{{`${task.createdAt.getDate()}.${"0" + (task.createdAt.getMonth()+1)}.${task.createdAt.getFullYear()}`}}</span>
                        </div>
                    </div>
                    <div class="description">
                        <h3>Описание задачи</h3>
                        <span>{{task.text}}</span>
                    </div>
                    <button class="btn-Delete" v-on:click="deleteTask(task._id)">Удалить</button>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import TaskService from '../TaskService';

    export default {

        name: 'Task',
        data() {
            return {
                tasks: [],
                text: ''
            }
        },
        async created() {
            try {
                this.tasks = await TaskService.getTasks();
            } catch (err) {
                this.error = err.message;
            }
        },
        methods: {
            async createTask() {
                await TaskService.insertTask(this.text);
                this.tasks = await TaskService.getTasks();
                this.text = '';
            },
            async deleteTask(id) {
                await TaskService.deleteTask(id);
                this.tasks = await TaskService.getTasks();
                this.text = '';
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

    .app {
        display: flex;
        flex-direction: column;
        width: 50%;
        margin: auto
    }

    textarea {
        resize: none;
        height: 5em;
        padding-left: 10px;
        padding-top: 10px;
        width: 60%;
        font-size: 1.5em;
    }
    
    .tasks {
        background-color: #c4ffbc;
        align-self: center;
        width: 100%;

    }

    .createTask {
        display: flex;
        justify-content: center;
        margin: 1em 0;
        width: 100%;
    }
    
    .btn-Create {
        background-color: #4CAF50;
        border: none;
        color: white;
        padding: 15px 32px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        width: 40%;
    }
    .btn-Create:hover {
        background-color: #63c15e;
    }
    .btn-Delete {
        background-color: #af635a;
        border: none;
        color: white;
        padding: 15px 32px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
    }

    .btn-Delete:hover {
        background-color: #d3776d;
    }

    .task {
        display: flex;
        flex-direction: row;
        border-bottom: 1px dashed  black;
    }

    .date {
        background-color: #fffda0;
        display: flex;

    }
    .date-content {
        margin: auto 2em;
    }

    .description {
        display: flex;
        flex-direction: column;
        margin: 1em auto;
        padding: 0 1em;
    }
    
    h3 {
        margin: 0 0;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }

    button:hover {
        cursor: pointer;
    }
</style>
