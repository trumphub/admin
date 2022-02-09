<template>
    <div>
        <div class="share-dropdown-menu" @click="active=!active">
            {{title}}
        </div>
        <a
                :class="{active}"
                v-for="(item,index) in items"
                :key="index"
                class="share-dropdown-menu-items"
                :href="item.href"
        >
            {{item.title}}
        </a>
    </div>
</template>

<script>
    export default {
        name: "DropdownMenu",
        props: ['title', 'items'],
        data() {
            return {
                active: false
            }
        },
    }
</script>

<style scoped lang="scss">
    $n: 9;
    $t: .1s;
    .share-dropdown-menu {
        position: relative;
        cursor: pointer;
        z-index: 1;
        background-color: #000000;
        margin: 0 -16px;
    }

    .share-dropdown-menu-items {
        display: block;
        background-color: #e0e0e0;
        color: #000;
        height: 60px;
        padding: 0 16px;
        margin: 0 -16px;
        line-height: 60px;
        font-size: 20px;
        text-align: center;
        text-decoration: none;
        transition: transform 0.28s ease;

        &:hover {
            background-color: #000000;
            color: #fff;
        }

        @for $i from 1 through $n {
            &:nth-of-type(#{$i}) {
                transition-delay: $i*$t;
                transform: translate(0, -$i * 60px);
            }
        }

        &.active {
            @for $i from 1 through $n {
                &:nth-of-type(#{$i}) {
                    transition-delay: ($n - $i)*$t;
                    transform: translate(0, 0);
                }
            }
        }
    }
</style>
