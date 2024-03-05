<template>
    <div v-if="data != null">
        <div>
            <v-container>
                <v-row>
                    <v-col>
                        <v-img :src="data.thumbnailImage" height="100%"></v-img>
                    </v-col>
                    <v-col>
                        <v-card>
                            <v-card-title>
                                {{ data.brand }} : {{ data.name }}
                            </v-card-title>
                            <v-card-text>
                                {{ data.description }}
                                <br />
                                <br />
                                <div>Display: {{ data.display }}</div>
                                <div v-if="data.camera">
                                    FrontCamera: {{ data.camera.frontCamera }}
                                    <br />
                                    RearCamera: {{ data.camera.rearCamera }}
                                </div>
                                <br />
                                <div>CPU : {{ data.cpu }}</div>
                                <div v-if="data.gpu">GPU : {{ data.gpu }}</div>
                                <br />
                                <div class="d-flex justify-space-between">
                                    <h2>Price: {{ data.basePrice }} Baht</h2>
                                    <h4>Instock : {{ data.stock }}</h4>
                                </div>
                                <br />
                                <v-select
                                    label="Storages"
                                    v-model="storage"
                                    :items="data.storages!"
                                    density="comfortable"
                                    variant="outlined"
                                ></v-select>
                                <v-select
                                    label="Colors"
                                    v-model="color"
                                    :items="data.colors"
                                    density="comfortable"
                                    variant="outlined"
                                ></v-select>
                                <div class="d-flex justify-end">
                                    <v-text-field
                                        label="จำนวน"
                                        append-icon="mdi-plus"
                                        prepend-icon="mdi-minus"
                                        density="comfortable"
                                        @click:prepend="
                                            () => {
                                                if (parseInt(qty) - 1 > 0) {
                                                    qty = `${parseInt(qty) - 1}`
                                                }
                                            }
                                        "
                                        @click:append="
                                            () => {
                                                if (parseInt(qty) + 1 <= data!.stock) {
                                                    qty = `${parseInt(qty) + 1}`
                                                }
                                            }
                                        "
                                        :model-value="qty"
                                        @update:model-value="
                                            (e) => {
                                                if (e === '') {
                                                    qty = '0'
                                                    return
                                                }
                                                if (isNaN(parseInt(e))) return
                                                if(parseInt(e) > data!.stock){
                                                  qty = `${ data!.stock}`
                                                return
                                                }
                                                qty = `${parseInt(e)}`
                                            }
                                        "
                                        style="width: fit-content"
                                    ></v-text-field>
                                </div>
                            </v-card-text>
                            <v-card-actions class="d-flex justify-space-between">
                                <v-btn
                                    color="red"
                                    @click="router.back()"
                                     variant="flat"
                                    >cancel</v-btn
                                >
                                <v-btn
                                    color="green"
                                    @click="makePurchase(data.id)"
                                     variant="flat"
                                    >Buy IT!</v-btn
                                >
                            </v-card-actions>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </div>
        <div></div>
    </div>
    <div v-else>loading . . .</div>
</template>
<script setup lang="ts">
import { type Product } from '@/components/ProductCard.vue'
import { useProductApi } from '@/composables/useProductApi'
import router from '@/router'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const storage = ref('')
const color = ref('')
const qty = ref('1')
export interface ProductDetail extends Product {
    cpu: string
    camera?: {
        frontCamera: string
        rearCamera: string
    }
    gpu?: string
    colors: string[]
    display: string
    storages: string[]
}
const data = ref<ProductDetail | null>()
const productApi = useProductApi()
function makePurchase(productId: string) {
    if (data.value == null) return
    if (data.value.stock < parseInt(qty.value)) {
        alert(
            `item in stock has ${data.value.stock} but you select ${qty.value}`
        )
        return
    }
    if (
        storage.value == '' ||
        storage.value == null ||
        color.value == '' ||
        color.value == null
    ) {
        alert('please select all product option !!')
        return
    }
    router.push({
        name: 'Purchase',
        params: { productId },
        query: { qty: qty.value,storage:storage.value,color:color.value,productId:data.value.id},
    })
}
onMounted(async () => {
    const result = await productApi.getById(route.params.productId as string)
    data.value = {
        colors: result.colorOptions,
        display: result.display,
        storages: result.storageOptions,
        camera: result.camera,
        cpu: result.CPU,
        gpu: result.GPU,
        stock: result.stock,
        basePrice: result.basePrice,
        brand: result.brand,
        catagory: result.catagory,
        description: result.description,
        id: result.id,
        inStock: result.inStock,
        name: result.name,
        thumbnailImage: result.thumbnailImage,
    }
})
</script>
