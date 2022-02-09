<template>
    <div class="todo-list-wrapper">
        <header>
            <label class="left" :class="{checked:checkedAllOrNone}">
                <input type="checkbox" v-model="checkedAllOrNone">
            </label>
            <label class="right">
                <input
                        @keyup.enter="addTodo"
                        type="text"
                        v-model="content"
                        placeholder="Todo List"
                >
            </label>
        </header>
        <ul>
            <todo
                    v-for="(todo,index) in filterTodoList"
                    :key="todo.id"
                    :todo="todo"
                    :index="index"
                    @toggleTodo="toggleTodo"
                    @deleteTodo="deleteTodo"
                    @editTodo="editTodo"
            />
        </ul>
        <footer v-show="!!todoList.length">
            <span>{{remaining}} items left</span>
            <span
                    @click="visibility=key"
                    v-for="(val,key) in filters"
                    class="btn"
                    :key="key"
                    :class="{active:visibility===key}"
            >{{key}}</span>
        </footer>
    </div>
</template>

<script>

    import Todo from "./Todo";

    const filters = {
        all: todoList => todoList,
        active: todoList => todoList.filter(todo => !todo.done),
        completed: todoList => todoList.filter(todo => todo.done)
    }

    export default {
        name: "TodoList",
        components: {Todo},
        data() {
            return {
                visibility: 'all',
                content: '',
                filters,
                todoList: [
                    {id: 1, content: 'vue', done: true},
                    {id: 2, content: 'webpack', done: false},
                ]
            }
        },
        computed: {
            filterTodoList() {
                return filters[this.visibility](this.todoList)
            },
            checkedAllOrNone: {
                get() {
                    return this.todoList.length > 0 && this.todoList.every(todo => todo.done)
                },
                set(v) {
                    this.todoList.forEach(todo => todo.done = v)
                }
            },
            remaining() {
                return this.todoList.filter(todo => !todo.done).length
            }
        },
        methods: {
            addTodo() {
                const content = this.content.trim()
                if (content) {
                    this.todoList.push({
                        id: Date.now(),
                        content,
                        done: false
                    })
                    this.content = ''
                }
            },
            toggleTodo(todo) {
                todo.done = !todo.done
            },
            deleteTodo(index) {
                this.todoList.splice(index, 1)
            },
            editTodo({index, todo}) {
                this.todoList.splice(index, 1, todo)
            }
        }
    }
</script>

<style scoped lang="scss">
    .todo-list-wrapper {
        margin-top: 20px;

        header {
            display: flex;
            height: 50px;
            align-items: center;

            .left {
                display: flex;
                width: 50px;
                height: 50px;
                background-color: #fff;

                &.checked::before {
                    color: #333;
                }

                &::before {
                    content: "❯";
                    color: #e6e6e6;
                    transform: rotate(90deg);
                    margin: auto;
                }

                input {
                    width: 50px;
                    height: 50px;
                    display: none;
                }
            }

            .right {
                flex: 1;

                input {
                    border: none;
                    padding: 0;
                    width: 100%;
                    height: 50px;
                    outline: none;
                    text-indent: 1em;
                }
            }
        }

        ul {
            padding: 0;
            margin: 0;
            list-style-type: none;
        }

        footer {
            background-color: #fff;
            margin-top: 1px;
            box-shadow: 0 1px 1px rgba(0, 0, 0, .2),
            0 8px 0 -3px #f6f6f6,
            0 9px 1px -3px rgba(0, 0, 0, .2),
            0 16px 0 -6px #f6f6f6,
            0 17px 2px -6px rgba(0, 0, 0, .2);
            line-height: 44px;
            font-size: 12px;
            color: rgb(119, 119, 119);
            padding: 0 20px;

            .btn {
                margin-left: 10px;
                cursor: pointer;
                border: 1px solid #fff;
                border-radius: 5px;
                padding: 1px 5px;

                &:hover {
                    border-color: #d8dce5;
                }

                &.active {
                    border-color: #999;
                }
            }
        }

    }
</style>
