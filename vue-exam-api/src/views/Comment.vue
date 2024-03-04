<template>
    <div class="ma-12 pa-2">
        <v-card v-if="comment != null">
            <v-card-title>
                {{ comment.body }}
            </v-card-title>
            <v-card-text>
                <h4>by :</h4>
                {{ comment.name }} <br />
                <h4>can contact</h4>

                {{ comment.email }}
            </v-card-text>
            <v-card-actions>
                <v-btn variant="flat" @click="router.back()">go back</v-btn>
            </v-card-actions>
        </v-card>
        <div v-else>loading . . .</div>
    </div>
</template>
<script setup lang="ts">
import { useCommentApi } from '@/composables/useCommentApi'
import router from '@/router'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const commentApi = useCommentApi()
const comment = ref()
;(async () => {
    comment.value = await commentApi.getCommentById(
        route.params.commentId as string
    )
})()
</script>
