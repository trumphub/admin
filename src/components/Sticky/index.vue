<template>
    <div>
        <div :style="{
        position,
        top,
        zIndex,
        width,
        height
    }"
        >
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Sticky",
        props: {
            stickyTop: {
                type: Number,
                default: 0
            }
        },
        data() {
            return {
                isSticky: false,
                width: 'auto',
                height: 'auto'
            }
        },
        computed: {
            position() {
                return this.isSticky ? 'fixed' : 'static'
            },
            top() {
                return this.isSticky ? this.stickyTop + 'px' : 'auto'
            },
            zIndex() {
                return this.isSticky ? 100 : 'auto'
            }
        },
        mounted() {
            this.height = this.$el.getBoundingClientRect().height + 'px'
            this.containerEl = document.getElementsByClassName('main')[0]
            this.containerEl.addEventListener('scroll', this.handleScroll)
            window.addEventListener('resize', this.handleResize)
        },
        destroyed() {
            this.containerEl.removeEventListener('scroll', this.handleScroll)
            window.removeEventListener('resize', this.handleResize)
        },
        methods: {
            handleScroll() {
                const {top, width} = this.$el.getBoundingClientRect()
                if (top < this.stickyTop) {
                    if (this.isSticky) {
                        return
                    }
                    this.isSticky = true
                    this.width = width + 'px'
                } else {
                    if (!this.isSticky) {
                        return
                    }
                    this.isSticky = false
                    this.width = 'auto'
                }
            },
            handleResize() {
                if (this.isSticky) {
                    const {width} = this.$el.getBoundingClientRect()
                    this.width = width + 'px'
                }
            }
        }
    }
</script>

<style scoped lang="scss">

</style>
