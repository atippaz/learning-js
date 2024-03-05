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
                                <div class="border rounded pa-4">
                                    <div class="d-flex justify-space-between">
                                        <div>Storage : </div>
                                        <div>{{ storage }}</div>
                                    </div>
                                    <div class="d-flex justify-space-between">
                                        <div>Color :</div>
                                        <div>{{ color }}</div>
                                    </div>
                                    <div class="d-flex justify-space-between">
                                        <div>Qty :</div>
                                        <div>{{ qty }}</div>
                                    </div>
                                    <div class="d-flex justify-space-between">
                                        <div>Total </div>
                                        <div> {{ total}}</div>
                                    </div>
                                </div>
                            </v-card-text>
                            <v-card-actions class="d-flex justify-space-between">
                                <v-btn
                                    color="red"
                                    @click="router.back()"
                                     variant="flat"
                                    >cancel</v-btn
                                >
                                <v-btn color="green"  variant="flat" @click="makePurchase">Buy IT!</v-btn>
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
import { inject, onMounted, ref } from 'vue'
import { type ProductDetail } from './ProductDetail.vue'
import { useProductApi } from '@/composables/useProductApi'
import { useRoute, useRouter } from 'vue-router'
import {  useMoneyPluginSymbol } from '@/composables/useMoney'
const data = ref<ProductDetail>()
const  { money, buyItem }  = inject(useMoneyPluginSymbol)!

const productApi = useProductApi()
const route = useRoute()
const total = ref(0)
const qty = ref(route.query.qty as string)
const storage = ref(route.query.storage as string)
const router = useRouter()
const color = ref(route.query.color as string)
function makePurchase() {
  if(total.value > money.value){
    alert('คุณมียอดเงินไม่พอ')
return
  }
  buyItem(total.value)
  alert(`buy success and from item in stock ${data.value?.stock} remain ${data.value!.stock - parseInt(qty.value)}`)
  alert('thank you for buy my product')
  router.push({name:'Product'})
}
onMounted(async () => {
    const result = await productApi.getById(route.query.productId as string)
    data.value = data.value = {
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
    total.value = data.value.basePrice * parseInt(qty.value)
})
</script>
