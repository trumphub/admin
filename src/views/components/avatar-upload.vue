<template>
    <div>
        <el-button type="primary"
                   icon="el-icon-upload"
                   @click="show=true"
        >
            upload Avatar
        </el-button>
        <my-upload
                :url="url"
                field="file"
                v-model="show"
                @crop-upload-success="cropUploadSuccess"
                @crop-upload-fail="cropUploadFail"
        />
        <div class="avatar-wrapper" v-show="!!imgUrl">
            <img :src="imgUrl" alt="">
        </div>
    </div>
</template>

<script>
    import MyUpload from 'vue-image-crop-upload/upload-2.vue';

    export default {
        name: "AvatarUpload",
        data() {
            return {
                url: process.env.VUE_APP_BASE_API + '/upload',
                show: false,
                imgUrl: ''
            }
        },
        components: {
            MyUpload
        },
        methods: {
            cropUploadSuccess({location: imgUrl}) {
                this.imgUrl = imgUrl
            },
            cropUploadFail(status) {
                console.log(status)
            }
        }
    }
</script>

<style scoped lang="scss">
    .avatar-wrapper {
        position: relative;
        width: 196px;
        height: 196px;
        border: 2px solid #aaa;
        border-radius: 50%;
        margin-top: 20px;

        &:hover img {
            transform: rotate(-90deg);
        }

        img {
            position: absolute;
            left: -2px;
            top: -2px;
            border-radius: 50%;
            transform-origin: right 50px;
            transition: transform .3s;
        }
    }
</style>
