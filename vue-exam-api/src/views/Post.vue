<template>
    <div v-if="data != null" class="mx-12 pa-4 ma-4">
        <v-card>
            <v-card-title class="my-4">
                <h1 style="text-align: center">{{ data.title }}</h1>
            </v-card-title>
            <v-card-text style="text-align: center">
                <div>
                    <h5>{{ data.body }}</h5>
                    <br />
                    <h6>created by</h6>
                    <h3>{{ data.username }} - {{ data.name }}</h3>
                    <h5>email : {{ data.email }}</h5>
                    <h5>phone : {{ data.phone }}</h5>
                    <h5>company : {{ data.company.name }}</h5>
                </div>
                <br />
                <h5 class="d-flex justify-end px-15 mx-15">
                    comment ({{ comments.length }})
                </h5>
                <br />
                <div
                    style="
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                    "
                >
                    <div
                        v-for="(i, index) in comments"
                        :key="i"
                        class="ma-2 rounded-lg pa-4 w-75 border"
                    >
                        <div
                            style="
                                display: flex;
                                flex-direction: row;
                                cursor: pointer;
                            "
                            @click="gotoComment(i.id)"
                        >
                            <div style="width: 50px">({{ index + 1 }}) :</div>
                            <div>
                                <h5>comment : {{ i.body }}</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </v-card-text>
            <v-card-actions>
                <v-btn variant="flat" @click="router.back()">go back</v-btn>
            </v-card-actions>
        </v-card>
    </div>
    <div v-else>loading . . .</div>
</template>

<script lang="ts" setup>
import { useCommentApi } from '@/composables/useCommentApi'
import { usePostApi } from '@/composables/usePostApi'
import { useUserApi } from '@/composables/useUserApi'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const router = useRouter()
const postApi = usePostApi()
const userApi = useUserApi()
const commentApi = useCommentApi()
const comments = ref<any>([])
const route = useRoute()
const data = ref<any>()
;(async () => {
    const post = await postApi.getById(route.params?.postId as string)
    const user = await userApi.getById(post.userId as string)
    comments.value = await commentApi.getCommentByPostId(post.id)
    data.value = { ...post, ...user }
})()
function gotoComment(commentId: string) {
    router.push({
        name: 'Comment',
        params: { commentId, postId: route.params?.postId },
    })
}
</script>
