<template>
    <v-card class="w-full h-full">
        <v-img :src="props.product.thumbnailImage" />
        <v-card-title>{{ props.product.name }}</v-card-title>
        <v-card-text class="w-full" style="height: 120px">
            <div>
               Brand :  {{ props.product.brand }} <br />
               Price : ${{ props.product.basePrice }} <br />
               In stock :{{ props.product.stock }} Items<br />
               <br />
                <div class="elip">
                    {{ props.product.description }}
                </div>
            </div>
        </v-card-text>
        <v-card-actions class="d-flex justify-end">
            <v-btn @click="openProductDetails(product.id)" color="info" variant="flat">details</v-btn>
        </v-card-actions>
    </v-card>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
const props = defineProps<{
    product: Product
}>()
function openProductDetails(productId:string){
    router.push({name:'ProductDetail',params:{productId}})
}
export interface Product {
    catagory: string
    name: string
    id: string
    brand: string
    description: string
    inStock: boolean
    basePrice: number
    thumbnailImage: string
    stock:number
}
</script>
<style lang="scss" scoped>
.elip {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    white-space: normal;
}
</style>
