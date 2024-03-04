<template>
    <v-card class="w-full h-full">
        <v-img :src="props.product.thumbnailImage" />
        <v-card-title>{{ props.product.name }}</v-card-title>
        <v-card-text class="w-full" style="height: 100px">
            <div>
                {{ props.product.brand }} <br />
                ${{ props.product.basePrice }} <br />
                <div class="elip">
                    {{ props.product.description }}
                </div>
            </div>
        </v-card-text>
        <v-card-actions class="d-flex justify-end">
            <v-btn>details</v-btn>
        </v-card-actions>
    </v-card>
</template>
<script setup lang="ts">
const props = defineProps<{
    product: Product
}>()
export interface Product {
    catagory: string
    name: string
    id: string
    brand: string
    description: string
    inStock: boolean
    basePrice: number
    thumbnailImage: string
}
</script>
<style lang="scss" scoped>
.elip {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    white-space: normal;
}
</style>
