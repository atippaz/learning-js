<template>
    <div class="d-flex justify-end"></div>
    <div>
        <v-container>
            <v-row>
                <v-col cols="4" v-for="product in data">
                    <ProductCard  class="h-full w-full" :product="product">
                    </ProductCard>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>
<script setup lang="ts">
import ProductCard, { type Product } from '@/components/ProductCard.vue'
import { useProductApi } from '@/composables/useProductApi'
import router from '@/router'
import { onMounted, ref } from 'vue'
const money = ref(0)
const data = ref<Product[]>([])
const productApi = useProductApi()

onMounted(async () => {
    data.value  =   (await productApi.getAll()).map((x: any) =>
                    <Product>{
                        basePrice: x.basePrice,
                        stock:x.stock,
                        brand: x.brand,
                        catagory: x.catagory,
                        description: x.description,
                        id: x.id,
                        inStock: x.inStock,
                        name: x.name,
                        thumbnailImage: x.thumbnailImage,
                    })
})
</script>
