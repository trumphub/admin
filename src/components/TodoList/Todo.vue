<template>
    <li>
        <label class="left" :class="{done:todo.done}">
            <input
                    :checked="todo.done"
                    type="checkbox"
                    @change="toggleTodo"
            >
        </label>
        <span v-show="!editor" @dblclick="editor=true" class="center" :class="{done:todo.done}"
              v-text="todo.content"></span>
        <label v-show="editor">
            <input
                    v-focus="editor"
                    type="text"
                    :value="todo.content"
                    @keyup.enter="doneEdit"
                    @blur="doneEdit">
        </label>
        <button class="right" @click="deleteTodo">×</button>
    </li>
</template>

<script>
    export default {
        data() {
            return {
                editor: false
            }
        },
        name: "Todo",
        props: ['todo', 'index'],
        methods: {
            toggleTodo() {
                this.$emit('toggleTodo', this.todo)
            },
            deleteTodo() {
                this.$emit('deleteTodo', this.index)
            },
            doneEdit(e) {
                this.editor = false
                const content = e.target.value.trim()
                if (content) {
                    this.$emit('editTodo', {
                        index: this.index,
                        todo: {
                            ...this.todo,
                            content
                        }
                    })
                }
            }
        },
        directives: {
            focus(el, {value}, {context}) {
                value && context.$nextTick(() => {
                    el.focus()
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 44px;
        padding: 0 10px;
        background-color: #fff;
        margin-top: 1px;

        .left {
            width: 34px;
            height: 34px;
            border-radius: 50%;
            background-image: url("data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23ededed%22%20stroke-width%3D%223%22/%3E%3C/svg%3E");
            background-repeat: no-repeat;
            background-position: center;
            background-size: cover;

            &.done {
                background-image: url("data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23bddad5%22%20stroke-width%3D%223%22/%3E%3Cpath%20fill%3D%22%235dc2af%22%20d%3D%22M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z%22/%3E%3C/svg%3E");
            }

            input {
                padding: 0;
                margin: 0;
                display: none;
                width: 34px;
                height: 34px;
            }
        }

        .center {
            flex: 1;
            padding: 0 10px;
            transition: all .3s;

            &.done {
                text-decoration: line-through;
                text-decoration-color: rgb(217, 217, 217);
                color: rgb(217, 217, 217);
            }
        }

        .right {
            visibility: hidden;
            border: none;
            cursor: pointer;
            background-color: transparent;
            font-size: 20px;
        }

        &:hover .right {
            visibility: visible;
        }
    }
</style>
