<template>
    <div class="ma-8 pa-4">
        <v-card>
            <v-data-table :items="data">
                <template v-slot:item="{ item }: any">
                    <tr @click="onClickRow(item.postId)" class="a">
                        <td>{{ item.postId }}</td>
                        <td>{{ item.title }}</td>
                        <td>{{ item.body }}</td>
                        <td>{{ item.name }}</td>
                        <td>{{ item.name }}</td>
                        <td>{{ item.username }}</td>
                        <td>{{ item.email }}</td>
                        <td>{{ item.address.street }}</td>
                        <td>{{ item.phone }}</td>
                        <td>{{ item.website }}</td>
                        <td>{{ item.company.name }}</td>
                    </tr>
                </template>
            </v-data-table>
        </v-card>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { usePostApi } from '@/composables/usePostApi'
import { useUserApi } from '@/composables/useUserApi'
import { useRouter } from 'vue-router'
function onClickRow(postId: string) {
    router.push({ name: 'Post', params: { postId: postId } })
}
const postApi = usePostApi()
const userApi = useUserApi()
const router = useRouter()
const allPosts = ref<any>([])
const allUsers = ref<any>([])
const data = ref<any>([])
;(async () => {
    allPosts.value = await postApi.getAll()
    allUsers.value = await userApi.getAll()
    data.value = allPosts.value.map((x: any) => {
        return {
            postId: x.id,
            title: x.title,
            body: x.body,
            ...allUsers.value.find((g: any) => g.id == x.userId),
        }
    })
})()
</script>
<style lang="scss" scoped>
.a:hover {
    background-color: azure;
    cursor: pointer;
}
.a:nth-child(even) {
    background-color: #f2f2f2;
}
.a:nth-child(even):hover {
    background-color: #e9e9e9;
}
</style>
