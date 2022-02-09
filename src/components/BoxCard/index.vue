<template>
    <div class="box-card">
        <img
                class="bg-wall"
                alt=""
                src="https://wpimg.wallstcn.com/e7d23d71-cf19-4b90-a1cc-f56af8c0903d.png"
        />
        <div class="bottom">
            <div class="panThumb">
                <img
                        :src="info.avatar"
                        alt=""
                />
            </div>
            <div class="progress">
                <div class="progress-item">
                    <span>Vue</span>
                    <el-progress :percentage="70"/>
                </div>
                <div class="progress-item">
                    <span>JavaScript</span>
                    <el-progress :percentage="18"/>
                </div>
                <div class="progress-item">
                    <span>CSS</span>
                    <el-progress :percentage="12"/>
                </div>
                <div class="progress-item">
                    <span>ESLint</span>
                    <el-progress :percentage="100" status="success"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: "BoxCard",
        computed: mapGetters(['info'])
    }
</script>

<style scoped lang="scss">
    .box-card {
        margin-top: 20px;
        overflow: hidden;
        background-color: #fff;

        .bg-wall {
            transition: all 0.2s linear;
            width: 100%;
            display: block;

            &:hover {
                transform: scale(1.1, 1.1);
                filter: contrast(130%);
            }
        }

        .bottom {
            position: relative;

            .panThumb {
                position: absolute;
                left: 20px;
                top: -20px;
                display: flex;
                width: 70px;
                height: 70px;
                border-radius: 50%;
                background-color: #fff;

                img {
                    margin: auto;
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    transform-origin: right 10px;
                    transition: all .3s;
                }

                &:hover img {
                    transform: rotate(-90deg);
                }
            }

            .progress {
                padding: 50px 20px 20px;

                .progress-item {
                    padding: 5px 0;
                }
            }
        }
    }
</style>
