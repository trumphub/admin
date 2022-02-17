<template>
    <transition name="fade">
        <div v-show="visible" class="back-to-top" @click="backToTop">
            <svg>
                <path d="M12.036 15.59a1 1 0 0 1-.997.995H5.032a.996.996 0 0 1-.997-.996V8.584H1.03c-1.1 0-1.36-.633-.578-1.416L7.33.29a1.003 1.003 0 0 1 1.412 0l6.878 6.88c.782.78.523 1.415-.58 1.415h-3.004v7.004z"/>
            </svg>
        </div>
    </transition>
</template>

<script>
    export default {
        name: "BackToTop",
        data() {
            return {
                visible: false,
                visibilityHeight: 400,
                backPosition: 0,
                isMoving: false
            }
        },
        methods: {
            backToTop() {
                if (this.isMoving) {
                    return
                }
                this.isMoving = true
                let scrollTop = this.containerEl.scrollTop
                this.interval = setInterval(() => {
                    let step = Math.ceil(scrollTop / 10)
                    scrollTop -= step
                    if (scrollTop <= this.backPosition) {
                        scrollTop = this.backPosition
                    }
                    this.containerEl.scrollTo(0, scrollTop)
                    if (scrollTop === this.backPosition) {
                        clearInterval(this.interval)
                        delete this.interval
                        this.isMoving = false
                    }
                }, 1000 / 60)
            },
            handleScroll() {
                this.visible = this.containerEl.scrollTop > this.visibilityHeight
            }
        },
        mounted() {
            this.containerEl = document.getElementsByClassName('main')[0]
            this.containerEl.addEventListener('scroll', this.handleScroll)
        },
        beforeDestroy() {
            this.containerEl.removeEventListener('scroll', this.handleScroll)
            this.interval && clearInterval(this.interval)
        }
    }
</script>

<style scoped lang="scss">
    .back-to-top {
        position: fixed;
        bottom: 50px;
        right: 50px;
        display: flex;
        width: 50px;
        height: 50px;
        color: $--color-primary;
        background-color: rgb(231, 234, 241);
        border-radius: 5px;
        cursor: pointer;
    }

    svg {
        margin: auto;
    }
</style>
